/* ==========================================================================
   Yeliz English - Interactive Controller and State Management
   ========================================================================== */

// 1. State Variables
let wordsList = [];
let customWords = [];
let learnedWordIds = [];
let activeTab = "home-tab";
let currentLang = "tr"; // 'tr' (Turkish) or 'en' (English)

// Flashcard Browser State
let currentFilter = "all"; // 'all', 'General', 'Aviation (Havacılık)', 'Tourism (Turizm)', 'custom', 'learned', 'learning'
let searchPhrase = "";
let filteredWords = [];
let currentCardIndex = 0;
let isCardFlipped = false;
let preventAutoShuffle = false; // Flag to prevent double shuffling during dictionary redirects

// Dictionary List State (NEW)
let listSelectedCategory = "all";
let listSearchPhrase = "";
let listFilteredWords = [];
let listCurrentPage = 1;
const listPageSize = 50; // 50 items per page for great browser performance

// Quiz State
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizScoreCorrect = 0;
let quizSelectedAnswer = null;

// Motivational Quotes Database
const MOTIVATIONAL_QUOTES = [
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "With languages, you are at home anywhere.", author: "Edward De Waal" },
    { text: "Language is the road map of a culture. It tells you where its people come from and where they are going.", author: "Rita Mae Brown" },
    { text: "A different language is a different vision of life.", author: "Federico Fellini" },
    { text: "Learning another language is not only learning different words for the same things, but learning another way to think about things.", author: "Flora Lewis" },
    { text: "Do you know what a foreign accent is? It's a sign of bravery.", author: "Amy Chua" },
    { text: "One language sets you in a corridor for life. Two languages open every door along the way.", author: "Frank Smith" }
];

// 2. App Initialization
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromStorage();
    setupTabListeners();
    setupFlashcardListeners();
    setupDictionaryListeners(); // New
    setupFormListener();
    setupQuizListeners();
    setupGrammarListeners(); // Setup Zamanlar & Modallar listeners
    
    // Initial renders & settings loader
    setupSettingsListeners();
    applySavedTheme();
    applySavedLanguage(); // Initialize interface language
    initGamification();
    renderDictionaryList(); // New
    initGrammarTab(); // Load initial grammar sidebar options
    
    // Dynamic greeting based on hours
    setGreeting();
});

// Load state from localStorage
function loadDataFromStorage() {
    // Custom Words
    const storedCustom = localStorage.getItem("yeliz_custom_words");
    if (storedCustom) {
        customWords = JSON.parse(storedCustom);
    } else {
        customWords = [];
    }

    // Learned Word IDs
    const storedLearned = localStorage.getItem("yeliz_learned_words");
    if (storedLearned) {
        learnedWordIds = JSON.parse(storedLearned);
    } else {
        learnedWordIds = [];
    }

    // Combine lists
    updateMergedWordsList();
}

// Merge default database (from words_db.js) and custom words
function updateMergedWordsList() {
    const baseDb = typeof WORDS_DATABASE !== 'undefined' ? WORDS_DATABASE : [];
    
    // Inject cached dynamic sentences into baseDb
    try {
        const cachedData = localStorage.getItem("yeliz_dynamic_sentences");
        if (cachedData) {
            const cachedSentences = JSON.parse(cachedData);
            baseDb.forEach(word => {
                if (cachedSentences[word.id]) {
                    word.exEn = cachedSentences[word.id].exEn;
                    word.exTr = cachedSentences[word.id].exTr;
                }
            });
        }
    } catch (e) {
        console.error("Error merging cached sentences:", e);
    }
    
    wordsList = [...baseDb, ...customWords];
}

// 3. Greeting & Quotes
function setGreeting() {
    const greetingEl = document.getElementById("greeting-time");
    if (!greetingEl) return;
    
    const hour = new Date().getHours();
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    
    if (hour >= 5 && hour < 12) {
        greetingEl.textContent = isEn ? "Good morning, ☀️" : "Günaydın, ☀️";
    } else if (hour >= 12 && hour < 18) {
        greetingEl.textContent = isEn ? "Good afternoon, 👋" : "Tünaydın / İyi günler, 👋";
    } else if (hour >= 18 && hour < 22) {
        greetingEl.textContent = isEn ? "Good evening, ✨" : "İyi akşamlar, ✨";
    } else {
        greetingEl.textContent = isEn ? "Good night, 🌙" : "İyi geceler, 🌙";
    }
}

function setDailyQuote() {
    const quoteTextEl = document.getElementById("daily-quote");
    const quoteAuthorEl = document.getElementById("daily-quote-author");
    if (!quoteTextEl || !quoteAuthorEl) return;

    // Pick a quote based on the day of the month
    const day = new Date().getDate();
    const quoteIndex = day % MOTIVATIONAL_QUOTES.length;
    const selectedQuote = MOTIVATIONAL_QUOTES[quoteIndex];

    quoteTextEl.textContent = `"${selectedQuote.text}"`;
    quoteAuthorEl.textContent = `- ${selectedQuote.author}`;
}

// 4. Navigation Tab Manager
function setupTabListeners() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");
            switchTab(targetTab);
        });
    });
}

function switchTab(tabId) {
    if (activeTab === tabId) return;

    // Hide old active content
    const oldContent = document.getElementById(activeTab);
    const oldBtn = document.querySelector(`.nav-btn[data-tab="${activeTab}"]`);
    if (oldContent) oldContent.classList.remove("active");
    if (oldBtn) oldBtn.classList.remove("active");

    // Reset flips and states when leaving card tab
    if (activeTab === "cards-tab") {
        resetFlashcardState();
    }
    // Reset quiz if leaving quiz tab mid-game
    if (activeTab === "quiz-tab") {
        resetQuizToStart();
    }

    // Set new active content
    activeTab = tabId;
    const newContent = document.getElementById(tabId);
    const newBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    
    if (newContent) {
        newContent.classList.add("active");
        
        // Wait for class addition before styling so animation triggers
        setTimeout(() => {
            newContent.style.opacity = "1";
        }, 50);
    }
    if (newBtn) newBtn.classList.add("active");

    // Specific tab loading logic
    if (tabId === "home-tab") {
        renderDashboard();
    } else if (tabId === "cards-tab") {
        if (preventAutoShuffle) {
            preventAutoShuffle = false; // Reset flag
        } else {
            filterFlashcards(true); // Shuffle automatically on open
        }
    } else if (tabId === "list-tab") {
        renderDictionaryList();
    }
}

// 5. Dashboard Calculations
function renderDashboard() {
    const totalWordsEl = document.getElementById("stat-total-words");
    const learnedWordsEl = document.getElementById("stat-learned-words");
    const customWordsEl = document.getElementById("stat-custom-words");
    const streakEl = document.getElementById("stat-daily-streak");

    if (totalWordsEl) totalWordsEl.textContent = wordsList.length;
    if (learnedWordsEl) learnedWordsEl.textContent = learnedWordIds.length;
    if (customWordsEl) customWordsEl.textContent = customWords.length;
    if (streakEl) streakEl.textContent = `${streakCount} Gün`;
}

// 6. Flashcards Controller Logic
function setupFlashcardListeners() {
    const flashcardEl = document.getElementById("main-flashcard");
    const prevBtn = document.getElementById("prev-card-btn");
    const nextBtn = document.getElementById("next-card-btn");
    const ttsBtn = document.getElementById("card-tts-btn");
    const markLearnedBtn = document.getElementById("mark-learned-btn");
    const searchInput = document.getElementById("card-search");
    const categorySelect = document.getElementById("card-category-select");

    // Click Card to Flip
    if (flashcardEl) {
        flashcardEl.addEventListener("click", (e) => {
            // Prevent flip when clicking TTS button inside card
            if (e.target.closest(".tts-btn")) return;
            
            isCardFlipped = !isCardFlipped;
            if (isCardFlipped) {
                flashcardEl.classList.add("flipped");
            } else {
                flashcardEl.classList.remove("flipped");
            }
        });
    }

    // Previous Button
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (filteredWords.length === 0) return;
            resetFlashcardState();
            currentCardIndex = (currentCardIndex - 1 + filteredWords.length) % filteredWords.length;
            setTimeout(displayCurrentCard, 150); // small delay to allow card to unflip
            trackCardStudyProgress(); // Track daily card progress
        });
    }

    // Next Button
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (filteredWords.length === 0) return;
            resetFlashcardState();
            currentCardIndex = (currentCardIndex + 1) % filteredWords.length;
            setTimeout(displayCurrentCard, 150);
            trackCardStudyProgress(); // Track daily card progress
        });
    }

    // TTS button
    if (ttsBtn) {
        ttsBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent flip
            const activeWord = filteredWords[currentCardIndex];
            if (activeWord) {
                speakEnglishText(activeWord.en);
            }
        });
    }

    // Mark as Learned Button
    if (markLearnedBtn) {
        markLearnedBtn.addEventListener("click", () => {
            const activeWord = filteredWords[currentCardIndex];
            if (!activeWord) return;

            toggleWordLearned(activeWord.id);
            displayCurrentCard();
            renderDashboard(); // Update stats in background
        });
    }

    // Category Selector
    if (categorySelect) {
        categorySelect.addEventListener("change", (e) => {
            currentFilter = e.target.value;
            currentCardIndex = 0;
            resetFlashcardState();
            filterFlashcards();
        });
    }

    // Search Input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchPhrase = e.target.value.toLowerCase().trim();
            currentCardIndex = 0;
            resetFlashcardState();
            filterFlashcards(true);
        });
    }

    // Shuffle Button (NEW)
    const shuffleCardBtn = document.getElementById("shuffle-card-btn");
    if (shuffleCardBtn) {
        shuffleCardBtn.addEventListener("click", () => {
            if (filteredWords.length > 0) {
                resetFlashcardState();
                filteredWords = shuffleArray([...filteredWords]);
                currentCardIndex = 0;
                displayCurrentCard();
                showToast("Kelimeler karıştırıldı! 🔀");
            }
        });
    }
}

function resetFlashcardState() {
    isCardFlipped = false;
    const flashcardEl = document.getElementById("main-flashcard");
    if (flashcardEl) {
        flashcardEl.classList.remove("flipped");
    }
}

// TTS Speech Synthesizer
function speakEnglishText(text) {
    if ("speechSynthesis" in window) {
        // Cancel active readings
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.85; // slightly slower for better learning clarity
        
        // Retrieve english speaking voices if available
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(voice => voice.lang.startsWith("en-US") || voice.lang.startsWith("en-GB"));
        if (enVoice) {
            utterance.voice = enVoice;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        showToast("Tarayıcınız ses sentezleme özelliğini desteklemiyor.", true);
    }
}

// Filter core word selection for Flashcards (Shuffles by default)
function filterFlashcards(shouldShuffle = true) {
    filteredWords = wordsList.filter(word => {
        // Filter by state / category
        const isLearned = learnedWordIds.includes(word.id);
        if (currentFilter === "learned" && !isLearned) return false;
        if (currentFilter === "learning" && isLearned) return false;
        if (currentFilter === "custom" && !word.id.startsWith("cust_")) return false;
        
        // Filter by specific database categories (General, Aviation, Tourism)
        if (currentFilter !== "all" && currentFilter !== "custom" && currentFilter !== "learned" && currentFilter !== "learning") {
            if (word.category !== currentFilter) return false;
        }

        // Filter by search query
        if (searchPhrase) {
            const matchEn = word.en.toLowerCase().includes(searchPhrase);
            const matchTr = word.tr.toLowerCase().includes(searchPhrase);
            return matchEn || matchTr;
        }
        return true;
    });

    if (shouldShuffle && filteredWords.length > 0) {
        filteredWords = shuffleArray([...filteredWords]);
    }

    currentCardIndex = 0;
    displayCurrentCard();
}

// Dynamic Example Sentence Loader from Free Dictionary API and MyMemory Translator
let dynamicSentencesCache = {};
try {
    const cachedData = localStorage.getItem("yeliz_dynamic_sentences");
    if (cachedData) {
        dynamicSentencesCache = JSON.parse(cachedData);
    }
} catch (e) {
    console.error("Cache initialization error:", e);
}

function loadDynamicExampleSentence(word, exEnEl, exTrEl, type = "card") {
    if (!word || !word.en) return;
    
    // Safety check if they are already fetched in the background
    if (word.exEn) {
        if (exEnEl) exEnEl.textContent = `"${word.exEn}"`;
        if (exTrEl) exTrEl.textContent = `"${word.exTr}"`;
        return;
    }
    
    // Check local cache
    if (dynamicSentencesCache[word.id]) {
        word.exEn = dynamicSentencesCache[word.id].exEn;
        word.exTr = dynamicSentencesCache[word.id].exTr;
        if (exEnEl) exEnEl.textContent = `"${word.exEn}"`;
        if (exTrEl) exTrEl.textContent = `"${word.exTr}"`;
        return;
    }
    
    // Fetch from API
    const englishWord = encodeURIComponent(word.en.toLowerCase());
    const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${englishWord}`;
    
    fetch(dictionaryApiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Dictionary API request failed");
            return response.json();
        })
        .then(data => {
            let foundExample = "";
            
            // Traverse meanings and definitions to find an example
            if (Array.isArray(data) && data.length > 0) {
                for (const entry of data) {
                    if (entry.meanings) {
                        for (const meaning of entry.meanings) {
                            if (meaning.definitions) {
                                for (const def of meaning.definitions) {
                                    if (def.example && def.example.trim()) {
                                        foundExample = def.example.trim();
                                        break;
                                    }
                                }
                            }
                            if (foundExample) break;
                        }
                    }
                    if (foundExample) break;
                }
            }
            
            // Fallback if no example found in dictionary API
            if (!foundExample) {
                foundExample = `This is a study card for the word: ${word.en}.`;
            }
            
            // Translate the example sentence
            const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(foundExample)}&langpair=en|tr`;
            return fetch(myMemoryUrl)
                .then(res => res.json())
                .then(transData => {
                    const translatedText = (transData.responseData && transData.responseData.translatedText) 
                        ? transData.responseData.translatedText.trim()
                        : `Bu, ${word.tr} kelimesinin örnek bir cümlesidir.`;
                    
                    // Save to word object
                    word.exEn = foundExample;
                    word.exTr = translatedText;
                    
                    // Save to cache
                    dynamicSentencesCache[word.id] = {
                        exEn: foundExample,
                        exTr: translatedText
                    };
                    localStorage.setItem("yeliz_dynamic_sentences", JSON.stringify(dynamicSentencesCache));
                    
                    // Update UI if the same word is still displayed
                    updateUIIfActive();
                });
        })
        .catch(err => {
            console.warn("Could not load dynamic example sentence:", err);
            // Non-blocking fallback template in case of offline or errors
            const fallbackExample = `We need to check the definition of ${word.en}.`;
            const fallbackTranslation = `İngilizce ${word.en} (${word.tr}) kelimesinin tanımını kontrol etmemiz gerekiyor.`;
            
            word.exEn = fallbackExample;
            word.exTr = fallbackTranslation;
            
            updateUIIfActive();
        });
        
    function updateUIIfActive() {
        if (type === "card") {
            const currentEnText = document.getElementById("card-word-en") ? document.getElementById("card-word-en").textContent : "";
            if (currentEnText === word.en) {
                if (exEnEl) exEnEl.textContent = `"${word.exEn}"`;
                if (exTrEl) exTrEl.textContent = `"${word.exTr}"`;
            }
        } else if (type === "wod") {
            const currentWodText = document.getElementById("wod-en") ? document.getElementById("wod-en").textContent : "";
            if (currentWodText === word.en) {
                if (exEnEl) exEnEl.textContent = `"${word.exEn}"`;
                if (exTrEl) exTrEl.textContent = `"${word.exTr}"`;
            }
        }
    }
}

// Render dynamic card face content
function displayCurrentCard() {
    const cardEl = document.getElementById("main-flashcard");
    const enEl = document.getElementById("card-word-en");
    const trEl = document.getElementById("card-word-tr");
    const typeEl = document.getElementById("card-word-type");
    const exEnEl = document.getElementById("card-example-en");
    const exTrEl = document.getElementById("card-example-tr");
    const categoryEl = document.getElementById("card-category");
    
    const indexNumEl = document.getElementById("current-card-num");
    const totalNumEl = document.getElementById("total-cards-num");
    const markLearnedBtn = document.getElementById("mark-learned-btn");
    const learnedBtnText = document.getElementById("learned-btn-text");

    if (filteredWords.length === 0) {
        // Empty state UI display on card
        if (cardEl) cardEl.style.pointerEvents = "none";
        if (enEl) enEl.textContent = "Kelime Bulunamadı";
        if (trEl) trEl.textContent = "Lütfen aramayı veya filtreyi değiştirin";
        if (typeEl) typeEl.textContent = "";
        if (exEnEl) exEnEl.textContent = "İpucu:";
        if (exTrEl) exTrEl.textContent = "Kendi kelimelerinizi ekleyebilir veya diğer alanları filtreleyebilirsiniz.";
        if (categoryEl) categoryEl.textContent = "BOŞ";
        if (indexNumEl) indexNumEl.textContent = "0";
        if (totalNumEl) totalNumEl.textContent = "0";
        if (markLearnedBtn) markLearnedBtn.style.display = "none";
        return;
    }

    if (cardEl) cardEl.style.pointerEvents = "auto";
    if (markLearnedBtn) markLearnedBtn.style.display = "flex";

    const word = filteredWords[currentCardIndex];

    // Card face text injections
    if (enEl) {
        enEl.textContent = word.en;
        // Dynamic resizing for longer English words to prevent overflow on mobile/tablet viewports
        if (word.en.length > 18) {
            enEl.style.fontSize = "24px";
        } else if (word.en.length > 12) {
            enEl.style.fontSize = "28px";
        } else {
            enEl.style.fontSize = ""; // Reset to CSS default (38px / 26px)
        }
    }
    if (trEl) {
        trEl.textContent = word.tr;
        // Dynamic resizing for longer Turkish translations to prevent overflow
        if (word.tr.length > 25) {
            trEl.style.fontSize = "20px";
        } else if (word.tr.length > 15) {
            trEl.style.fontSize = "24px";
        } else {
            trEl.style.fontSize = ""; // Reset to CSS default (32px / 22px)
        }
    }
    if (typeEl) {
        if (word.id.startsWith("cust_")) {
            typeEl.textContent = `(${word.type})`;
        } else {
            typeEl.textContent = word.type || "General";
        }
    }
    if (exEnEl) exEnEl.textContent = "";
    if (exTrEl) exTrEl.textContent = "";
    
    if (word.exEn) {
        if (exEnEl) exEnEl.textContent = `"${word.exEn}"`;
        if (exTrEl) exTrEl.textContent = `"${word.exTr}"`;
    } else {
        // Trigger async fetch from APIs
        if (exEnEl) exEnEl.textContent = "Örnek cümle yükleniyor... / Loading example...";
        if (exTrEl) exTrEl.textContent = "";
        
        loadDynamicExampleSentence(word, exEnEl, exTrEl, "card");
    }
    
    // Category representation
    if (categoryEl) {
        if (word.id.startsWith("cust_")) {
            categoryEl.textContent = "Benim Kelimem";
        } else if (word.category.includes("Aviation")) {
            categoryEl.textContent = "Havacılık";
        } else if (word.category.includes("Tourism")) {
            categoryEl.textContent = "Turizm";
        } else if (word.category.includes("Kitchen")) {
            categoryEl.textContent = "Mutfak & Gastronomi";
        } else if (word.category.includes("Technology")) {
            categoryEl.textContent = "Teknoloji & Yazılım";
        } else if (word.category.includes("Business")) {
            categoryEl.textContent = "İş & Ekonomi";
        } else if (word.category.includes("Medicine")) {
            categoryEl.textContent = "Tıp & Sağlık";
        } else if (word.category.includes("Science")) {
            categoryEl.textContent = "Bilim & Uzay";
        } else if (word.category.includes("Academic")) {
            categoryEl.textContent = "Akademi & Eğitim";
        } else if (word.category.includes("Fashion")) {
            categoryEl.textContent = "Moda & Tasarım";
        } else if (word.category.includes("Sports")) {
            categoryEl.textContent = "Spor & Egzersiz";
        } else if (word.category.includes("Nature")) {
            categoryEl.textContent = "Doğa & Çevre";
        } else if (word.category.includes("Law")) {
            categoryEl.textContent = "Hukuk & Adalet";
        } else if (word.category.includes("Music")) {
            categoryEl.textContent = "Müzik & Sanat";
        } else {
            categoryEl.textContent = "Genel";
        }
    }

    // Nav indicators
    if (indexNumEl) indexNumEl.textContent = currentCardIndex + 1;
    if (totalNumEl) totalNumEl.textContent = filteredWords.length;

    // Learned Checkbox logic
    const isLearned = learnedWordIds.includes(word.id);
    if (isLearned) {
        markLearnedBtn.classList.add("learned-active");
        if (learnedBtnText) learnedBtnText.textContent = "Öğrenildi!";
        markLearnedBtn.querySelector("i").className = "fa-solid fa-circle-check";
    } else {
        markLearnedBtn.classList.remove("learned-active");
        if (learnedBtnText) learnedBtnText.textContent = "Öğrendim Olarak İşaretle";
        markLearnedBtn.querySelector("i").className = "fa-regular fa-circle-check";
    }
}

// Toggle learned state function
function toggleWordLearned(wordId) {
    const index = learnedWordIds.indexOf(wordId);
    if (index > -1) {
        // Remove from learned
        learnedWordIds.splice(index, 1);
        showToast("Kelime çalışılacaklar listesine geri alındı.");
    } else {
        // Add to states
        learnedWordIds.push(wordId);
        showToast("Harika! Kelime öğrenildi olarak işaretlendi.");
    }
    localStorage.setItem("yeliz_learned_words", JSON.stringify(learnedWordIds));
    
    // Evaluate achievements when status changes
    if (typeof checkAchievements === 'function') {
        checkAchievements();
    }
}

// ==========================================================================
// 7. Dictionary List View Controller (NEW)
// ==========================================================================
function setupDictionaryListeners() {
    const categorySelect = document.getElementById("list-category-select");
    const searchInput = document.getElementById("list-search");
    const prevBtn = document.getElementById("list-prev-page");
    const nextBtn = document.getElementById("list-next-page");

    const toggleAddWordBtn = document.getElementById("toggle-add-word-btn");
    const closeAddWordBtn = document.getElementById("close-add-word-panel-btn");
    const addWordPanel = document.getElementById("collapsible-add-word-panel");

    // Toggle Add Word Panel
    if (toggleAddWordBtn && addWordPanel) {
        toggleAddWordBtn.addEventListener("click", () => {
            const isHidden = addWordPanel.style.display === "none";
            addWordPanel.style.display = isHidden ? "block" : "none";
            if (isHidden) {
                const enInput = document.getElementById("word-en");
                if (enInput) enInput.focus();
            }
        });
    }

    // Close Add Word Panel
    if (closeAddWordBtn && addWordPanel) {
        closeAddWordBtn.addEventListener("click", () => {
            addWordPanel.style.display = "none";
        });
    }

    // Category Select
    if (categorySelect) {
        categorySelect.addEventListener("change", (e) => {
            listSelectedCategory = e.target.value;
            listCurrentPage = 1; // Reset to page 1
            renderDictionaryList();
        });
    }

    // Search Input (Real-time filtering)
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            listSearchPhrase = e.target.value.toLowerCase().trim();
            listCurrentPage = 1; // Reset to page 1
            renderDictionaryList();
        });
    }

    // Previous Page Button
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (listCurrentPage > 1) {
                listCurrentPage--;
                renderDictionaryList();
                scrollToDictionaryHeader();
            }
        });
    }

    // Next Page Button
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const totalItems = listFilteredWords.length;
            const totalPages = Math.max(1, Math.ceil(totalItems / listPageSize));
            if (listCurrentPage < totalPages) {
                listCurrentPage++;
                renderDictionaryList();
                scrollToDictionaryHeader();
            }
        });
    }
}

function scrollToDictionaryHeader() {
    const header = document.querySelector("#list-tab .section-header");
    if (header) {
        header.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderDictionaryList() {
    const tableBody = document.getElementById("words-table-body");
    const pageInfo = document.getElementById("list-page-info");
    const prevBtn = document.getElementById("list-prev-page");
    const nextBtn = document.getElementById("list-next-page");
    
    if (!tableBody) return;
    
    // Filter the overall words list based on settings
    listFilteredWords = wordsList.filter(word => {
        const isLearned = learnedWordIds.includes(word.id);
        const matchCategory = listSelectedCategory === "all" || 
                              (listSelectedCategory === "custom" && word.id.startsWith("cust_")) ||
                              (listSelectedCategory === "learned" && isLearned) ||
                              (listSelectedCategory === "learning" && !isLearned) ||
                              (word.category === listSelectedCategory);
                              
        if (!matchCategory) return false;
        
        if (listSearchPhrase) {
            const matchEn = word.en.toLowerCase().includes(listSearchPhrase);
            const matchTr = word.tr.toLowerCase().includes(listSearchPhrase);
            return matchEn || matchTr;
        }
        return true;
    });
    
    const totalItems = listFilteredWords.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / listPageSize));
    
    // Bound checks
    if (listCurrentPage > totalPages) {
        listCurrentPage = totalPages;
    }
    if (listCurrentPage < 1) {
        listCurrentPage = 1;
    }
    
    // Update pagination controls
    if (prevBtn) prevBtn.disabled = listCurrentPage === 1;
    if (nextBtn) nextBtn.disabled = listCurrentPage === totalPages;
    if (pageInfo) pageInfo.textContent = `Sayfa ${listCurrentPage} / ${totalPages} (Toplam ${totalItems} Kelime)`;
    
    // Clear old rows
    tableBody.innerHTML = "";
    
    if (totalItems === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 50px; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 28px; margin-bottom: 12px; display: block;"></i>
                    Aradığınız kriterlerde bir kelime bulunamadı.
                </td>
            </tr>
        `;
        return;
    }
    
    // Page slicing
    const startIndex = (listCurrentPage - 1) * listPageSize;
    const endIndex = Math.min(startIndex + listPageSize, totalItems);
    const pageItems = listFilteredWords.slice(startIndex, endIndex);
    
    pageItems.forEach(word => {
        const tr = document.createElement("tr");
        const isLearned = learnedWordIds.includes(word.id);
        
        let badgeClass = "category-badge";
        let catText = word.category;
        
        if (word.id.startsWith("cust_")) {
            badgeClass += " badge-custom";
            catText = "Özel";
        } else if (word.category.includes("Aviation")) {
            badgeClass += " badge-aviation";
            catText = "Havacılık";
        } else if (word.category.includes("Tourism")) {
            badgeClass += " badge-tourism";
            catText = "Turizm";
        } else if (word.category.includes("Kitchen")) {
            badgeClass += " badge-kitchen";
            catText = "Mutfak";
        } else if (word.category.includes("Technology")) {
            badgeClass += " badge-technology";
            catText = "Teknoloji";
        } else if (word.category.includes("Business")) {
            badgeClass += " badge-business";
            catText = "İş & Eko";
        } else if (word.category.includes("Medicine")) {
            badgeClass += " badge-medicine";
            catText = "Tıp & Sağlık";
        } else if (word.category.includes("Science")) {
            badgeClass += " badge-science";
            catText = "Bilim & Uzay";
        } else if (word.category.includes("Academic")) {
            badgeClass += " badge-academic";
            catText = "Akademi";
        } else if (word.category.includes("Fashion")) {
            badgeClass += " badge-fashion";
            catText = "Moda & Tas.";
        } else if (word.category.includes("Sports")) {
            badgeClass += " badge-sports";
            catText = "Spor";
        } else if (word.category.includes("Nature")) {
            badgeClass += " badge-nature";
            catText = "Doğa";
        } else if (word.category.includes("Law")) {
            badgeClass += " badge-law";
            catText = "Hukuk";
        } else if (word.category.includes("Music")) {
            badgeClass += " badge-music";
            catText = "Müzik & San.";
        } else {
            catText = "Genel";
        }
        
        let actionsHtml = `
            <button class="action-btn-sm btn-row-tts" title="Seslendir">
                <i class="fa-solid fa-volume-high"></i>
            </button>
            <button class="action-btn-sm btn-row-learned ${isLearned ? 'learned-active' : ''}" title="${isLearned ? 'Çalışılacaklar listesine al' : 'Öğrendim olarak işaretle'}">
                <i class="${isLearned ? 'fa-solid' : 'fa-regular'} fa-circle-check"></i>
            </button>
            <button class="action-btn-sm btn-row-study" title="Kartlarda Çalış">
                <i class="fa-solid fa-clone"></i>
            </button>
        `;
        
        if (word.id.startsWith("cust_")) {
            actionsHtml += `
                <button class="action-btn-sm btn-row-delete" title="Kelimeyi Sil" style="color: #f43f5e;">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
        }

        tr.innerHTML = `
            <td><strong>${word.en}</strong></td>
            <td>${word.tr}</td>
            <td><span class="${badgeClass}">${catText}</span></td>
            <td style="text-align: center;">
                <div class="row-actions">
                    ${actionsHtml}
                </div>
            </td>
        `;
        
        // Listeners for Row Buttons
        tr.querySelector(".btn-row-tts").addEventListener("click", (e) => {
            e.stopPropagation();
            speakEnglishText(word.en);
        });
        
        tr.querySelector(".btn-row-learned").addEventListener("click", (e) => {
            e.stopPropagation();
            toggleWordLearned(word.id);
            renderDictionaryList();
            renderDashboard();
        });
        
        tr.querySelector(".btn-row-study").addEventListener("click", (e) => {
            e.stopPropagation();
            studyWordInCards(word.id);
        });

        if (word.id.startsWith("cust_")) {
            tr.querySelector(".btn-row-delete").addEventListener("click", (e) => {
                e.stopPropagation();
                deleteCustomWord(word.id);
            });
        }
        
        tableBody.appendChild(tr);
    });
}

// Relocate study focus from list table row to Flashcard viewer
function studyWordInCards(wordId) {
    // 1. Reset categories selector inside card tab to All
    const selectEl = document.getElementById("card-category-select");
    if (selectEl) {
        selectEl.value = "all";
        currentFilter = "all";
    }
    
    // 2. Refilter cards list without shuffling
    filterFlashcards(false);
    
    // 3. Match wordId inside cards pool
    const index = filteredWords.findIndex(w => w.id === wordId);
    if (index > -1) {
        currentCardIndex = index;
    } else {
        // Fallback safety
        const overallIndex = wordsList.findIndex(w => w.id === wordId);
        if (overallIndex > -1) {
            filteredWords = [...wordsList];
            currentCardIndex = overallIndex;
        }
    }
    
    // Set flag to prevent auto-shuffle in switchTab
    preventAutoShuffle = true;
    
    // 4. Open flashcard tab
    switchTab("cards-tab");
}

// ==========================================================================
// 8. Custom Word Addition Manager
// ==========================================================================
function setupFormListener() {
    const form = document.getElementById("add-word-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const enInput = document.getElementById("word-en");
        const trInput = document.getElementById("word-tr");
        const categorySelect = document.getElementById("word-category");
        const exEnInput = document.getElementById("word-example-en");
        const exTrInput = document.getElementById("word-example-tr");

        const enVal = enInput.value.trim();
        const trVal = trInput.value.trim();
        const catVal = categorySelect.value;
        const exEnVal = exEnInput.value.trim();
        const exTrVal = exTrInput.value.trim();

        // Check if english word already exists
        const wordExists = wordsList.some(w => w.en.toLowerCase() === enVal.toLowerCase());
        if (wordExists) {
            showToast("Bu kelime zaten listende kayıtlı!", true);
            return;
        }

        // Create new word entity
        const newWord = {
            id: "cust_" + Date.now(),
            en: enVal,
            tr: trVal,
            category: "custom", // Internal reference
            type: catVal,
            exEn: exEnVal,
            exTr: exTrVal
        };

        // Add to states
        customWords.push(newWord);
        localStorage.setItem("yeliz_custom_words", JSON.stringify(customWords));
        
        updateMergedWordsList();
        renderDashboard();
        renderDictionaryList(); // Update dictionary list as well
        
        // Reset form inputs
        form.reset();
        
        // Collapse the add-word panel
        const addWordPanel = document.getElementById("collapsible-add-word-panel");
        if (addWordPanel) {
            addWordPanel.style.display = "none";
        }

        showToast("Yeni kelime başarıyla eklendi! 📚");

        // Mark Quest completed
        wordAddedToday = true;
        localStorage.setItem("yeliz_quest_add", "true");
        checkDailyQuests();
        incrementStreak();
    });
}

function deleteCustomWord(wordId) {
    if (confirm("Bu kelimeyi listenizden silmek istediğinize emin misiniz?")) {
        // Remove from custom list
        customWords = customWords.filter(w => w.id !== wordId);
        localStorage.setItem("yeliz_custom_words", JSON.stringify(customWords));
        
        // Remove from learned list if present
        learnedWordIds = learnedWordIds.filter(id => id !== wordId);
        localStorage.setItem("yeliz_learned_words", JSON.stringify(learnedWordIds));

        updateMergedWordsList();
        renderDashboard();
        renderDictionaryList(); // Update dictionary list
        filterFlashcards();
        showToast("Kelime listeden silindi.", true);
    }
}

// ==========================================================================
// 9. Interactive Quiz Engine
// ==========================================================================
function setupQuizListeners() {
    const startBtn = document.getElementById("start-quiz-btn");
    const quitBtn = document.getElementById("quiz-quit-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    const retryBtn = document.getElementById("quiz-retry-btn");
    const quizTtsBtn = document.getElementById("quiz-tts-btn");

    if (startBtn) {
        startBtn.addEventListener("click", startQuizGame);
    }
    if (quitBtn) {
        quitBtn.addEventListener("click", resetQuizToStart);
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", handleQuizNextQuestion);
    }
    if (retryBtn) {
        retryBtn.addEventListener("click", startQuizGame);
    }
    if (quizTtsBtn) {
        quizTtsBtn.addEventListener("click", () => {
            const currentQ = quizQuestions[quizCurrentIndex];
            if (currentQ && currentQ.speakText) {
                speakEnglishText(currentQ.speakText);
            }
        });
    }
}

function resetQuizToStart() {
    showQuizScreen("quiz-start-screen");
}

function showQuizScreen(screenId) {
    const screens = document.querySelectorAll(".quiz-screen");
    screens.forEach(screen => {
        screen.classList.remove("active");
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add("active");
    }
}

function startQuizGame() {
    const sourceSelect = document.getElementById("quiz-source-select");
    const typeSelect = document.getElementById("quiz-type-select");
    const countSelect = document.getElementById("quiz-count-select");
    
    const selectedSource = sourceSelect ? sourceSelect.value : "all";
    const selectedType = typeSelect ? typeSelect.value : "en-to-tr";
    const selectedCount = countSelect ? parseInt(countSelect.value) : 10;

    // Determine questions source
    let sourceWords = [];
    if (selectedSource === "custom") {
        sourceWords = [...customWords];
    } else if (selectedSource === "Aviation (Havacılık)" || selectedSource === "Tourism (Turizm)") {
        sourceWords = wordsList.filter(w => w.category === selectedSource);
    } else {
        sourceWords = [...wordsList];
    }
    
    // If Sentence Fill-in-the-blank is selected, filter out words without example sentences
    if (selectedType === "sentence-fill") {
        sourceWords = sourceWords.filter(w => w.exEn && w.exEn.trim() !== "");
        if (sourceWords.length < 4) {
            alert("Boşluk doldurma testi başlatabilmek için seçilen alanda örnek cümlesi bulunan en az 4 kelime olmalıdır! Lütfen Havacılık, Turizm veya örnek cümle eklediğiniz kendi kelimelerinizi seçin.");
            return;
        }
    }

    // We need at least 4 words in database to create multi-choice options
    if (sourceWords.length < 4) {
        alert("Quiz başlatabilmek için seçilen alanda en az 4 kelime kayıtlı olmalıdır! Şu an bu alanda kayıtlı kelime sayısı: " + sourceWords.length);
        return;
    }

    // Set up questions array (pick selectedCount random words or less if pool is smaller)
    const shuffledWords = shuffleArray([...sourceWords]);
    const questionsCount = Math.min(selectedCount, shuffledWords.length);
    quizQuestions = [];

    for (let i = 0; i < questionsCount; i++) {
        const correctWord = shuffledWords[i];
        const wrongOptionsPool = sourceWords.filter(w => w.id !== correctWord.id);
        const shuffledWrongPool = shuffleArray([...wrongOptionsPool]);
        
        let questionText = "";
        let questionWord = "";
        let correctAnswer = "";
        let choices = [];
        let speakText = ""; 

        if (selectedType === "en-to-tr") {
            // Mode 1: English to Turkish
            questionText = "Aşağıdaki kelimenin anlamı nedir?";
            questionWord = correctWord.en;
            correctAnswer = correctWord.tr;
            speakText = correctWord.en;
            
            choices = [correctWord.tr];
            for (let j = 0; j < Math.min(3, shuffledWrongPool.length); j++) {
                choices.push(shuffledWrongPool[j].tr);
            }
        } else if (selectedType === "tr-to-en") {
            // Mode 2: Turkish to English
            questionText = "Aşağıdaki Türkçe anlamın İngilizce karşılığı nedir?";
            questionWord = correctWord.tr;
            correctAnswer = correctWord.en;
            speakText = correctWord.en; 
            
            choices = [correctWord.en];
            for (let j = 0; j < Math.min(3, shuffledWrongPool.length); j++) {
                choices.push(shuffledWrongPool[j].en);
            }
        } else if (selectedType === "sentence-fill") {
            // Mode 3: Sentence fill-in-the-blank
            questionText = "Cümledeki boşluğa uygun İngilizce kelimeyi seçin:";
            
            // Blank out target word case-insensitively
            const regex = new RegExp(`\\b${correctWord.en}\\b`, 'gi');
            let blankedSentence = correctWord.exEn.replace(regex, "______");
            if (blankedSentence === correctWord.exEn) {
                blankedSentence = correctWord.exEn.replace(new RegExp(correctWord.en, 'gi'), "______");
            }
            
            questionWord = blankedSentence;
            correctAnswer = correctWord.en;
            speakText = correctWord.exEn; // Read the entire sentence
            
            choices = [correctWord.en];
            for (let j = 0; j < Math.min(3, shuffledWrongPool.length); j++) {
                choices.push(shuffledWrongPool[j].en);
            }
        }

        const finalChoices = shuffleArray(choices);

        quizQuestions.push({
            questionText: questionText,
            questionWord: questionWord,
            correctAnswer: correctAnswer,
            choices: finalChoices,
            speakText: speakText,
            quizType: selectedType
        });
    }

    // Init variables
    quizCurrentIndex = 0;
    quizScoreCorrect = 0;
    quizSelectedAnswer = null;

    // Reset correct count text
    const correctScoreBadge = document.getElementById("quiz-score-correct");
    if (correctScoreBadge) correctScoreBadge.textContent = "0";

    // Launch UI
    showQuizScreen("quiz-question-screen");
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const currentQ = quizQuestions[quizCurrentIndex];
    
    // UI Outlets
    const currentNumEl = document.getElementById("quiz-current-num");
    const totalNumEl = document.getElementById("quiz-total-num");
    const progressFill = document.getElementById("quiz-progress-fill");
    const questionWordEl = document.getElementById("quiz-question-word");
    const questionLabelEl = document.querySelector("#quiz-question-screen .question-label");
    const choicesContainer = document.getElementById("quiz-choices-container");
    const nextBtn = document.getElementById("quiz-next-btn");

    if (currentNumEl) currentNumEl.textContent = quizCurrentIndex + 1;
    if (totalNumEl) totalNumEl.textContent = quizQuestions.length;
    
    // Progress fill update
    if (progressFill) {
        const percent = ((quizCurrentIndex + 1) / quizQuestions.length) * 100;
        progressFill.style.width = percent + "%";
    }

    if (questionLabelEl && currentQ.questionText) {
        questionLabelEl.textContent = currentQ.questionText;
    }

    if (questionWordEl) {
        questionWordEl.textContent = currentQ.questionWord;
        
        // Fluid size adjustment for long sentences
        if (currentQ.quizType === "sentence-fill") {
            questionWordEl.style.fontSize = "20px";
            questionWordEl.style.lineHeight = "1.5";
            questionWordEl.style.fontWeight = "500";
        } else {
            questionWordEl.style.fontSize = "";
            questionWordEl.style.lineHeight = "";
            questionWordEl.style.fontWeight = "";
        }
    }
    if (nextBtn) nextBtn.disabled = true;

    // Render choice cards
    if (choicesContainer) {
        choicesContainer.innerHTML = "";
        
        currentQ.choices.forEach(choiceText => {
            const btn = document.createElement("button");
            btn.className = "choice-card";
            btn.textContent = choiceText;
            
            btn.addEventListener("click", () => {
                handleQuizAnswerSelection(btn, choiceText, currentQ.correctAnswer);
            });

            choicesContainer.appendChild(btn);
        });
    }

    quizSelectedAnswer = null;
}

function handleQuizAnswerSelection(selectedButton, selectedText, correctText) {
    if (quizSelectedAnswer !== null) return; // disable double clicks
    
    quizSelectedAnswer = selectedText;
    const choicesContainer = document.getElementById("quiz-choices-container");
    const choiceButtons = choicesContainer.querySelectorAll(".choice-card");
    const nextBtn = document.getElementById("quiz-next-btn");

    // Disable all options
    choiceButtons.forEach(btn => {
        btn.classList.add("disabled");
        
        // Highlight correct translation in green regardless of user choice
        if (btn.textContent === correctText) {
            btn.classList.add("choice-correct");
        }
    });

    const activeQuestionScreen = document.getElementById("quiz-question-screen");

    if (selectedText === correctText) {
        // Correct answer selection
        selectedButton.classList.add("choice-correct");
        quizScoreCorrect++;
        
        const correctScoreBadge = document.getElementById("quiz-score-correct");
        if (correctScoreBadge) correctScoreBadge.textContent = quizScoreCorrect;
        
        // Short celebratory visual bounce on button
        selectedButton.style.transform = "scale(1.03)";
        setTimeout(() => selectedButton.style.transform = "scale(1)", 150);
    } else {
        // Wrong answer selection
        selectedButton.classList.add("choice-wrong");
        
        // Add shake animation to the question card
        if (activeQuestionScreen) {
            activeQuestionScreen.classList.add("shake");
            setTimeout(() => {
                activeQuestionScreen.classList.remove("shake");
            }, 500);
        }
    }

    // Enable next button
    if (nextBtn) nextBtn.disabled = false;
}

function handleQuizNextQuestion() {
    quizCurrentIndex++;
    
    if (quizCurrentIndex < quizQuestions.length) {
        loadQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const correctValEl = document.getElementById("res-correct");
    const incorrectValEl = document.getElementById("res-incorrect");
    const percentEl = document.getElementById("res-score-percent");
    const emojiEl = document.getElementById("result-emoji");
    const titleEl = document.getElementById("result-title");
    const descEl = document.getElementById("result-desc");

    const totalQuestions = quizQuestions.length;
    const incorrectVal = totalQuestions - quizScoreCorrect;
    const scorePercent = Math.round((quizScoreCorrect / totalQuestions) * 100);

    // Save final score to localStorage for statistics
    localStorage.setItem("yeliz_last_quiz_score", scorePercent);

    if (correctValEl) correctValEl.textContent = quizScoreCorrect;
    if (incorrectValEl) incorrectValEl.textContent = incorrectVal;
    if (percentEl) percentEl.textContent = scorePercent + "%";

    // Custom results summary styling
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    if (scorePercent >= 80) {
        if (emojiEl) emojiEl.innerHTML = `<i class="fa-solid fa-trophy text-gold" style="font-size: 65px;"></i>`;
        if (titleEl) titleEl.textContent = isEn ? "Awesome Yeliz! 🎉" : "Harikasın Yeliz! 🎉";
        if (descEl) descEl.textContent = isEn ? "You learned the words perfectly! Keep studying like this." : "Kelimeleri mükemmel bir şekilde öğrenmişsin! İngilizce çalışmalarına bu şekilde devam et.";
    } else if (scorePercent >= 50) {
        if (emojiEl) emojiEl.innerHTML = `<i class="fa-solid fa-star-half-stroke" style="color: #f59e0b; font-size: 65px;"></i>`;
        if (titleEl) titleEl.textContent = isEn ? "Doing Great! 👍" : "Çok İyi Gidiyorsun! 👍";
        if (descEl) descEl.textContent = isEn ? "A good result! Study the flashcards a bit more to secure a 100% score." : "Gayet güzel bir sonuç! Kelime kartlarına biraz daha çalışarak 100% skoru yakalayabilirsin.";
    } else {
        if (emojiEl) emojiEl.innerHTML = `<i class="fa-solid fa-book-open" style="color: #38bdf8; font-size: 65px;"></i>`;
        if (titleEl) titleEl.textContent = isEn ? "Let's Practice! 💪" : "Tekrar Çalışalım! 💪";
        if (descEl) descEl.textContent = isEn ? "No problem at all. Flip the flashcards and practice with audio to achieve success!" : "Hiç sorun değil, kelime kartlarını çevirerek telaffuzleriyle birlikte tekrar ederek başarıya ulaşabilirsin!";
    }

    showQuizScreen("quiz-results-screen");
    renderDashboard(); // Refresh stats on home tab

    // Mark Quest completed
    quizCompletedToday = true;
    localStorage.setItem("yeliz_quest_quiz", "true");
    
    if (scorePercent === 100) {
        localStorage.setItem("yeliz_perfect_quiz_unlocked", "true");
    }

    if (totalQuestions >= 30) {
        localStorage.setItem("yeliz_marathon_quiz_unlocked", "true");
    }

    checkDailyQuests();
    incrementStreak();
    checkAchievements();
}

// Helper Array Shuffler (Fisher-Yates Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 10. Toast Notifications
function showToast(message, isWarning = false) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;

    const icon = toast.querySelector(".toast-icon");
    const msgSpan = toast.querySelector(".toast-message");

    // Message
    if (msgSpan) msgSpan.textContent = message;

    // Toast Theme styles
    if (isWarning) {
        toast.classList.add("warning");
        if (icon) icon.className = "fa-solid fa-triangle-exclamation toast-icon";
    } else {
        toast.classList.remove("warning");
        if (icon) icon.className = "fa-solid fa-circle-check toast-icon";
    }

    // Trigger display
    toast.classList.add("show");
    
    // Auto-dismiss
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ==========================================================================
// 12. Settings Drawer & Theme Customizer Engine (Midnight, Emerald, Sunset, Amethyst, Aurora)
// ==========================================================================
function applySavedTheme() {
    const savedTheme = localStorage.getItem("yeliz_theme") || "midnight";
    applyTheme(savedTheme);
}

function applyTheme(themeName) {
    // Remove old classes
    document.body.classList.remove("theme-emerald", "theme-sunset", "theme-amethyst", "theme-aurora");
    
    if (themeName !== "midnight") {
        document.body.classList.add(`theme-${themeName}`);
    }
    
    // Update active class in Drawer list options
    const options = document.querySelectorAll(".theme-option");
    options.forEach(opt => {
        if (opt.getAttribute("data-theme") === themeName) {
            opt.classList.add("active");
        } else {
            opt.classList.remove("active");
        }
    });
}

function setupSettingsListeners() {
    const desktopBtn = document.getElementById("settings-toggle-btn");
    const mobileBtn = document.getElementById("burger-menu-btn");
    const closeBtn = document.getElementById("drawer-close-btn");
    const overlay = document.getElementById("settings-drawer-overlay");
    const drawer = document.getElementById("settings-drawer");
    
    const openDrawer = () => {
        if (drawer) drawer.classList.add("active");
        if (overlay) overlay.classList.add("active");
    };
    
    const closeDrawer = () => {
        if (drawer) drawer.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
    };
    
    if (desktopBtn) desktopBtn.addEventListener("click", openDrawer);
    if (mobileBtn) mobileBtn.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);
    
    // Theme options click handlers
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            const theme = opt.getAttribute("data-theme");
            applyTheme(theme);
            localStorage.setItem("yeliz_theme", theme);
            const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
            const themeName = opt.querySelector("h5").textContent;
            showToast(isEn ? `Theme changed to: ${themeName} ✨` : `Tema değiştirildi: ${themeName} ✨`);
        });
    });

    // Language buttons click handlers
    const trBtn = document.getElementById("lang-tr-btn");
    const enBtn = document.getElementById("lang-en-btn");
    
    if (trBtn) {
        trBtn.addEventListener("click", () => {
            applyLanguage("tr");
            localStorage.setItem("yeliz_lang", "tr");
            showToast("Dil Türkçe olarak ayarlandı! 🇹🇷");
        });
    }
    if (enBtn) {
        enBtn.addEventListener("click", () => {
            applyLanguage("en");
            localStorage.setItem("yeliz_lang", "en");
            showToast("Language set to English! 🇺🇸");
        });
    }
    
    // Reset Progress handler
    const resetBtn = document.getElementById("reset-progress-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
            const confirmMsg = isEn ? 
                "Are you sure you want to reset all your study progress, earned badges, streaks, and custom words? This cannot be undone!" :
                "Tüm ders çalışma ilerlemenizi, kazandığınız rozetleri, günlük serilerinizi ve kendi eklediğiniz kelimeleri sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz!";
            
            const confirmReset = confirm(confirmMsg);
            if (confirmReset) {
                localStorage.clear(); // Clear all localStorage values
                showToast(isEn ? "All progress reset. Reloading page..." : "Tüm verileriniz sıfırlandı. Sayfa yeniden yükleniyor...", true);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        });
    }
}

// ==========================================================================
// 11. Gamification Engine (Streaks, Quests, Word of the Day & Achievements)
// ==========================================================================
let streakCount = 0;
let lastActiveDate = "";
let cardsStudiedCount = 0;
let quizCompletedToday = false;
let wodListenedToday = false;
let wordOfTheDay = null;

function initGamification() {
    loadGamificationState();
    determineWordOfTheDay();
    checkDailyQuests();
    checkAchievements();
    setupWodListeners();
}

function loadGamificationState() {
    const today = getTodayDateString();
    const storedDate = localStorage.getItem("yeliz_last_active_date");
    
    lastActiveDate = storedDate || "";
    streakCount = parseInt(localStorage.getItem("yeliz_streak_count") || "0");
    
    // Check if the date is different (new day)
    if (storedDate !== today) {
        // Reset daily progress
        cardsStudiedCount = 0;
        quizCompletedToday = false;
        wodListenedToday = false;
        
        localStorage.setItem("yeliz_cards_studied_today", "0");
        localStorage.setItem("yeliz_quest_quiz", "false");
        localStorage.setItem("yeliz_quest_wod", "false");
        
        // If they missed a day (difference is greater than 1 day), reset streak
        if (storedDate) {
            const dateDiff = Math.floor((new Date(today) - new Date(storedDate)) / 86400000);
            if (dateDiff > 1) {
                streakCount = 0;
                localStorage.setItem("yeliz_streak_count", "0");
            }
        }
    } else {
        // Load today's progress
        cardsStudiedCount = parseInt(localStorage.getItem("yeliz_cards_studied_today") || "0");
        quizCompletedToday = localStorage.getItem("yeliz_quest_quiz") === "true";
        wodListenedToday = localStorage.getItem("yeliz_quest_wod") === "true";
    }
}

function getTodayDateString() {
    const d = new Date();
    // format as YYYY-MM-DD local time
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

// Automatically increment streak when user finishes a quest/action on a new day
function incrementStreak() {
    const today = getTodayDateString();
    
    if (lastActiveDate !== today) {
        streakCount++;
        lastActiveDate = today;
        
        localStorage.setItem("yeliz_streak_count", streakCount.toString());
        localStorage.setItem("yeliz_last_active_date", today);
        
        // Update stats
        const streakEl = document.getElementById("stat-daily-streak");
        if (streakEl) streakEl.textContent = `${streakCount} Gün`;
        
        showToast(`Günlük Seri Artırıldı! 🔥 ${streakCount} Gündür Çalışıyorsun!`);
        checkAchievements();
    }
}

function trackCardStudyProgress() {
    cardsStudiedCount++;
    localStorage.setItem("yeliz_cards_studied_today", cardsStudiedCount.toString());
    
    if (cardsStudiedCount === 5) {
        showToast("Günlük Görev Tamamlandı: 5 Kart İncelendi! ⚡");
        incrementStreak();
    }
    
    checkDailyQuests();
}

function checkDailyQuests() {
    const cardQuestItem = document.getElementById("quest-cards");
    const quizQuestItem = document.getElementById("quest-quiz");
    const wodQuestItem = document.getElementById("quest-wod");
    
    const qcCards = document.getElementById("qc-cards");
    const qcQuiz = document.getElementById("qc-quiz");
    const qcWod = document.getElementById("qc-wod");
    
    const qtCards = document.getElementById("qt-cards");
    const qtQuiz = document.querySelector("#quest-quiz .quest-text");
    const qtWod = document.querySelector("#quest-wod .quest-text");
    
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    
    // 1. Cards Quest (0/5)
    if (qtCards) {
        qtCards.textContent = isEn ? `Study 5 Flashcards (${Math.min(5, cardsStudiedCount)}/5)` : `5 Kelime Kartı çalış (${Math.min(5, cardsStudiedCount)}/5)`;
    }
    
    // 2. Quiz Quest
    if (qtQuiz) {
        qtQuiz.textContent = isEn ? "Complete one Quiz" : "Bir İngilizce Quiz tamamla";
    }
    
    // 3. WOD Quest
    if (qtWod) {
        qtWod.textContent = isEn ? "Listen to the Word of the Day" : "Günün Kelimesini dinle";
    }
    
    if (cardsStudiedCount >= 5) {
        if (cardQuestItem) cardQuestItem.classList.add("completed");
        if (qcCards) qcCards.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else {
        if (cardQuestItem) cardQuestItem.classList.remove("completed");
        if (qcCards) qcCards.innerHTML = '<i class="fa-regular fa-circle"></i>';
    }
    
    // 2. Quiz Quest Status
    if (quizCompletedToday) {
        if (quizQuestItem) quizQuestItem.classList.add("completed");
        if (qcQuiz) qcQuiz.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else {
        if (quizQuestItem) quizQuestItem.classList.remove("completed");
        if (qcQuiz) qcQuiz.innerHTML = '<i class="fa-regular fa-circle"></i>';
    }
    
    // 3. WOD Quest Status
    if (wodListenedToday) {
        if (wodQuestItem) wodQuestItem.classList.add("completed");
        if (qcWod) qcWod.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else {
        if (wodQuestItem) wodQuestItem.classList.remove("completed");
        if (qcWod) qcWod.innerHTML = '<i class="fa-regular fa-circle"></i>';
    }
}

function determineWordOfTheDay() {
    const enEl = document.getElementById("wod-en");
    const typeEl = document.getElementById("wod-type");
    const trEl = document.getElementById("wod-tr");
    const exEnEl = document.getElementById("wod-ex-en");
    const exTrEl = document.getElementById("wod-ex-tr");
    
    if (wordsList.length === 0) return;
    
    // Date Hash selector
    const todayStr = getTodayDateString();
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
        hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % wordsList.length;
    wordOfTheDay = wordsList[index];
    
    if (enEl) enEl.textContent = wordOfTheDay.en;
    if (typeEl) {
        if (wordOfTheDay.id.startsWith("cust_")) {
            typeEl.textContent = `(${wordOfTheDay.type})`;
        } else {
            let shortCat = "Genel";
            if (wordOfTheDay.category.includes("Aviation")) shortCat = "Havacılık";
            else if (wordOfTheDay.category.includes("Tourism")) shortCat = "Turizm";
            else if (wordOfTheDay.category.includes("Kitchen")) shortCat = "Mutfak";
            else if (wordOfTheDay.category.includes("Technology")) shortCat = "Teknoloji";
            else if (wordOfTheDay.category.includes("Business")) shortCat = "İş & Eko";
            else if (wordOfTheDay.category.includes("Medicine")) shortCat = "Tıp & Sağlık";
            else if (wordOfTheDay.category.includes("Science")) shortCat = "Bilim & Uzay";
            else if (wordOfTheDay.category.includes("Academic")) shortCat = "Akademi";
            else if (wordOfTheDay.category.includes("Fashion")) shortCat = "Moda";
            else if (wordOfTheDay.category.includes("Sports")) shortCat = "Spor";
            else if (wordOfTheDay.category.includes("Nature")) shortCat = "Doğa";
            else if (wordOfTheDay.category.includes("Law")) shortCat = "Hukuk";
            else if (wordOfTheDay.category.includes("Music")) shortCat = "Müzik & Sanat";
            
            typeEl.textContent = `(${shortCat})`;
        }
    }
    if (trEl) trEl.textContent = wordOfTheDay.tr;
    
    if (exEnEl) exEnEl.textContent = "";
    if (exTrEl) exTrEl.textContent = "";
    
    if (wordOfTheDay.exEn) {
        if (exEnEl) exEnEl.textContent = `"${wordOfTheDay.exEn}"`;
        if (exTrEl) exTrEl.textContent = `"${wordOfTheDay.exTr}"`;
    } else {
        if (exEnEl) exEnEl.textContent = "Günün kelimesi örneği yükleniyor...";
        if (exTrEl) exTrEl.textContent = "";
        
        loadDynamicExampleSentence(wordOfTheDay, exEnEl, exTrEl, "wod");
    }
}

function setupWodListeners() {
    const ttsBtn = document.getElementById("wod-tts-btn");
    const studyBtn = document.getElementById("wod-study-btn");
    
    if (ttsBtn) {
        ttsBtn.addEventListener("click", () => {
            if (wordOfTheDay) {
                speakEnglishText(wordOfTheDay.en);
                trackWodListening();
            }
        });
    }
    
    if (studyBtn) {
        studyBtn.addEventListener("click", () => {
            if (wordOfTheDay) {
                studyWordInCards(wordOfTheDay.id);
                // Studying it in cards also triggers daily WOD listening achievement to be user-friendly!
                trackWodListening();
            }
        });
    }
}

function checkAchievements() {
    // Badge 1: First Step (Mark 1 word as learned)
    const badgeFirstStep = document.getElementById("badge-first-step");
    if (badgeFirstStep) {
        if (learnedWordIds.length >= 1) {
            badgeFirstStep.classList.remove("locked");
        } else {
            badgeFirstStep.classList.add("locked");
        }
    }
    
    // Badge 2: Aviation Explorer (Mark 5 aviation words as learned)
    const badgeAviation = document.getElementById("badge-aviation");
    if (badgeAviation) {
        const aviationCount = wordsList.filter(w => w.category.includes("Aviation") && learnedWordIds.includes(w.id)).length;
        if (aviationCount >= 5) {
            badgeAviation.classList.remove("locked");
        } else {
            badgeAviation.classList.add("locked");
        }
    }
    
    // Badge 3: Quiz Perfect (Score 100% on a quiz)
    const badgeQuiz = document.getElementById("badge-quiz-perfect");
    if (badgeQuiz) {
        const isPerfect = localStorage.getItem("yeliz_perfect_quiz_unlocked") === "true";
        if (isPerfect) {
            badgeQuiz.classList.remove("locked");
        } else {
            badgeQuiz.classList.add("locked");
        }
    }
    
    // Badge 4: Consistent Star (3 days streak)
    const badgeStreak = document.getElementById("badge-streak-3");
    if (badgeStreak) {
        if (streakCount >= 3) {
            badgeStreak.classList.remove("locked");
        } else {
            badgeStreak.classList.add("locked");
        }
    }

    // Badge 5: Tourism Explorer (Mark 5 tourism words as learned)
    const badgeTourism = document.getElementById("badge-tourism");
    if (badgeTourism) {
        const tourismCount = wordsList.filter(w => w.category.includes("Tourism") && learnedWordIds.includes(w.id)).length;
        if (tourismCount >= 5) {
            badgeTourism.classList.remove("locked");
        } else {
            badgeTourism.classList.add("locked");
        }
    }

    // Badge 6: Author Badge (Add 3 custom words)
    const badgeCustom = document.getElementById("badge-custom-3");
    if (badgeCustom) {
        if (customWords.length >= 3) {
            badgeCustom.classList.remove("locked");
        } else {
            badgeCustom.classList.add("locked");
        }
    }

    // Badge 7: Marathoner Badge (Complete a 30 questions quiz)
    const badgeMarathon = document.getElementById("badge-marathon");
    if (badgeMarathon) {
        const isMarathonUnlocked = localStorage.getItem("yeliz_marathon_quiz_unlocked") === "true";
        if (isMarathonUnlocked) {
            badgeMarathon.classList.remove("locked");
        } else {
            badgeMarathon.classList.add("locked");
        }
    }

    // Badge 8: Word Hunter (Learn 25 words)
    const badgeHunter = document.getElementById("badge-hunter-25");
    if (badgeHunter) {
        if (learnedWordIds.length >= 25) {
            badgeHunter.classList.remove("locked");
        } else {
            badgeHunter.classList.add("locked");
        }
    }
}

// ==========================================================================
// 13. Localization & i18n Engine (Turkish / English Support)
// ==========================================================================
const TRANSLATIONS = {
    tr: {
        "nav-home": "Ana Sayfa",
        "nav-cards": "Kelime Kartları",
        "nav-list": "Tüm Kelimeler",
        "nav-add": "Kelime Ekle",
        "btn-add-word": "Yeni Kelime Ekle",
        "nav-tenses": "Zamanlar & Modallar",
        "nav-quiz": "Quiz",
        "tenses-title": "Zamanlar & Modallar",
        "tenses-subtitle": "İngilizce dilbilgisindeki 12 temel zamanı (Tenses) ve en çok kullanılan kipleri (Modals) detaylı formüller ve örneklerle öğrenin.",
        "grammar-topics": "Konu Listesi",
        "grammar-usage": "Kullanım Amacı",
        "grammar-formula": "Cümle Yapısı (Formül)",
        "grammar-ex-title": "Örnek Cümleler (Olumlu / Olumsuz / Soru)",
        "stat-total": "Toplam Kelime",
        "stat-learned": "Öğrenilen Kelimeler",
        "stat-custom": "Eklediğim Kelimeler",
        "stat-streak": "Çalışma Serisi",
        "quests-title": "Günlük Görevler",
        "quests-subtitle": "Her gün sıfırlanır, serini korumak için tamamla!",
        "wod-title": "Günün Kelimesi",
        "wod-subtitle": "Bugünün odaklanılacak kelimesi",
        "wod-study-btn": "Kartta Çalış",
        "badges-title": "Başarı Rozetleri",
        "badges-subtitle": "Yolculuğunda kazandığın ödüller",
        "badge-first-step-title": "İlk Adım",
        "badge-aviation-title": "Kaptan",
        "badge-quiz-title": "Dahi",
        "badge-streak-title": "İstikrarlı",
        "badge-tourism-title": "Gezgin",
        "badge-custom-title": "Yazar",
        "badge-marathon-title": "Maratoncu",
        "badge-hunter-title": "Avcı",
        "qa-title": "Bugün Ne Yapmak İstersin?",
        "qa-subtitle": "Öğrenme yolculuğuna devam etmek için aşağıdaki aktivitelerden birini seçerek anında başlayabilirsin.",
        "qa-search-title": "Kelimeleri Ara",
        "qa-search-desc": "3900'den fazla kelimelik sözlükte filtreleme ve arama yap.",
        "qa-search-btn": "Sözlüğe Git",
        "qa-cards-title": "Kartlarla Çalış",
        "qa-cards-desc": "3D döndürülebilir akıllı kartlar ve seslendirme ile öğren.",
        "qa-cards-btn": "Kartları Aç",
        "qa-quiz-title": "Quiz Başlat",
        "qa-quiz-desc": "Çok modlu testler çöz, puan topla ve serini koru.",
        "qa-quiz-btn": "Testi Başlat",
        "drawer-title": "Ayarlar & Temalar",
        "drawer-theme-title": "Renk Teması Seçimi",
        "drawer-theme-desc": "Uygulamanın görsel stilini dilediğiniz gibi değiştirin:",
        "theme-mid": "Gece Mavisi (Varsayılan)",
        "theme-mid-desc": "Derin lacivert & canlı indigo tonları",
        "theme-eme": "Zümrüt Ormanı",
        "theme-eme-desc": "Huzur verici yeşil & zümrüt tonları",
        "theme-sun": "Gün Batımı",
        "theme-sun-desc": "Sıcak kızıl & turuncu esintileri",
        "theme-amy": "Mor Düşler",
        "theme-amy-desc": "Kozmik mor & mistik eflatun tonları",
        "theme-aur": "Kuzey Işıkları",
        "theme-aur-desc": "Fütüristik camgöbeği & turkuaz parıltısı",
        "drawer-lang-title": "Dil Seçimi (Language)",
        "drawer-lang-desc": "Uygulama arayüz dilini değiştirin:",
        "drawer-reset-title": "İlerleme Sıfırlama",
        "drawer-reset-desc": "Çalışma verilerinizi temizleyebilirsiniz (serileriniz, rozetleriniz ve kendi eklediğiniz kelimeler sıfırlanır):",
        "drawer-reset-btn": "Tüm İlerlemeyi Sıfırla"
    },
    en: {
        "nav-home": "Home",
        "nav-cards": "Flashcards",
        "nav-list": "Dictionary",
        "nav-add": "Add Word",
        "btn-add-word": "Add New Word",
        "nav-tenses": "Grammar & Modals",
        "nav-quiz": "Quiz",
        "tenses-title": "Tenses & Modals",
        "tenses-subtitle": "Learn the 12 basic tenses and key modals of English with structural formulas and examples.",
        "grammar-topics": "Topic List",
        "grammar-usage": "Usage / Purpose",
        "grammar-formula": "Sentence Structure (Formula)",
        "grammar-ex-title": "Example Sentences (Positive / Negative / Question)",
        "stat-total": "Total Words",
        "stat-learned": "Learned Words",
        "stat-custom": "My Custom Words",
        "stat-streak": "Study Streak",
        "quests-title": "Daily Quests",
        "quests-subtitle": "Resets daily, complete to protect your streak!",
        "wod-title": "Word of the Day",
        "wod-subtitle": "Today's focal word to learn",
        "wod-study-btn": "Study in Cards",
        "badges-title": "Achievement Badges",
        "badges-subtitle": "Rewards earned on your journey",
        "badge-first-step-title": "First Step",
        "badge-aviation-title": "Captain",
        "badge-quiz-title": "Genius",
        "badge-streak-title": "Consistent",
        "badge-tourism-title": "Explorer",
        "badge-custom-title": "Author",
        "badge-marathon-title": "Marathoner",
        "badge-hunter-title": "Word Hunter",
        "qa-title": "What would you like to do today?",
        "qa-subtitle": "Choose from the learning activities below to get started instantly.",
        "qa-search-title": "Search Dictionary",
        "qa-search-desc": "Search and filter in our 3900+ words database.",
        "qa-search-btn": "Go to Dictionary",
        "qa-cards-title": "Study Flashcards",
        "qa-cards-desc": "Learn with 3D flippable smart cards and voice feedback.",
        "qa-cards-btn": "Open Flashcards",
        "qa-quiz-title": "Start a Quiz",
        "qa-quiz-desc": "Take multi-mode quizzes, test yourself, and save your streak.",
        "qa-quiz-btn": "Start Quiz",
        "drawer-title": "Settings & Themes",
        "drawer-theme-title": "Color Theme Select",
        "drawer-theme-desc": "Change the visual style of the application:",
        "theme-mid": "Midnight Blue (Default)",
        "theme-mid-desc": "Deep navy & vibrant indigo hues",
        "theme-eme": "Emerald Forest",
        "theme-eme-desc": "Calming spruce green & emerald hues",
        "theme-sun": "Sunset Orange",
        "theme-sun-desc": "Warm crimson & amber sunset glow",
        "theme-amy": "Deep Amethyst",
        "theme-amy-desc": "Cosmic violet & mystic amethyst hues",
        "theme-aur": "Aurora Cyan",
        "theme-aur-desc": "Futuristic cyan & electric turquoise glow",
        "drawer-lang-title": "Language Selection",
        "drawer-lang-desc": "Toggle the interface language:",
        "drawer-reset-title": "Reset Progress",
        "drawer-reset-desc": "Clean up your learning data (streaks, badges, and custom words will be deleted):",
        "drawer-reset-btn": "Reset All Progress"
    }
};

function applySavedLanguage() {
    const savedLang = localStorage.getItem("yeliz_lang") || "tr";
    applyLanguage(savedLang);
}

function applyLanguage(lang) {
    currentLang = lang;
    
    // 1. Text elements translations
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });
    
    // 2. Active buttons updates in drawer selection
    const trBtn = document.getElementById("lang-tr-btn");
    const enBtn = document.getElementById("lang-en-btn");
    
    if (trBtn && enBtn) {
        if (lang === "tr") {
            trBtn.classList.add("active");
            trBtn.style.background = "";
            trBtn.style.borderColor = "";
            trBtn.style.color = "";
            
            enBtn.classList.remove("active");
            enBtn.style.background = "rgba(255,255,255,0.03)";
            enBtn.style.borderColor = "var(--glass-border)";
            enBtn.style.color = "var(--text-secondary)";
        } else {
            enBtn.classList.add("active");
            enBtn.style.background = "";
            enBtn.style.borderColor = "";
            enBtn.style.color = "";
            
            trBtn.classList.remove("active");
            trBtn.style.background = "rgba(255,255,255,0.03)";
            trBtn.style.borderColor = "var(--glass-border)";
            trBtn.style.color = "var(--text-secondary)";
        }
    }
    
    // 3. Dynamic header titles & labels translation updates
    setGreeting(); // Refresh greeting to translate time words
    checkDailyQuests(); // Refresh quests labels
}

function trackWodListening() {
    if (!wodListenedToday) {
        wodListenedToday = true;
        localStorage.setItem("yeliz_quest_wod", "true");
        showToast(currentLang === 'en' ? "Daily Quest Completed: Listened to Word of the Day! ⚡" : "Günlük Görev Tamamlandı: Günün Kelimesi Dinlendi! ⚡");
        incrementStreak();
        checkDailyQuests();
    }
}

// ==========================================================================
// 14. PWA Installation Helper
// ==========================================================================
let deferredPrompt;
const installBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar
    e.preventDefault();
    // Stash the event
    deferredPrompt = e;
    // Show the custom install button
    if (installBtn) {
        installBtn.style.display = 'flex';
    }
});

if (installBtn) {
    installBtn.addEventListener('click', () => {
        if (!deferredPrompt) return;
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for user choice
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            installBtn.style.display = 'none';
        });
    });
}

window.addEventListener('appinstalled', (evt) => {
    console.log('Yeliz English was installed.');
    if (installBtn) {
        installBtn.style.display = 'none';
    }
});

// ==========================================================================
// 15. Zamanlar & Modallar (Tenses & Modals) Controller Logic
// ==========================================================================
let activeGrammarItem = null;
let currentExampleIndex = 0;

function initGrammarTab() {
    const tensesContainer = document.getElementById("tenses-list-container");
    const modalsContainer = document.getElementById("modals-list-container");
    
    if (!tensesContainer || !modalsContainer) return;
    
    tensesContainer.innerHTML = "";
    modalsContainer.innerHTML = "";
    
    const db = typeof TENSES_MODALS_DATABASE !== 'undefined' ? TENSES_MODALS_DATABASE : [];
    
    db.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "grammar-topic-btn";
        btn.setAttribute("data-id", item.id);
        
        btn.innerHTML = `
            <span class="en-title">${item.title}</span>
            <span class="tr-sub">${item.trTitle}</span>
        `;
        
        btn.addEventListener("click", () => {
            selectGrammarTopic(item.id);
        });
        
        if (item.category === "Tense") {
            tensesContainer.appendChild(btn);
        } else {
            modalsContainer.appendChild(btn);
        }
    });
}

function selectGrammarTopic(id) {
    const db = typeof TENSES_MODALS_DATABASE !== 'undefined' ? TENSES_MODALS_DATABASE : [];
    const topic = db.find(item => item.id === id);
    if (!topic) return;
    
    activeGrammarItem = topic;
    currentExampleIndex = 0;
    
    // Update active button state in sidebar
    document.querySelectorAll(".grammar-topic-btn").forEach(btn => {
        if (btn.getAttribute("data-id") === id) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Toggle content displays
    const emptyState = document.getElementById("grammar-empty-state");
    const displayPanel = document.getElementById("grammar-content-display");
    
    if (emptyState) emptyState.style.display = "none";
    if (displayPanel) displayPanel.style.display = "block";
    
    // Populate header & details
    const categoryEl = document.getElementById("grammar-item-category");
    const titleEl = document.getElementById("grammar-item-title");
    const trTitleEl = document.getElementById("grammar-item-tr-title");
    const usageEl = document.getElementById("grammar-item-usage");
    const formulaEl = document.getElementById("grammar-item-formula");
    
    if (categoryEl) categoryEl.textContent = topic.category;
    if (titleEl) titleEl.textContent = topic.title;
    if (trTitleEl) trTitleEl.textContent = topic.trTitle;
    if (usageEl) usageEl.textContent = topic.usage;
    if (formulaEl) formulaEl.textContent = topic.formula;
    
    // Render examples slides
    renderGrammarExamples();
}

function renderGrammarExamples() {
    const container = document.getElementById("grammar-examples-container");
    if (!container || !activeGrammarItem) return;
    
    container.innerHTML = "";
    
    const examples = activeGrammarItem.examples || [];
    
    examples.forEach((ex, idx) => {
        const slide = document.createElement("div");
        slide.className = `grammar-example-slide ${idx === currentExampleIndex ? "active" : ""}`;
        
        slide.innerHTML = `
            <div class="state-block positive-block">
                <span class="state-lbl pos">Olumlu (Positive)</span>
                <p class="state-sentence-en">${ex.positive}</p>
                <p class="state-sentence-tr">${ex.positiveTr}</p>
            </div>
            <div class="state-block negative-block">
                <span class="state-lbl neg">Olumsuz (Negative)</span>
                <p class="state-sentence-en">${ex.negative}</p>
                <p class="state-sentence-tr">${ex.negativeTr}</p>
            </div>
            <div class="state-block question-block">
                <span class="state-lbl que">Soru (Question)</span>
                <p class="state-sentence-en">${ex.question}</p>
                <p class="state-sentence-tr">${ex.questionTr}</p>
            </div>
        `;
        
        container.appendChild(slide);
    });
    
    // Update indicator
    const indicator = document.getElementById("grammar-carousel-indicator");
    if (indicator) {
        indicator.textContent = `${currentExampleIndex + 1} / ${examples.length}`;
    }
}

function setupGrammarListeners() {
    const prevBtn = document.getElementById("grammar-prev-ex-btn");
    const nextBtn = document.getElementById("grammar-next-ex-btn");
    
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (!activeGrammarItem) return;
            const len = activeGrammarItem.examples ? activeGrammarItem.examples.length : 0;
            if (len === 0) return;
            
            currentExampleIndex = (currentExampleIndex - 1 + len) % len;
            renderGrammarExamples();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (!activeGrammarItem) return;
            const len = activeGrammarItem.examples ? activeGrammarItem.examples.length : 0;
            if (len === 0) return;
            
            currentExampleIndex = (currentExampleIndex + 1) % len;
            renderGrammarExamples();
        });
    }
}
