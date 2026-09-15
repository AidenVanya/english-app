/* ==========================================================================
   LexiGoo - Interactive Controller and Multi-Language State Management
   ========================================================================== */

// 1. State Variables
let targetLang = "en"; // 'en' (English) or 'de' (German)
let wordsList = [];
let customWords = [];
let learnedWordIds = [];
let activeTab = "home-tab";
let currentLang = "tr"; // 'tr' (Turkish), 'en' (English), or 'de' (German)
let wordAddedToday = false;

// Flashcard Browser State
let currentFilter = "all"; // 'all', 'General', 'Aviation (Havacılık)', 'Tourism (Turizm)', 'custom', 'learned', 'learning'
let searchPhrase = "";
let filteredWords = [];
let currentCardIndex = 0;
let isCardFlipped = false;
let preventAutoShuffle = false; // Flag to prevent double shuffling during dictionary redirects

// Dictionary List State
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
let quizStartTime = 0;

// Gamification & Streaks State
let streakCount = 0;
let lastActiveDate = "";
let cardsStudiedCount = 0;
let quizCompletedToday = false;
let wodListenedToday = false;
let ttsListenedTodayCount = 0;
let ttsListenedWordsToday = [];
let wordsLearnedTodayCount = 0;
let allQuestsBonusCelebrated = false;
let wordOfTheDay = null;

// Grammar & Tenses State
let activeGrammarItem = null;
let currentExampleIndex = 0;

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
function initApp() {
    applySavedTargetLanguage();
    loadDataFromStorage();
    setupTabListeners();
    setupFlashcardListeners();
    setupDictionaryListeners();
    setupFormListener();
    setupQuizListeners();
    setupGrammarListeners();
    setupTargetLanguageListeners();
    
    // Initial renders & settings loader
    initGamification(); // Load streaks, quests & Word of the Day
    setupSettingsListeners();
    applySavedTheme();
    applySavedLanguage(); // Initialize interface language
    renderDashboard(); // Render initial total words, learned words, custom words, streak count
    filterFlashcards(false); // Prepare initial flashcards without shuffle
    renderDictionaryList();
    initGrammarTab(); // Load initial grammar sidebar options
    updateFormLabelsForTargetLang();
    
    // Dynamic greeting based on hours
    setGreeting();

    // ThreeUI 3D Hero Shader Background
    initHero3DBackground();

    // Lock screen orientation to portrait on mobile/PWA
    lockPortraitOrientation();

    // Enable achievement sounds and unlock banners after bootstrap is fully settled
    setTimeout(() => {
        isAppReady = true;
    }, 1200);
}

// Lock device orientation to portrait if supported by mobile browser / PWA
function lockPortraitOrientation() {
    try {
        if (window.screen && window.screen.orientation && typeof window.screen.orientation.lock === "function") {
            window.screen.orientation.lock("portrait-primary").catch(() => {
                window.screen.orientation.lock("portrait").catch(() => {});
            });
        }
    } catch (e) {
        // Silently ignore if unsupported
    }
}
window.addEventListener("click", lockPortraitOrientation, { once: true, passive: true });
window.addEventListener("touchstart", lockPortraitOrientation, { once: true, passive: true });

// Helper for localStorage keys with migration from legacy linguapulse_ and yeliz_ prefixes
function getAppStorage(key) {
    return localStorage.getItem("lexigoo_" + key) ?? localStorage.getItem("linguapulse_" + key) ?? localStorage.getItem("yeliz_" + key);
}
function setAppStorage(key, value) {
    localStorage.setItem("lexigoo_" + key, value);
}

// Load and apply saved target learning language (en / de)
function applySavedTargetLanguage() {
    targetLang = getAppStorage("target_lang") || "en";
    updateTargetLanguageUI();
}

function updateTargetLanguageUI() {
    // Header buttons
    const enBtn = document.getElementById("target-en-btn");
    const deBtn = document.getElementById("target-de-btn");
    if (enBtn && deBtn) {
        if (targetLang === "de") {
            deBtn.classList.add("active");
            enBtn.classList.remove("active");
        } else {
            enBtn.classList.add("active");
            deBtn.classList.remove("active");
        }
    }
    // Drawer buttons
    const drawerEn = document.getElementById("drawer-target-en");
    const drawerDe = document.getElementById("drawer-target-de");
    if (drawerEn && drawerDe) {
        if (targetLang === "de") {
            drawerDe.classList.add("active");
            drawerEn.classList.remove("active");
        } else {
            drawerEn.classList.add("active");
            drawerDe.classList.remove("active");
        }
    }
}

function setupTargetLanguageListeners() {
    const enBtn = document.getElementById("target-en-btn");
    const deBtn = document.getElementById("target-de-btn");
    const drawerEn = document.getElementById("drawer-target-en");
    const drawerDe = document.getElementById("drawer-target-de");

    if (enBtn) enBtn.addEventListener("click", () => setTargetLanguage("en"));
    if (deBtn) deBtn.addEventListener("click", () => setTargetLanguage("de"));
    if (drawerEn) drawerEn.addEventListener("click", () => setTargetLanguage("en"));
    if (drawerDe) drawerDe.addEventListener("click", () => setTargetLanguage("de"));
}

function setTargetLanguage(lang, notify = true) {
    if (targetLang === lang && wordsList.length > 0) return;
    targetLang = lang;
    setAppStorage("target_lang", lang);
    updateTargetLanguageUI();
    loadDataFromStorage();
    
    // Refresh all views
    renderDashboard();
    filterFlashcards(true);
    listCurrentPage = 1;
    renderDictionaryList();
    initGrammarTab();
    determineWordOfTheDay();
    updateFormLabelsForTargetLang();
    
    if (notify) {
        const isDe = targetLang === "de";
        let msg = "";
        if (currentLang === "en") {
            msg = isDe ? "Target learning language set to German! 🇩🇪" : "Target learning language set to English! 🇬🇧";
        } else if (currentLang === "de") {
            msg = isDe ? "Lernsprache auf Deutsch eingestellt! 🇩🇪" : "Lernsprache auf Englisch eingestellt! 🇬🇧";
        } else {
            msg = isDe ? "Öğrenilen dil Almanca olarak ayarlandı! 🇩🇪" : "Öğrenilen dil İngilizce olarak ayarlandı! 🇬🇧";
        }
        showToast(msg);
    }
}

// Update form & dictionary labels based on target language
function updateFormLabelsForTargetLang() {
    const isDe = targetLang === "de";
    const isEnUi = currentLang === "en";
    const isDeUi = currentLang === "de";

    // 1. Table Header
    const thWord = document.getElementById("th-target-word");
    if (thWord) {
        if (isDe) {
            thWord.textContent = isEnUi ? "German Word" : (isDeUi ? "Deutsches Wort" : "Almanca");
        } else {
            thWord.textContent = isEnUi ? "English Word" : (isDeUi ? "Englisches Wort" : "İngilizce");
        }
    }

    // 2. Add Word Form labels & placeholders
    const labelTargetText = document.getElementById("label-word-target-text");
    const labelExTargetText = document.getElementById("label-word-example-target-text");
    const enInput = document.getElementById("word-en");
    const exEnInput = document.getElementById("word-example-en");
    
    if (labelTargetText) {
        if (isDe) {
            labelTargetText.textContent = isEnUi ? "German Word" : (isDeUi ? "Deutsches Wort" : "Almanca Kelime");
        } else {
            labelTargetText.textContent = isEnUi ? "English Word" : (isDeUi ? "Englisches Wort" : "İngilizce Kelime");
        }
    }
    if (labelExTargetText) {
        if (isDe) {
            labelExTargetText.textContent = isEnUi ? "German Example (Optional)" : (isDeUi ? "Deutsches Beispiel (Optional)" : "Almanca Örnek (İsteğe Bağlı)");
        } else {
            labelExTargetText.textContent = isEnUi ? "English Example (Optional)" : (isDeUi ? "Englisches Beispiel (Optional)" : "İngilizce Örnek (İsteğe Bağlı)");
        }
    }
    if (enInput) {
        enInput.placeholder = isDe 
            ? (isEnUi ? "e.g., die Herausforderung" : (isDeUi ? "z. B. die Herausforderung" : "Örn: die Herausforderung"))
            : (isEnUi ? "e.g., Serendipity" : (isDeUi ? "z. B. Serendipity" : "Örn: Serendipity"));
    }
    if (exEnInput) {
        exEnInput.placeholder = isDe 
            ? (isEnUi ? "e.g., Deutsch lernen macht Spaß." : (isDeUi ? "z. B. Deutsch lernen macht Spaß." : "Örn: Deutsch lernen macht Spaß."))
            : (isEnUi ? "e.g., It happened by serendipity." : (isDeUi ? "z. B. It happened by serendipity." : "Örn: It happened by serendipity."));
    }

    // 3. Flashcard Tips, Tag & Subtitle
    const cardTipFrontText = document.getElementById("card-tip-front-text");
    const cardTipBackText = document.getElementById("card-tip-back-text");
    const cardBackTag = document.getElementById("card-back-tag");
    const cardsTabDesc = document.getElementById("cards-tab-desc");

    if (cardTipFrontText) {
        cardTipFrontText.textContent = isEnUi ? "Click to flip" : (isDeUi ? "Klicken zum Umdrehen" : "Çevirmek için tıkla");
    }
    if (cardTipBackText) {
        if (isDe) {
            cardTipBackText.textContent = isEnUi ? "Click to return to German" : (isDeUi ? "Klicken, um zu Deutsch zurückzukehren" : "Almancaya dönmek için tıkla");
        } else {
            cardTipBackText.textContent = isEnUi ? "Click to return to English" : (isDeUi ? "Klicken, um zu Englisch zurückzukehren" : "İngilizceye dönmek için tıkla");
        }
    }
    if (cardBackTag) {
        cardBackTag.textContent = isEnUi ? "Turkish Meaning" : (isDeUi ? "Türkische Bedeutung" : "Türkçe Anlamı");
    }
    if (cardsTabDesc) {
        if (isDe) {
            cardsTabDesc.textContent = isEnUi 
                ? "Click cards to reveal the Turkish meaning and listen to German pronunciation."
                : (isDeUi ? "Klicke auf die Karten, um die Bedeutung zu sehen und die deutsche Aussprache anzuhören." : "Kartların üzerine tıklayarak Türkçe anlamını görebilir ve ses simgesi ile Almanca telaffuzunu dinleyebilirsin.");
        } else {
            cardsTabDesc.textContent = isEnUi 
                ? "Click cards to reveal the Turkish meaning and listen to English pronunciation."
                : (isDeUi ? "Klicke auf die Karten, um die Bedeutung zu sehen und die englische Aussprache anzuhören." : "Kartların üzerine tıklayarak Türkçe anlamını görebilir ve ses simgesi ile İngilizce telaffuzunu dinleyebilirsin.");
        }
    }

    // 4. Dictionary Search Placeholder & Subtitle
    const listSearch = document.getElementById("list-search");
    const listTabDesc = document.getElementById("list-tab-desc");
    if (listSearch) {
        if (isDe) {
            listSearch.placeholder = isEnUi ? "Search in German or Turkish..." : (isDeUi ? "Auf Deutsch oder Türkisch suchen..." : "Almanca veya Türkçe arama yapın...");
        } else {
            listSearch.placeholder = isEnUi ? "Search in English or Turkish..." : (isDeUi ? "Auf Englisch oder Türkisch suchen..." : "İngilizce veya Türkçe arama yapın...");
        }
    }
    if (listTabDesc) {
        if (isDe) {
            listTabDesc.textContent = isEnUi 
                ? "Search through 640+ German words, filter by categories (Numbers, Tourism, Aviation...) and listen to pronunciations."
                : (isDeUi ? "Durchsuche über 640 deutsche Wörter, filtere nach Kategorien und höre dir die Aussprache an." : "Sistemde yüklü olan 640'tan fazla Almanca kelimeyi arayabilir, kullanım alanlarına (Sayılar, Havacılık, Turizm, Genel) göre filtreleyebilir ve telaffuzlarını dinleyebilirsiniz.");
        } else {
            listTabDesc.textContent = isEnUi 
                ? "Search through 4000+ English words, filter by categories (Numbers, Tourism, Aviation...) and listen to pronunciations."
                : (isDeUi ? "Durchsuche über 4000 englische Wörter, filtere nach Kategorien und höre dir die Aussprache an." : "Sistemde yüklü olan 4000'den fazla İngilizce kelimeyi arayabilir, kullanım alanlarına (Sayılar, Havacılık, Turizm, Genel) göre filtreleyebilir ve telaffuzlarını dinleyebilirsiniz.");
        }
    }

    // 5. Grammar Tab Subtitle & Headings
    const tensesSubtitle = document.getElementById("tenses-subtitle");
    const grammarTensesHeading = document.getElementById("grammar-tenses-heading");
    const grammarModalsHeading = document.getElementById("grammar-modals-heading");
    if (tensesSubtitle) {
        if (isDe) {
            tensesSubtitle.textContent = isEnUi 
                ? "Learn German grammar tenses (Zeiten) and modal verbs (Modalverben) with structural formulas and examples."
                : (isDeUi ? "Lernen Sie deutsche Grammatikzeiten (Zeiten) und Modalverben mit Formeln und Beispielen." : "Almanca dilbilgisindeki temel zamanları (Zeiten) ve en çok kullanılan kipleri (Modalverben) detaylı formüller ve örneklerle öğrenin.");
        } else {
            tensesSubtitle.textContent = isEnUi 
                ? "Learn core English tenses and modals with structural formulas and examples."
                : (isDeUi ? "Lernen Sie die wichtigsten englischen Zeiten und Modalverben mit Formeln und Beispielen." : "İngilizce dilbilgisindeki 12 temel zamanı (Tenses) ve en çok kullanılan kipleri (Modals) detaylı formüller ve örneklerle öğrenin.");
        }
    }
    if (grammarTensesHeading) {
        if (isDe) {
            grammarTensesHeading.textContent = isEnUi ? "Tenses (Zeiten)" : (isDeUi ? "Zeiten (Grammatik)" : "Zamanlar (Zeiten)");
        } else {
            grammarTensesHeading.textContent = isEnUi ? "Tenses" : (isDeUi ? "Zeiten (Tenses)" : "Zamanlar (Tenses)");
        }
    }
    if (grammarModalsHeading) {
        if (isDe) {
            grammarModalsHeading.textContent = isEnUi ? "Modals (Modalverben)" : (isDeUi ? "Modalverben" : "Kipler (Modalverben)");
        } else {
            grammarModalsHeading.textContent = isEnUi ? "Modals" : (isDeUi ? "Modale (Modals)" : "Kipler (Modals)");
        }
    }

    // 6. Quiz Intro & Options
    const quizIntroDesc = document.getElementById("quiz-intro-desc");
    const quizOptToTr = document.getElementById("quiz-opt-to-tr");
    const quizOptToTarget = document.getElementById("quiz-opt-to-target");
    if (quizIntroDesc) {
        if (isDe) {
            quizIntroDesc.textContent = isEnUi 
                ? "Test your knowledge with German/Turkish translations or context fill-in-the-blanks!"
                : (isDeUi ? "Teste dein Wissen mit Deutsch/Türkisch-Übersetzungen oder Lückentexten!" : "Kelimelerin Türkçe/Almanca karşılıklarını veya cümle içindeki doğru kullanımlarını test et!");
        } else {
            quizIntroDesc.textContent = isEnUi 
                ? "Test your knowledge with English/Turkish translations or context fill-in-the-blanks!"
                : (isDeUi ? "Teste dein Wissen mit Englisch/Türkisch-Übersetzungen oder Lückentexten!" : "Kelimelerin Türkçe/İngilizce karşılıklarını veya cümle içindeki doğru kullanımlarını test et!");
        }
    }
    if (quizOptToTr) {
        if (isDe) {
            quizOptToTr.textContent = isEnUi ? "German ➔ Turkish (Find Meaning)" : (isDeUi ? "Deutsch ➔ Türkisch (Bedeutung)" : "Almanca ➔ Türkçe (Anlamını Bul)");
        } else {
            quizOptToTr.textContent = isEnUi ? "English ➔ Turkish (Find Meaning)" : (isDeUi ? "Englisch ➔ Türkisch (Bedeutung)" : "İngilizce ➔ Türkçe (Anlamını Bul)");
        }
    }
    if (quizOptToTarget) {
        if (isDe) {
            quizOptToTarget.textContent = isEnUi ? "Turkish ➔ German (Find Word)" : (isDeUi ? "Türkisch ➔ Deutsch (Wort finden)" : "Türkçe ➔ Almanca (Kelimeyi Bul)");
        } else {
            quizOptToTarget.textContent = isEnUi ? "Turkish ➔ English (Find Word)" : (isDeUi ? "Türkisch ➔ Englisch (Wort finden)" : "Türkçe ➔ İngilizce (Kelimeyi Bul)");
        }
    }

    // 7. Refresh daily quests labels with targetLang awareness
    if (typeof checkDailyQuests === "function") {
        checkDailyQuests();
    }
}

// Load state from localStorage safely for the active target language
function loadDataFromStorage() {
    // Custom Words
    const storedCustom = getAppStorage("custom_words");
    if (storedCustom) {
        try {
            const allCustom = JSON.parse(storedCustom) || [];
            // Filter custom words that match active target language (or legacy words without lang)
            customWords = allCustom.filter(w => !w.lang || w.lang === targetLang);
        } catch (e) {
            console.error("Error parsing custom words storage:", e);
            customWords = [];
        }
    } else {
        customWords = [];
    }

    // Learned Word IDs per language
    const storageKey = targetLang === "de" ? "learned_words_de" : "learned_words";
    const storedLearned = getAppStorage(storageKey);
    if (storedLearned) {
        try {
            learnedWordIds = JSON.parse(storedLearned) || [];
        } catch (e) {
            console.error("Error parsing learned words storage:", e);
            learnedWordIds = [];
        }
    } else {
        learnedWordIds = [];
    }

    // Combine lists
    updateMergedWordsList();
}

// Merge default database (from words_db.js or words_de_db.js) and custom words
function updateMergedWordsList() {
    let baseDb = [];
    if (targetLang === "de") {
        baseDb = typeof WORDS_DE_DATABASE !== 'undefined' ? WORDS_DE_DATABASE : [];
    } else {
        baseDb = typeof WORDS_DATABASE !== 'undefined' ? WORDS_DATABASE : [];
    }

    // Ensure all entries have normalized word, en, de properties
    baseDb.forEach(word => {
        if (!word.word) word.word = word.de || word.en;
        if (!word.en && word.de) word.en = word.de;
        if (!word.de && word.en) word.de = word.en;
    });

    // Inject cached dynamic sentences into baseDb
    try {
        const cachedData = getAppStorage("dynamic_sentences");
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
        console.error("Error reading cached dynamic sentences:", e);
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

    // Reset scroll position on tab switch for mobile
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Hide old active content
    const oldContent = document.getElementById(activeTab);
    const oldBtns = document.querySelectorAll(`.nav-btn[data-tab="${activeTab}"]`);
    if (oldContent) oldContent.classList.remove("active");
    oldBtns.forEach(btn => btn.classList.remove("active"));

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
    const newBtns = document.querySelectorAll(`.nav-btn[data-tab="${tabId}"]`);
    
    if (newContent) {
        newContent.classList.add("active");
        
        // Wait for class addition before styling so animation triggers
        setTimeout(() => {
            newContent.style.opacity = "1";
        }, 50);
    }
    newBtns.forEach(btn => btn.classList.add("active"));

    // Specific tab loading logic
    if (tabId === "home-tab") {
        renderDashboard();
        if (window.hero3DController) window.hero3DController.resume();
    } else {
        if (window.hero3DController) window.hero3DController.pause();
        if (tabId === "cards-tab") {
            if (preventAutoShuffle) {
                preventAutoShuffle = false; // Reset flag
            } else {
                filterFlashcards(true); // Shuffle automatically on open
            }
        } else if (tabId === "list-tab") {
            renderDictionaryList();
        }
    }
}

// 5. Dashboard Calculations
function renderDashboard() {
    const totalWordsEl = document.getElementById("stat-total-words");
    const learnedWordsEl = document.getElementById("stat-learned-words");
    const customWordsEl = document.getElementById("stat-custom-words");
    const streakEl = document.getElementById("stat-daily-streak");

    if (totalWordsEl) totalWordsEl.textContent = (wordsList ? wordsList.length : 0);
    if (learnedWordsEl) learnedWordsEl.textContent = (learnedWordIds ? learnedWordIds.length : 0);
    if (customWordsEl) customWordsEl.textContent = (customWords ? customWords.length : 0);
    
    if (streakEl) {
        const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
        const isDe = typeof currentLang !== 'undefined' && currentLang === 'de';
        const unit = isEn ? "Days" : (isDe ? "Tage" : "Gün");
        streakEl.textContent = `${streakCount || 0} ${unit}`;
    }
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
                const cur = parseInt(getAppStorage("total_cards_studied") || "0") + 1;
                setAppStorage("total_cards_studied", cur.toString());
                if (typeof logStudyActivity === "function") logStudyActivity();
                if (typeof checkAchievements === "function") checkAchievements();
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

    // TTS button (Word Pronunciation)
    if (ttsBtn) {
        ttsBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent flip
            const activeWord = filteredWords[currentCardIndex];
            if (activeWord) {
                const textToSpeak = activeWord.word || (targetLang === "de" ? activeWord.de : activeWord.en) || activeWord.en;
                speakEnglishText(textToSpeak);
            }
        });
    }

    // Sentence TTS button & Clickable Example Sentence on Flashcard Back
    const exTtsBtn = document.getElementById("card-example-tts-btn");
    const exEnEl = document.getElementById("card-example-en");
    
    const speakCardExample = (e) => {
        if (e) e.stopPropagation(); // prevent flipping card back
        const activeWord = filteredWords[currentCardIndex];
        if (activeWord) {
            let sentence = (targetLang === "de" ? (activeWord.exDe || activeWord.exEn) : (activeWord.exEn || activeWord.exDe)) || "";
            sentence = sentence.replace(/^["']|["']$/g, "").trim();
            if (sentence) {
                speakEnglishText(sentence);
                if (typeof trackSentenceAudioListen === "function") trackSentenceAudioListen();
            }
        }
    };
    
    if (exTtsBtn) {
        exTtsBtn.addEventListener("click", speakCardExample);
    }
    if (exEnEl) {
        exEnEl.addEventListener("click", speakCardExample);
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
                const shuffles = parseInt(getAppStorage("total_card_shuffles") || "0") + 1;
                setAppStorage("total_card_shuffles", shuffles.toString());
                if (typeof checkAchievements === "function") checkAchievements();
                showToast(currentLang === 'en' ? "Words shuffled! 🔀" : (currentLang === 'de' ? "Wörter gemischt! 🔀" : "Kelimeler karıştırıldı! 🔀"));
            }
        });
    }

    // Global Keyboard Navigation for Flashcards
    document.addEventListener("keydown", (e) => {
        if (activeTab !== "cards-tab") return;
        // Don't intercept keypresses when typing in input or select elements
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") return;

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prev = document.getElementById("prev-card-btn");
            if (prev) prev.click();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            const next = document.getElementById("next-card-btn");
            if (next) next.click();
        } else if (e.key === " " || e.key === "Spacebar" || e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const flashcardEl = document.getElementById("main-flashcard");
            if (flashcardEl) flashcardEl.click();
        } else if (e.key === "s" || e.key === "S") {
            const ttsBtn = document.getElementById("card-tts-btn");
            if (ttsBtn) ttsBtn.click();
        }
    });
}

function resetFlashcardState() {
    isCardFlipped = false;
    const flashcardEl = document.getElementById("main-flashcard");
    if (flashcardEl) {
        flashcardEl.classList.remove("flipped");
    }
}

// Multi-Language Speech Synthesizer (English & German Support)
function speakEnglishText(text, forcedLang = null) {
    if (text && typeof text === "string") {
        const clean = text.replace(/^["']|["']$/g, "").trim();
        if (clean && clean.split(/\s+/).length <= 4) {
            trackWordAudioListen(clean);
        }
    }

    if ("speechSynthesis" in window) {
        // Cancel active readings
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        const langCode = forcedLang || (targetLang === "de" ? "de-DE" : "en-US");
        utterance.lang = langCode;
        utterance.rate = 0.85; // slightly slower for better learning clarity
        
        // Retrieve matching voices
        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;
        if (langCode.startsWith("de")) {
            selectedVoice = voices.find(voice => voice.lang.startsWith("de") || voice.lang.includes("DE"));
        } else {
            selectedVoice = voices.find(voice => voice.lang.startsWith("en-US") || voice.lang.startsWith("en-GB") || voice.lang.startsWith("en"));
        }
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        showToast("Tarayıcınız ses sentezleme özelliğini desteklemiyor.", true);
    }
}

// Track distinct word audio listen for daily quest 4
function trackWordAudioListen(wordText) {
    if (!wordText || typeof wordText !== "string") return;
    const cleanWord = wordText.trim().toLowerCase();

    // Track total audio listened for achievements
    const curAudio = parseInt(getAppStorage("total_audio_listened") || "0") + 1;
    setAppStorage("total_audio_listened", curAudio.toString());
    if (typeof logStudyActivity === "function") logStudyActivity();
    if (typeof checkAchievements === "function") checkAchievements();

    if (!ttsListenedWordsToday.includes(cleanWord)) {
        ttsListenedWordsToday.push(cleanWord);
        ttsListenedTodayCount = ttsListenedWordsToday.length;
        setAppStorage("tts_listened_words_today", JSON.stringify(ttsListenedWordsToday));
        setAppStorage("tts_listened_today", ttsListenedTodayCount.toString());
        
        if (ttsListenedTodayCount === 3) {
            const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
            const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';
            showToast(isEn ? "Daily Quest Completed: 3 Pronunciations Listened! ⚡" : (isDeUi ? "Tagesquest abgeschlossen: 3 Aussprachen angehört! ⚡" : "Günlük Görev Tamamlandı: 3 Kelime Telaffuzu Dinlendi! ⚡"));
            incrementStreak();
        }
        
        if (typeof checkDailyQuests === "function") {
            checkDailyQuests();
        }
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
        
        // Filter by specific database categories
        if (currentFilter !== "all" && currentFilter !== "custom" && currentFilter !== "learned" && currentFilter !== "learning") {
            if (word.category !== currentFilter) return false;
        }

        // Filter by search query
        if (searchPhrase) {
            const wordTarget = (targetLang === 'de' ? (word.de || word.word || word.en) : (word.en || word.word)) || "";
            const matchTarget = wordTarget.toLowerCase().includes(searchPhrase);
            const matchTr = (word.tr || "").toLowerCase().includes(searchPhrase);
            return matchTarget || matchTr;
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
    const cachedData = getAppStorage("dynamic_sentences");
    if (cachedData) {
        dynamicSentencesCache = JSON.parse(cachedData);
    }
} catch (e) {
    console.error("Cache initialization error:", e);
}

function loadDynamicExampleSentence(word, exEnEl, exTrEl, type = "card") {
    const wordTarget = word.word || (targetLang === "de" ? word.de : word.en) || word.en;
    if (!word || !wordTarget) return;
    
    // Safety check if they are already fetched in the background
    const existingEx = (targetLang === "de" ? (word.exDe || word.exEn) : (word.exEn || word.exDe));
    if (existingEx) {
        if (exEnEl) exEnEl.textContent = `"${existingEx}"`;
        if (exTrEl) exTrEl.textContent = `"${word.exTr || ''}"`;
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
    
    if (targetLang === "de") {
        // German fallback
        const fallbackEx = `Das Wort "${wordTarget}" ist sehr wichtig im Deutschen.`;
        const fallbackTr = `"${word.tr || wordTarget}" kelimesi Almancada çok önemlidir.`;
        word.exDe = fallbackEx;
        word.exTr = fallbackTr;
        if (exEnEl) exEnEl.textContent = `"${fallbackEx}"`;
        if (exTrEl) exTrEl.textContent = `"${fallbackTr}"`;
        return;
    }

    // Fetch from API for English
    const englishWord = encodeURIComponent(wordTarget.toLowerCase());
    const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${englishWord}`;
    
    fetch(dictionaryApiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Dictionary API request failed");
            return response.json();
        })
        .then(data => {
            let foundExample = "";
            
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
            
            if (!foundExample) {
                foundExample = `This is a study card for the word: ${wordTarget}.`;
            }
            
            const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(foundExample)}&langpair=en|tr`;
            return fetch(myMemoryUrl)
                .then(res => res.json())
                .then(transData => {
                    const translatedText = (transData.responseData && transData.responseData.translatedText) 
                        ? transData.responseData.translatedText.trim()
                        : `Bu, ${word.tr} kelimesinin örnek bir cümlesidir.`;
                    
                    word.exEn = foundExample;
                    word.exTr = translatedText;
                    
                    dynamicSentencesCache[word.id] = {
                        exEn: foundExample,
                        exTr: translatedText
                    };
                    setAppStorage("dynamic_sentences", JSON.stringify(dynamicSentencesCache));
                    
                    updateUIIfActive();
                });
        })
        .catch(err => {
            console.warn("Could not load dynamic example sentence:", err);
            const fallbackExample = `We need to check the definition of ${wordTarget}.`;
            const fallbackTranslation = `${wordTarget} (${word.tr}) kelimesinin tanımını kontrol etmemiz gerekiyor.`;
            
            word.exEn = fallbackExample;
            word.exTr = fallbackTranslation;
            
            updateUIIfActive();
        });
        
    function updateUIIfActive() {
        if (type === "card") {
            const currentEnText = document.getElementById("card-word-en") ? document.getElementById("card-word-en").textContent : "";
            if (currentEnText === wordTarget) {
                if (exEnEl) exEnEl.textContent = `"${word.exEn || word.exDe}"`;
                if (exTrEl) exTrEl.textContent = `"${word.exTr}"`;
            }
        } else if (type === "wod") {
            const currentWodText = document.getElementById("wod-en") ? document.getElementById("wod-en").textContent : "";
            if (currentWodText === wordTarget) {
                if (exEnEl) exEnEl.textContent = `"${word.exEn || word.exDe}"`;
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

    // Bound checks for currentCardIndex
    if (currentCardIndex >= filteredWords.length) {
        currentCardIndex = Math.max(0, filteredWords.length - 1);
    }
    if (currentCardIndex < 0) {
        currentCardIndex = 0;
    }

    const isEnUi = typeof currentLang !== 'undefined' && currentLang === 'en';
    const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';

    if (filteredWords.length === 0) {
        if (cardEl) cardEl.style.pointerEvents = "none";
        if (enEl) enEl.textContent = isEnUi ? "No Words Found" : (isDeUi ? "Keine Wörter gefunden" : "Kelime Bulunamadı");
        if (trEl) trEl.textContent = isEnUi ? "Please change search or filter" : (isDeUi ? "Bitte Suche oder Filter anpassen" : "Lütfen aramayı veya filtreyi değiştirin");
        if (typeEl) typeEl.textContent = "";
        if (exEnEl) exEnEl.textContent = isEnUi ? "Tip:" : (isDeUi ? "Tipp:" : "İpucu:");
        if (exTrEl) exTrEl.textContent = isEnUi ? "You can add custom words or select other categories." : (isDeUi ? "Sie können eigene Wörter hinzufügen oder andere Kategorien wählen." : "Kendi kelimelerinizi ekleyebilir veya diğer alanları filtreleyebilirsiniz.");
        if (categoryEl) categoryEl.textContent = isEnUi ? "EMPTY" : (isDeUi ? "LEER" : "BOŞ");
        if (indexNumEl) indexNumEl.textContent = "0";
        if (totalNumEl) totalNumEl.textContent = "0";
        if (markLearnedBtn) markLearnedBtn.style.display = "none";
        return;
    }

    if (cardEl) cardEl.style.pointerEvents = "auto";
    if (markLearnedBtn) markLearnedBtn.style.display = "flex";

    const word = filteredWords[currentCardIndex];
    if (!word) return;

    const wordTarget = word.word || (targetLang === "de" ? word.de : word.en) || word.en;

    // Card face text injections
    if (enEl) {
        enEl.textContent = wordTarget;
        if (wordTarget.length > 18) {
            enEl.style.fontSize = "24px";
        } else if (wordTarget.length > 12) {
            enEl.style.fontSize = "28px";
        } else {
            enEl.style.fontSize = "";
        }
    }
    if (trEl) {
        trEl.textContent = word.tr;
        if (word.tr.length > 25) {
            trEl.style.fontSize = "20px";
        } else if (word.tr.length > 15) {
            trEl.style.fontSize = "24px";
        } else {
            trEl.style.fontSize = "";
        }
    }
    if (typeEl) {
        if (word.id.startsWith("cust_")) {
            typeEl.textContent = `(${word.type})`;
        } else {
            typeEl.textContent = word.type || (targetLang === "de" ? "Wort" : "General");
        }
    }
    if (exEnEl) exEnEl.textContent = "";
    if (exTrEl) exTrEl.textContent = "";
    
    const exSentence = (targetLang === "de" ? (word.exDe || word.exEn) : (word.exEn || word.exDe)) || "";
    if (exSentence) {
        if (exEnEl) exEnEl.textContent = `"${exSentence}"`;
        if (exTrEl) exTrEl.textContent = `"${word.exTr || ''}"`;
    } else {
        if (exEnEl) exEnEl.textContent = isEnUi ? "Loading example sentence..." : (isDeUi ? "Beispielsatz wird geladen..." : "Örnek cümle yükleniyor...");
        if (exTrEl) exTrEl.textContent = "";
        loadDynamicExampleSentence(word, exEnEl, exTrEl, "card");
    }
    
    // Category representation
    if (categoryEl) {
        if (word.id.startsWith("cust_")) {
            categoryEl.textContent = isEnUi ? "Custom Word" : (isDeUi ? "Eigenes Wort" : "Benim Kelimem");
        } else if (word.category.includes("Aviation")) {
            categoryEl.textContent = isEnUi ? "Aviation" : (isDeUi ? "Luftfahrt" : "Havacılık");
        } else if (word.category.includes("Tourism")) {
            categoryEl.textContent = isEnUi ? "Tourism" : (isDeUi ? "Tourismus" : "Turizm");
        } else if (word.category.includes("Kitchen")) {
            categoryEl.textContent = isEnUi ? "Kitchen" : (isDeUi ? "Küche" : "Mutfak & Gastronomi");
        } else if (word.category.includes("Technology")) {
            categoryEl.textContent = isEnUi ? "Technology" : (isDeUi ? "Technologie" : "Teknoloji & Yazılım");
        } else if (word.category.includes("Business")) {
            categoryEl.textContent = isEnUi ? "Business" : (isDeUi ? "Wirtschaft" : "İş & Ekonomi");
        } else if (word.category.includes("Medicine")) {
            categoryEl.textContent = isEnUi ? "Medicine" : (isDeUi ? "Medizin" : "Tıp & Sağlık");
        } else if (word.category.includes("Science")) {
            categoryEl.textContent = isEnUi ? "Science" : (isDeUi ? "Wissenschaft" : "Bilim & Uzay");
        } else if (word.category.includes("Academic")) {
            categoryEl.textContent = isEnUi ? "Academic" : (isDeUi ? "Akademisch" : "Akademi & Eğitim");
        } else if (word.category.includes("Fashion")) {
            categoryEl.textContent = isEnUi ? "Fashion" : (isDeUi ? "Mode" : "Moda & Tasarım");
        } else if (word.category.includes("Sports")) {
            categoryEl.textContent = isEnUi ? "Sports" : (isDeUi ? "Sport" : "Spor & Egzersiz");
        } else if (word.category.includes("Nature")) {
            categoryEl.textContent = isEnUi ? "Nature" : (isDeUi ? "Natur" : "Doğa & Çevre");
        } else if (word.category.includes("Law")) {
            categoryEl.textContent = isEnUi ? "Law" : (isDeUi ? "Recht" : "Hukuk & Adalet");
        } else if (word.category.includes("Music")) {
            categoryEl.textContent = isEnUi ? "Music & Art" : (isDeUi ? "Musik & Kunst" : "Müzik & Sanat");
        } else if (word.category.includes("Numbers")) {
            categoryEl.textContent = isEnUi ? "Numbers (1-100)" : (isDeUi ? "Zahlen (1-100)" : "Sayılar (1-100)");
        } else {
            categoryEl.textContent = isEnUi ? "General" : (isDeUi ? "Allgemein" : "Genel");
        }
    }

    // Nav indicators
    if (indexNumEl) indexNumEl.textContent = currentCardIndex + 1;
    if (totalNumEl) totalNumEl.textContent = filteredWords.length;

    // Learned Checkbox logic
    const isLearned = learnedWordIds.includes(word.id);
    if (isLearned) {
        markLearnedBtn.classList.add("learned-active");
        if (learnedBtnText) learnedBtnText.textContent = isEnUi ? "Learned!" : (isDeUi ? "Gelernt!" : "Öğrenildi!");
        markLearnedBtn.querySelector("i").className = "fa-solid fa-circle-check";
    } else {
        markLearnedBtn.classList.remove("learned-active");
        if (learnedBtnText) learnedBtnText.textContent = isEnUi ? "Mark as Learned" : (isDeUi ? "Als gelernt markieren" : "Öğrendim Olarak İşaretle");
        markLearnedBtn.querySelector("i").className = "fa-regular fa-circle-check";
    }
}

// Toggle learned state function
function toggleWordLearned(wordId) {
    const index = learnedWordIds.indexOf(wordId);
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';
    if (index > -1) {
        // Remove from learned
        learnedWordIds.splice(index, 1);
        showToast(isEn ? "Word moved back to study list." : (isDeUi ? "Wort zurück auf die Lernliste verschoben." : "Kelime çalışılacaklar listesine geri alındı."));
    } else {
        // Add to states
        learnedWordIds.push(wordId);
        wordsLearnedTodayCount++;
        setAppStorage("words_learned_today", wordsLearnedTodayCount.toString());
        
        if (wordsLearnedTodayCount === 2) {
            showToast(isEn ? "Daily Quest Completed: 2 Words Learned Today! ⚡" : (isDeUi ? "Tagesquest abgeschlossen: 2 Wörter heute gelernt! ⚡" : "Günlük Görev Tamamlandı: Bugün 2 Kelime Öğrenildi! ⚡"));
            incrementStreak();
        }
        
        showToast(isEn ? "Great! Word marked as learned." : (isDeUi ? "Großartig! Wort als gelernt markiert." : "Harika! Kelime öğrenildi olarak işaretlendi."));
        
        if (typeof checkDailyQuests === "function") {
            checkDailyQuests();
        }
    }
    const storageKey = targetLang === "de" ? "learned_words_de" : "learned_words";
    setAppStorage(storageKey, JSON.stringify(learnedWordIds));
    
    // Evaluate achievements when status changes
    if (typeof logStudyActivity === 'function') {
        logStudyActivity();
    }
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
            const wordTarget = (targetLang === 'de' ? (word.de || word.word || word.en) : (word.en || word.word)) || "";
            const matchTarget = wordTarget.toLowerCase().includes(listSearchPhrase);
            const matchTr = (word.tr || "").toLowerCase().includes(listSearchPhrase);
            return matchTarget || matchTr;
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
        const wordDisplay = word.word || (targetLang === "de" ? word.de : word.en) || word.en;
        
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
        } else if (word.category.includes("Numbers")) {
            badgeClass += " badge-numbers";
            catText = "Sayılar";
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
            <td><strong>${wordDisplay}</strong></td>
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
            speakEnglishText(wordDisplay);
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

        // Check if word already exists in current list
        const wordExists = wordsList.some(w => {
            const wTxt = w.word || (targetLang === 'de' ? w.de : w.en) || w.en;
            return wTxt.toLowerCase() === enVal.toLowerCase();
        });
        if (wordExists) {
            showToast("Bu kelime zaten listende kayıtlı!", true);
            return;
        }

        // Create new word entity
        const newWord = {
            id: "cust_" + Date.now(),
            lang: targetLang,
            word: enVal,
            en: enVal,
            de: enVal,
            tr: trVal,
            category: "custom",
            type: catVal,
            exEn: exEnVal,
            exDe: exEnVal,
            exTr: exTrVal
        };

        // Add to persistent storage
        try {
            const allCustom = JSON.parse(getAppStorage("custom_words") || "[]");
            allCustom.push(newWord);
            setAppStorage("custom_words", JSON.stringify(allCustom));
        } catch(e) {
            console.error("Error saving custom word:", e);
        }
        
        loadDataFromStorage();
        renderDashboard();
        renderDictionaryList();
        if (typeof logStudyActivity === "function") logStudyActivity();
        if (typeof checkAchievements === "function") checkAchievements();
        
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
        setAppStorage("quest_add", "true");
        checkDailyQuests();
        incrementStreak();
    });
}

function deleteCustomWord(wordId) {
    const isEn = currentLang === 'en';
    const isDe = currentLang === 'de';
    const confirmMsg = isEn 
        ? "Are you sure you want to delete this word?" 
        : (isDe ? "Möchten Sie dieses Wort wirklich löschen?" : "Bu kelimeyi listenizden silmek istediğinize emin misiniz?");
        
    if (confirm(confirmMsg)) {
        try {
            let allCustom = JSON.parse(getAppStorage("custom_words") || "[]");
            allCustom = allCustom.filter(w => w.id !== wordId);
            setAppStorage("custom_words", JSON.stringify(allCustom));
        } catch(e) {
            console.error("Error deleting custom word:", e);
        }
        
        // Remove from learned list if present
        const storageKey = targetLang === "de" ? "learned_words_de" : "learned_words";
        learnedWordIds = learnedWordIds.filter(id => id !== wordId);
        setAppStorage(storageKey, JSON.stringify(learnedWordIds));

        loadDataFromStorage();
        renderDashboard();
        renderDictionaryList();
        filterFlashcards();
        showToast(isEn ? "Word deleted from list." : (isDe ? "Wort aus der Liste gelöscht." : "Kelime listeden silindi."), true);
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
    } else if (selectedSource !== "all") {
        sourceWords = wordsList.filter(w => w.category === selectedSource);
    } else {
        sourceWords = [...wordsList];
    }
    
    // If Sentence Fill-in-the-blank is selected, filter out words without example sentences
    if (selectedType === "sentence-fill") {
        sourceWords = sourceWords.filter(w => {
            const ex = targetLang === "de" ? (w.exDe || w.exEn) : (w.exEn || w.exDe);
            return ex && ex.trim() !== "";
        });
        if (sourceWords.length < 4) {
            alert("Boşluk doldurma testi başlatabilmek için seçilen alanda örnek cümlesi bulunan en az 4 kelime olmalıdır! Lütfen diğer kategorileri veya tüm kelimeleri seçin.");
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

    const isDe = targetLang === "de";

    for (let i = 0; i < questionsCount; i++) {
        const correctWord = shuffledWords[i];
        const correctTargetWord = correctWord.word || (isDe ? correctWord.de : correctWord.en) || correctWord.en;
        const wrongOptionsPool = sourceWords.filter(w => w.id !== correctWord.id);
        const shuffledWrongPool = shuffleArray([...wrongOptionsPool]);
        
        let questionText = "";
        let questionWord = "";
        let correctAnswer = "";
        let choices = [];
        let speakText = ""; 

        if (selectedType === "en-to-tr") {
            // Mode 1: Target Language to Turkish
            if (currentLang === "en") {
                questionText = isDe ? "What is the Turkish meaning of this German word?" : "What is the Turkish meaning of this English word?";
            } else if (currentLang === "de") {
                questionText = isDe ? "Was bedeutet dieses deutsche Wort auf Türkisch?" : "Was bedeutet dieses englische Wort auf Türkisch?";
            } else {
                questionText = isDe ? "Aşağıdaki Almanca kelimenin anlamı nedir?" : "Aşağıdaki İngilizce kelimenin anlamı nedir?";
            }
            questionWord = correctTargetWord;
            correctAnswer = correctWord.tr;
            speakText = correctTargetWord;
            
            const uniqueWrongTrs = [...new Set(
                shuffledWrongPool
                    .map(w => w.tr)
                    .filter(tr => tr && tr.toLowerCase().trim() !== correctWord.tr.toLowerCase().trim())
            )];
            choices = [correctWord.tr, ...uniqueWrongTrs.slice(0, 3)];
        } else if (selectedType === "tr-to-en") {
            // Mode 2: Turkish to Target Language
            if (currentLang === "en") {
                questionText = isDe ? "What is the German word for the Turkish meaning below?" : "What is the English word for the Turkish meaning below?";
            } else if (currentLang === "de") {
                questionText = isDe ? "Was ist das deutsche Wort für folgende türkische Bedeutung?" : "Was ist das englische Wort für folgende türkische Bedeutung?";
            } else {
                questionText = isDe ? "Aşağıdaki Türkçe anlamın Almanca karşılığı nedir?" : "Aşağıdaki Türkçe anlamın İngilizce karşılığı nedir?";
            }
            questionWord = correctWord.tr;
            correctAnswer = correctTargetWord;
            speakText = correctTargetWord; 
            
            const uniqueWrongTargets = [...new Set(
                shuffledWrongPool
                    .map(w => w.word || (isDe ? w.de : w.en) || w.en)
                    .filter(wTxt => wTxt && wTxt.toLowerCase().trim() !== correctTargetWord.toLowerCase().trim())
            )];
            choices = [correctTargetWord, ...uniqueWrongTargets.slice(0, 3)];
        } else if (selectedType === "sentence-fill") {
            // Mode 3: Sentence fill-in-the-blank
            if (currentLang === "en") {
                questionText = isDe ? "Choose the German word that fits the blank in the sentence:" : "Choose the English word that fits the blank in the sentence:";
            } else if (currentLang === "de") {
                questionText = isDe ? "Wähle das passende deutsche Wort für die Lücke im Satz:" : "Wähle das passende englische Wort für die Lücke im Satz:";
            } else {
                questionText = isDe ? "Cümledeki boşluğa uygun Almanca kelimeyi seçin:" : "Cümledeki boşluğa uygun İngilizce kelimeyi seçin:";
            }
            
            const exSentence = (isDe ? (correctWord.exDe || correctWord.exEn) : (correctWord.exEn || correctWord.exDe)) || "";
            
            // Blank out target word (and article if present) case-insensitively
            const wordOnly = correctTargetWord.replace(/^(der|die|das|den|dem|des|ein|eine|einen|einem|eines)\s+/i, "");
            const escapedWord = escapeRegExp(wordOnly);
            let blankedSentence = exSentence.replace(new RegExp(`\\b${escapedWord}\\b`, 'gi'), "______");
            if (blankedSentence === exSentence) {
                blankedSentence = exSentence.replace(new RegExp(escapedWord, 'gi'), "______");
            }
            if (blankedSentence === exSentence) {
                const fullEscaped = escapeRegExp(correctTargetWord);
                blankedSentence = exSentence.replace(new RegExp(fullEscaped, 'gi'), "______");
            }
            
            questionWord = blankedSentence || exSentence;
            correctAnswer = correctTargetWord;
            speakText = exSentence; // Read the entire sentence
            
            const uniqueWrongTargets = [...new Set(
                shuffledWrongPool
                    .map(w => w.word || (isDe ? w.de : w.en) || w.en)
                    .filter(wTxt => wTxt && wTxt.toLowerCase().trim() !== correctTargetWord.toLowerCase().trim())
            )];
            choices = [correctTargetWord, ...uniqueWrongTargets.slice(0, 3)];
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
    quizStartTime = Date.now();

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
    const questionBox = document.querySelector(".quiz-question-box");

    if (currentNumEl) currentNumEl.textContent = quizCurrentIndex + 1;
    if (totalNumEl) totalNumEl.textContent = quizQuestions.length;
    
    // Progress fill update with smooth width transition
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

    // Trigger entrance animation on question box
    if (questionBox) {
        questionBox.classList.remove("anim-question-in");
        void questionBox.offsetWidth; // Force reflow
        questionBox.classList.add("anim-question-in");
    }

    if (nextBtn) nextBtn.disabled = true;

    // Render choice cards with staggered spring entrance animation
    if (choicesContainer) {
        choicesContainer.innerHTML = "";
        
        currentQ.choices.forEach((choiceText, idx) => {
            const btn = document.createElement("button");
            btn.className = "choice-card anim-choice-enter";
            btn.style.animationDelay = `${idx * 0.06}s`;
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
    const choiceButtons = choicesContainer ? choicesContainer.querySelectorAll(".choice-card") : [];
    const nextBtn = document.getElementById("quiz-next-btn");

    // Disable all options
    choiceButtons.forEach(btn => {
        btn.classList.add("disabled");
        
        // Highlight correct translation in green regardless of user choice
        if (btn.textContent.trim() === correctText.trim()) {
            btn.classList.add("choice-correct");
        }
    });

    const activeQuestionScreen = document.getElementById("quiz-question-screen");

    if (selectedText.trim() === correctText.trim()) {
        // Correct answer selection - neon glow & pop bounce
        selectedButton.classList.add("choice-correct", "choice-pop");
        quizScoreCorrect++;
        
        const correctScoreBadge = document.getElementById("quiz-score-correct");
        if (correctScoreBadge) {
            correctScoreBadge.textContent = quizScoreCorrect;
            correctScoreBadge.style.transform = "scale(1.2)";
            setTimeout(() => { correctScoreBadge.style.transform = "scale(1)"; }, 200);
        }
    } else {
        // Wrong answer selection - crimson shake & pulse correct hint
        selectedButton.classList.add("choice-wrong", "choice-shake");
        
        choiceButtons.forEach(btn => {
            if (btn.textContent.trim() === correctText.trim()) {
                btn.classList.add("choice-hint-pulse");
            }
        });

        // Add shake animation to the active question screen
        if (activeQuestionScreen) {
            activeQuestionScreen.classList.add("shake");
            setTimeout(() => {
                activeQuestionScreen.classList.remove("shake");
            }, 500);
        }
    }

    // Enable next button with pulse
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

// Lightweight Celebratory Confetti Particle Engine for Quiz Results
function launchConfetti(canvasId, durationMs = 3000) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    canvas.width = parent ? (parent.clientWidth || 360) : 360;
    canvas.height = parent ? (parent.clientHeight || 460) : 460;

    const colors = ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#38bdf8", "#fbbf24"];
    const particles = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 60,
            y: canvas.height * 0.35,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.8) * 14 - 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.32,
            opacity: 1
        });
    }

    const start = performance.now();
    let animId;

    function frame(now) {
        const elapsed = now - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activeCount = 0;
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotSpeed;
            p.opacity = Math.max(0, 1 - (elapsed / durationMs));

            if (p.opacity > 0 && p.y < canvas.height + 25) {
                activeCount++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
                ctx.restore();
            }
        });

        if (activeCount > 0 && elapsed < durationMs) {
            animId = requestAnimationFrame(frame);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animId);
        }
    }
    animId = requestAnimationFrame(frame);
}

// Smooth numeric counter animation
function animateScoreCounter(elementId, targetPercent, durationMs = 1200) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / durationMs, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * targetPercent);
        el.textContent = `${current}%`;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = `${targetPercent}%`;
        }
    }
    requestAnimationFrame(tick);
}

function showQuizResults() {
    const correctValEl = document.getElementById("res-correct");
    const incorrectValEl = document.getElementById("res-incorrect");
    const emojiEl = document.getElementById("result-emoji");
    const titleEl = document.getElementById("result-title");
    const descEl = document.getElementById("result-desc");

    const totalQuestions = quizQuestions.length;
    const incorrectVal = totalQuestions - quizScoreCorrect;
    const scorePercent = Math.round((quizScoreCorrect / totalQuestions) * 100);

    // Save final score to localStorage for statistics
    setAppStorage("last_quiz_score", scorePercent);

    if (correctValEl) correctValEl.textContent = quizScoreCorrect;
    if (incorrectValEl) incorrectValEl.textContent = incorrectVal;
    
    // Smooth animated score percentage counter
    animateScoreCounter("res-score-percent", scorePercent);

    // Custom results summary styling
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';
    const isDeTarget = targetLang === 'de';

    if (scorePercent >= 80) {
        if (emojiEl) emojiEl.innerHTML = `<i class="fa-solid fa-trophy text-gold result-trophy-bounce" style="font-size: 65px;"></i>`;
        if (titleEl) titleEl.textContent = isEn ? "Awesome Job! 🎉" : (isDeUi ? "Großartig! 🎉" : "Harikasın! 🎉");
        if (descEl) {
            if (isEn) {
                descEl.textContent = "You learned the words perfectly! Keep studying like this.";
            } else if (isDeUi) {
                descEl.textContent = "Du hast die Wörter perfekt gelernt! Mach weiter so.";
            } else {
                descEl.textContent = isDeTarget 
                    ? "Kelimeleri mükemmel bir şekilde öğrenmişsin! Almanca çalışmalarına bu şekilde devam et."
                    : "Kelimeleri mükemmel bir şekilde öğrenmişsin! İngilizce çalışmalarına bu şekilde devam et.";
            }
        }
    } else if (scorePercent >= 50) {
        if (emojiEl) emojiEl.innerHTML = `<i class="fa-solid fa-star-half-stroke result-trophy-bounce" style="color: #f59e0b; font-size: 65px;"></i>`;
        if (titleEl) titleEl.textContent = isEn ? "Doing Great! 👍" : (isDeUi ? "Sehr gut! 👍" : "Çok İyi Gidiyorsun! 👍");
        if (descEl) {
            if (isEn) {
                descEl.textContent = "A good result! Study the flashcards a bit more to secure a 100% score.";
            } else if (isDeUi) {
                descEl.textContent = "Ein gutes Ergebnis! Lerne noch etwas mit den Karteikarten für 100%.";
            } else {
                descEl.textContent = "Gayet güzel bir sonuç! Kelime kartlarına biraz daha çalışarak 100% skoru yakalayabilirsin.";
            }
        }
    } else {
        if (emojiEl) emojiEl.innerHTML = `<i class="fa-solid fa-book-open" style="color: #38bdf8; font-size: 65px;"></i>`;
        if (titleEl) titleEl.textContent = isEn ? "Let's Practice! 💪" : (isDeUi ? "Weiter üben! 💪" : "Tekrar Çalışalım! 💪");
        if (descEl) {
            if (isEn) {
                descEl.textContent = "No problem at all. Flip the flashcards and practice with audio to achieve success!";
            } else if (isDeUi) {
                descEl.textContent = "Kein Problem! Drehe die Karten um und übe mit Audio, um dich zu verbessern.";
            } else {
                descEl.textContent = "Hiç sorun değil, kelime kartlarını çevirerek telaffuzlarıyla birlikte tekrar ederek başarıya ulaşabilirsin!";
            }
        }
    }

    showQuizScreen("quiz-results-screen");
    renderDashboard(); // Refresh stats on home tab

    // Launch celebratory confetti when user achieves >= 70%
    if (scorePercent >= 70) {
        setTimeout(() => {
            launchConfetti("quiz-confetti-canvas", 3200);
        }, 150);
    }

    // Mark Quest 2 completed if scored at least 70%
    if (scorePercent >= 70) {
        if (!quizCompletedToday) {
            quizCompletedToday = true;
            setAppStorage("quest_quiz", "true");
            showToast(isEn ? "Daily Quest Completed: Quiz Finished (70%+ Score)! ⚡" : (isDeUi ? "Tagesquest abgeschlossen: Quiz mit 70%+ bestanden! ⚡" : "Günlük Görev Tamamlandı: Quiz %70+ Başarıyla Tamamlandı! ⚡"));
            incrementStreak();
        }
    }
    
    // Update quiz metrics for achievements
    const totalQ = parseInt(getAppStorage("total_quizzes_completed") || "0") + 1;
    setAppStorage("total_quizzes_completed", totalQ.toString());

    if (scorePercent === 100) {
        setAppStorage("perfect_quiz_unlocked", "true");
        const perfCount = parseInt(getAppStorage("perfect_quiz_count") || "0") + 1;
        setAppStorage("perfect_quiz_count", perfCount.toString());
        if (typeof targetLang !== "undefined" && targetLang === "de") {
            setAppStorage("german_quiz_master", "true");
        }
        if (totalQuestions >= 30) {
            setAppStorage("marathon_perfect_quiz", "true");
        }
    }

    if (totalQuestions >= 30) {
        setAppStorage("marathon_quiz_unlocked", "true");
    }

    if (quizStartTime && totalQuestions >= 10) {
        const elapsedSec = (Date.now() - quizStartTime) / 1000;
        const avgPerQ = elapsedSec / totalQuestions;
        if (avgPerQ <= 4.0 && scorePercent >= 80) {
            setAppStorage("speed_quiz_unlocked", "true");
        }
    }

    if (typeof logStudyActivity === "function") {
        logStudyActivity();
    }

    checkDailyQuests();
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

// Helper to escape special regular expression characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
    const savedTheme = getAppStorage("theme") || "midnight";
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
            setAppStorage("theme", theme);
            const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
            const themeName = opt.querySelector("h5").textContent;
            showToast(isEn ? `Theme changed to: ${themeName} ✨` : `Tema değiştirildi: ${themeName} ✨`);
        });
    });

    // Language buttons click handlers
    const trBtn = document.getElementById("lang-tr-btn");
    const enBtn = document.getElementById("lang-en-btn");
    const deBtn = document.getElementById("lang-de-btn");
    
    if (trBtn) {
        trBtn.addEventListener("click", () => {
            applyLanguage("tr");
            setAppStorage("lang", "tr");
            showToast("Dil Türkçe olarak ayarlandı! 🇹🇷");
        });
    }
    if (enBtn) {
        enBtn.addEventListener("click", () => {
            applyLanguage("en");
            setAppStorage("lang", "en");
            showToast("Language set to English! 🇺🇸");
        });
    }
    if (deBtn) {
        deBtn.addEventListener("click", () => {
            applyLanguage("de");
            setAppStorage("lang", "de");
            showToast("Sprache auf Deutsch eingestellt! 🇩🇪");
        });
    }
    
    // Reset Progress handler
    const resetBtn = document.getElementById("reset-progress-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
            const isDe = typeof currentLang !== 'undefined' && currentLang === 'de';
            const confirmMsg = isEn ? 
                "Are you sure you want to reset all your study progress, earned badges, streaks, and custom words? This cannot be undone!" :
                (isDe ? "Möchten Sie wirklich Ihren gesamten Lernfortschritt, Abzeichen und benutzerdefinierten Wörter zurücksetzen?" :
                "Tüm ders çalışma ilerlemenizi, kazandığınız rozetleri, günlük serilerinizi ve kendi eklediğiniz kelimeleri sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz!");
            
            const confirmReset = confirm(confirmMsg);
            if (confirmReset) {
                localStorage.clear(); // Clear all localStorage values
                showToast(isEn ? "All progress reset. Reloading page..." : (isDe ? "Alle Fortschritte zurückgesetzt. Seite wird neu geladen..." : "Tüm verileriniz sıfırlandı. Sayfa yeniden yükleniyor..."), true);
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
function initGamification() {
    loadGamificationState();
    determineWordOfTheDay();
    checkDailyQuests();
    if (typeof initAchievementsEngine === "function") {
        initAchievementsEngine();
    }
    if (typeof checkAchievements === "function") {
        checkAchievements(true);
    }
    setupWodListeners();
}

function loadGamificationState() {
    const today = getTodayDateString();
    const storedDate = getAppStorage("last_active_date");
    
    lastActiveDate = storedDate || "";
    streakCount = parseInt(getAppStorage("streak_count") || "0");
    
    // Check if the date is different (new day)
    if (storedDate !== today) {
        // Reset daily progress for all 5 quests
        cardsStudiedCount = 0;
        quizCompletedToday = false;
        wodListenedToday = false;
        ttsListenedTodayCount = 0;
        ttsListenedWordsToday = [];
        wordsLearnedTodayCount = 0;
        allQuestsBonusCelebrated = false;
        
        setAppStorage("cards_studied_today", "0");
        setAppStorage("quest_quiz", "false");
        setAppStorage("quest_wod", "false");
        setAppStorage("tts_listened_today", "0");
        setAppStorage("tts_listened_words_today", "[]");
        setAppStorage("words_learned_today", "0");
        setAppStorage("quests_all_bonus", "false");
        
        // If they missed a day (difference is greater than 1 day), reset streak
        if (storedDate) {
            const dateDiff = Math.floor((new Date(today) - new Date(storedDate)) / 86400000);
            if (dateDiff > 1) {
                streakCount = 0;
                setAppStorage("streak_count", "0");
            }
        }
    } else {
        // Load today's progress
        cardsStudiedCount = parseInt(getAppStorage("cards_studied_today") || "0");
        quizCompletedToday = getAppStorage("quest_quiz") === "true";
        wodListenedToday = getAppStorage("quest_wod") === "true";
        try {
            ttsListenedWordsToday = JSON.parse(getAppStorage("tts_listened_words_today") || "[]");
        } catch(e) {
            ttsListenedWordsToday = [];
        }
        ttsListenedTodayCount = parseInt(getAppStorage("tts_listened_today") || ttsListenedWordsToday.length.toString());
        wordsLearnedTodayCount = parseInt(getAppStorage("words_learned_today") || "0");
        allQuestsBonusCelebrated = getAppStorage("quests_all_bonus") === "true";
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
        
        setAppStorage("streak_count", streakCount.toString());
        setAppStorage("last_active_date", today);
        
        // Update stats
        const streakEl = document.getElementById("stat-daily-streak");
        if (streakEl) streakEl.textContent = `${streakCount} Gün`;
        
        showToast(`Günlük Seri Artırıldı! 🔥 ${streakCount} Gündür Çalışıyorsun!`);
        checkAchievements();
    }
}

function trackCardStudyProgress() {
    cardsStudiedCount++;
    setAppStorage("cards_studied_today", cardsStudiedCount.toString());
    
    if (cardsStudiedCount === 10) {
        const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
        const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';
        showToast(isEn ? "Daily Quest Completed: 10 Flashcards Studied! ⚡" : (isDeUi ? "Tagesquest abgeschlossen: 10 Karteikarten gelernt! ⚡" : "Günlük Görev Tamamlandı: 10 Kart İncelendi! ⚡"));
        incrementStreak();
    }
    
    checkDailyQuests();
}

function checkDailyQuests() {
    const cardQuestItem = document.getElementById("quest-cards");
    const quizQuestItem = document.getElementById("quest-quiz");
    const wodQuestItem = document.getElementById("quest-wod");
    const ttsQuestItem = document.getElementById("quest-tts");
    const learnQuestItem = document.getElementById("quest-learn");
    
    const qcCards = document.getElementById("qc-cards");
    const qcQuiz = document.getElementById("qc-quiz");
    const qcWod = document.getElementById("qc-wod");
    const qcTts = document.getElementById("qc-tts");
    const qcLearn = document.getElementById("qc-learn");
    
    const qtCards = document.getElementById("qt-cards");
    const qtQuiz = document.getElementById("qt-quiz");
    const qtWod = document.getElementById("qt-wod");
    const qtTts = document.getElementById("qt-tts");
    const qtLearn = document.getElementById("qt-learn");

    const qpCards = document.getElementById("qp-cards");
    const qpQuiz = document.getElementById("qp-quiz");
    const qpWod = document.getElementById("qp-wod");
    const qpTts = document.getElementById("qp-tts");
    const qpLearn = document.getElementById("qp-learn");

    const overallBadge = document.getElementById("quests-overall-badge");
    const overallFill = document.getElementById("quests-overall-fill");
    
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const isDe = typeof currentLang !== 'undefined' && currentLang === 'de';
    const isDeTarget = typeof targetLang !== 'undefined' && targetLang === 'de';

    // 1. Cards Quest (0/10)
    const cardsCompleted = cardsStudiedCount >= 10;
    if (qtCards) {
        if (isEn) qtCards.textContent = `Study 10 Flashcards (${Math.min(10, cardsStudiedCount)}/10)`;
        else if (isDe) qtCards.textContent = `10 Karteikarten lernen (${Math.min(10, cardsStudiedCount)}/10)`;
        else qtCards.textContent = `10 Kelime Kartı çalış (${Math.min(10, cardsStudiedCount)}/10)`;
    }
    if (qpCards) qpCards.textContent = `${Math.min(10, cardsStudiedCount)}/10`;
    updateQuestItemUI(cardQuestItem, qcCards, cardsCompleted);
    
    // 2. Quiz Quest (%70+ Başarı)
    const quizCompleted = quizCompletedToday;
    if (qtQuiz) {
        if (isEn) qtQuiz.textContent = isDeTarget ? "Complete one German Quiz (70%+ Score)" : "Complete one English Quiz (70%+ Score)";
        else if (isDe) qtQuiz.textContent = isDeTarget ? "Ein Deutsch-Quiz abschließen (70%+ Punktzahl)" : "Ein Englisch-Quiz abschließen (70%+ Punktzahl)";
        else qtQuiz.textContent = isDeTarget ? "Bir Almanca Quiz tamamla (%70+ Başarı)" : "Bir İngilizce Quiz tamamla (%70+ Başarı)";
    }
    if (qpQuiz) qpQuiz.textContent = quizCompleted ? "1/1" : "0/1";
    updateQuestItemUI(quizQuestItem, qcQuiz, quizCompleted);
    
    // 3. WOD Quest
    const wodCompleted = wodListenedToday;
    if (qtWod) {
        if (isEn) qtWod.textContent = "Listen to the Word of the Day";
        else if (isDe) qtWod.textContent = "Wort des Tages anhören";
        else qtWod.textContent = "Günün Kelimesini dinle";
    }
    if (qpWod) qpWod.textContent = wodCompleted ? "1/1" : "0/1";
    updateQuestItemUI(wodQuestItem, qcWod, wodCompleted);

    // 4. TTS Listening Quest (0/3)
    const ttsCompleted = ttsListenedTodayCount >= 3;
    if (qtTts) {
        if (isEn) qtTts.textContent = `Listen to 3 Word Pronunciations (${Math.min(3, ttsListenedTodayCount)}/3)`;
        else if (isDe) qtTts.textContent = `Aussprache von 3 Wörtern anhören (${Math.min(3, ttsListenedTodayCount)}/3)`;
        else qtTts.textContent = `3 Farklı Kelimenin Telaffuzunu Dinle (${Math.min(3, ttsListenedTodayCount)}/3)`;
    }
    if (qpTts) qpTts.textContent = `${Math.min(3, ttsListenedTodayCount)}/3`;
    updateQuestItemUI(ttsQuestItem, qcTts, ttsCompleted);

    // 5. Learn Words Quest (0/2)
    const learnCompleted = wordsLearnedTodayCount >= 2;
    if (qtLearn) {
        if (isEn) qtLearn.textContent = `Mark 2 Words as Learned Today (${Math.min(2, wordsLearnedTodayCount)}/2)`;
        else if (isDe) qtLearn.textContent = `Heute 2 Wörter als gelernt markieren (${Math.min(2, wordsLearnedTodayCount)}/2)`;
        else qtLearn.textContent = `2 Kelimeyi "Öğrendim" Olarak İşaretle (${Math.min(2, wordsLearnedTodayCount)}/2)`;
    }
    if (qpLearn) qpLearn.textContent = `${Math.min(2, wordsLearnedTodayCount)}/2`;
    updateQuestItemUI(learnQuestItem, qcLearn, learnCompleted);

    // Overall Progress
    const completedCount = [cardsCompleted, quizCompleted, wodCompleted, ttsCompleted, learnCompleted].filter(Boolean).length;
    if (overallBadge) {
        overallBadge.textContent = `${completedCount}/5`;
        if (completedCount === 5) {
            overallBadge.classList.add("all-completed");
        } else {
            overallBadge.classList.remove("all-completed");
        }
    }
    if (overallFill) {
        overallFill.style.width = `${(completedCount / 5) * 100}%`;
    }

    // Celebration when all 5 are completed
    if (completedCount === 5 && !allQuestsBonusCelebrated) {
        allQuestsBonusCelebrated = true;
        setAppStorage("quests_all_bonus", "true");
        const today = getTodayDateString();
        let questDays = [];
        try {
            questDays = JSON.parse(getAppStorage("completed_quest_days") || "[]");
        } catch(e) { questDays = []; }
        if (!questDays.includes(today)) {
            questDays.push(today);
            setAppStorage("completed_quest_days", JSON.stringify(questDays));
        }
        showToast(isEn ? "Mastery! All 5 Daily Quests Completed Today! 🏆" : (isDe ? "Meisterleistung! Alle 5 Tagesquests abgeschlossen! 🏆" : "Harika! Bugünün 5 Günlük Görevinin Tümü Tamamlandı! 🏆"));
        if (typeof checkAchievements === "function") checkAchievements();
    }
}

function updateQuestItemUI(itemEl, checkEl, isCompleted) {
    if (!itemEl) return;
    if (isCompleted) {
        itemEl.classList.add("completed");
        if (checkEl) checkEl.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else {
        itemEl.classList.remove("completed");
        if (checkEl) checkEl.innerHTML = '<i class="fa-regular fa-circle"></i>';
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
    
    const isDe = targetLang === "de";
    const targetWord = wordOfTheDay.word || (isDe ? wordOfTheDay.de : wordOfTheDay.en) || wordOfTheDay.en;

    if (enEl) enEl.textContent = targetWord;
    if (typeEl) {
        const isEnUi = typeof currentLang !== 'undefined' && currentLang === 'en';
        const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';
        if (wordOfTheDay.id.startsWith("cust_")) {
            typeEl.textContent = isEnUi ? "(Custom)" : (isDeUi ? "(Eigenes)" : `(${wordOfTheDay.type})`);
        } else {
            let shortCat = isEnUi ? "General" : (isDeUi ? "Allgemein" : "Genel");
            if (wordOfTheDay.category.includes("Aviation")) shortCat = isEnUi ? "Aviation" : (isDeUi ? "Luftfahrt" : "Havacılık");
            else if (wordOfTheDay.category.includes("Tourism")) shortCat = isEnUi ? "Tourism" : (isDeUi ? "Tourismus" : "Turizm");
            else if (wordOfTheDay.category.includes("Kitchen")) shortCat = isEnUi ? "Kitchen" : (isDeUi ? "Küche" : "Mutfak");
            else if (wordOfTheDay.category.includes("Technology")) shortCat = isEnUi ? "Tech" : (isDeUi ? "Technik" : "Teknoloji");
            else if (wordOfTheDay.category.includes("Business")) shortCat = isEnUi ? "Business" : (isDeUi ? "Wirtschaft" : "İş & Eko");
            else if (wordOfTheDay.category.includes("Medicine")) shortCat = isEnUi ? "Medicine" : (isDeUi ? "Medizin" : "Tıp & Sağlık");
            else if (wordOfTheDay.category.includes("Science")) shortCat = isEnUi ? "Science" : (isDeUi ? "Wiss." : "Bilim & Uzay");
            else if (wordOfTheDay.category.includes("Academic")) shortCat = isEnUi ? "Academic" : (isDeUi ? "Akad." : "Akademi");
            else if (wordOfTheDay.category.includes("Fashion")) shortCat = isEnUi ? "Fashion" : (isDeUi ? "Mode" : "Moda");
            else if (wordOfTheDay.category.includes("Sports")) shortCat = isEnUi ? "Sports" : (isDeUi ? "Sport" : "Spor");
            else if (wordOfTheDay.category.includes("Nature")) shortCat = isEnUi ? "Nature" : (isDeUi ? "Natur" : "Doğa");
            else if (wordOfTheDay.category.includes("Law")) shortCat = isEnUi ? "Law" : (isDeUi ? "Recht" : "Hukuk");
            else if (wordOfTheDay.category.includes("Music")) shortCat = isEnUi ? "Music" : (isDeUi ? "Musik" : "Müzik & Sanat");
            else if (wordOfTheDay.category.includes("Numbers")) shortCat = isEnUi ? "Numbers" : (isDeUi ? "Zahlen" : "Sayılar");
            
            typeEl.textContent = `(${shortCat})`;
        }
    }
    if (trEl) trEl.textContent = wordOfTheDay.tr;
    
    if (exEnEl) exEnEl.textContent = "";
    if (exTrEl) exTrEl.textContent = "";
    
    const exSentence = (isDe ? (wordOfTheDay.exDe || wordOfTheDay.exEn) : (wordOfTheDay.exEn || wordOfTheDay.exDe)) || "";
    if (exSentence) {
        if (exEnEl) exEnEl.textContent = `"${exSentence}"`;
        if (exTrEl) exTrEl.textContent = `"${wordOfTheDay.exTr || ''}"`;
    } else {
        const isEnUi = typeof currentLang !== 'undefined' && currentLang === 'en';
        const isDeUi = typeof currentLang !== 'undefined' && currentLang === 'de';
        if (exEnEl) exEnEl.textContent = isEnUi ? "Loading Word of the Day example..." : (isDeUi ? "Beispiel für das Wort des Tages wird geladen..." : "Günün kelimesi örneği yükleniyor...");
        if (exTrEl) exTrEl.textContent = "";
        
        loadDynamicExampleSentence(wordOfTheDay, exEnEl, exTrEl, "wod");
    }
}

function setupWodListeners() {
    const ttsBtn = document.getElementById("wod-tts-btn");
    const sentenceTtsBtn = document.getElementById("wod-sentence-tts-btn");
    const exEnEl = document.getElementById("wod-ex-en");
    const studyBtn = document.getElementById("wod-study-btn");
    
    if (ttsBtn) {
        ttsBtn.addEventListener("click", () => {
            if (wordOfTheDay) {
                const targetWord = wordOfTheDay.word || (targetLang === "de" ? wordOfTheDay.de : wordOfTheDay.en) || wordOfTheDay.en;
                speakEnglishText(targetWord);
                trackWodListening();
            }
        });
    }

    const speakWodSentence = () => {
        if (wordOfTheDay) {
            let sentence = (targetLang === "de" ? (wordOfTheDay.exDe || wordOfTheDay.exEn) : (wordOfTheDay.exEn || wordOfTheDay.exDe)) || "";
            sentence = sentence.replace(/^["']|["']$/g, "").trim();
            if (sentence) {
                speakEnglishText(sentence);
                trackWodListening();
            }
        }
    };
    
    if (sentenceTtsBtn) {
        sentenceTtsBtn.addEventListener("click", speakWodSentence);
    }
    if (exEnEl) {
        exEnEl.addEventListener("click", speakWodSentence);
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

// ==========================================================================
// 12. Complete 58-Badge Achievements & Trophy System
// ==========================================================================
let audioCtx = null;
let unlockedAchievements = [];
let isAchievementsInitialized = false;
let isAppReady = false;
let currentAchCategoryFilter = "all";
let currentAchSearchQuery = "";

// Web Audio API Triumphant Chime Synthesizer (100% offline & client-side)
function playAchievementSound() {
    if (!isAppReady) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) {
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        // Warm celebratory chime chord: C5, E5, G5, C6
        const notes = [
            { freq: 523.25, time: 0.0, dur: 0.20, vol: 0.18 },
            { freq: 659.25, time: 0.11, dur: 0.22, vol: 0.20 },
            { freq: 783.99, time: 0.22, dur: 0.24, vol: 0.22 },
            { freq: 1046.50, time: 0.35, dur: 0.60, vol: 0.26 }
        ];

        notes.forEach(n => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(n.freq, now + n.time);

            gain.gain.setValueAtTime(0.0001, now + n.time);
            gain.gain.exponentialRampToValueAtTime(n.vol, now + n.time + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now + n.time);
            osc.stop(now + n.time + n.dur + 0.05);
        });
    } catch(err) {
        console.warn("AudioContext error:", err);
    }
}

// Side Banner Notification (Xbox/Steam style)
function showAchievementUnlockNotification(ach) {
    if (!isAppReady) return;
    const container = document.getElementById("achievement-toast-container");
    if (!container) return;

    while (container.children.length >= 2) {
        container.removeChild(container.firstChild);
    }

    const lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "tr";
    const title = ach.title[lang] || ach.title.tr || ach.title.en;
    const desc = ach.desc[lang] || ach.desc.tr || ach.desc.en;
    const tierName = getTierDisplayName(ach.tier, lang);

    const banner = document.createElement("div");
    banner.className = 'ach-toast-banner tier-' + ach.tier;
    banner.innerHTML = `
        <div class="ach-toast-icon tier-${ach.tier}">
            <i class="${ach.icon}"></i>
        </div>
        <div class="ach-toast-body">
            <div class="ach-toast-label">
                <i class="fa-solid fa-trophy text-gold"></i>
                <span>${lang === 'en' ? 'Achievement Unlocked!' : (lang === 'de' ? 'Erfolg freigeschaltet!' : 'Başarım Açıldı!')}</span>
                <span class="ach-toast-tier tier-${ach.tier}-badge">${tierName}</span>
            </div>
            <div class="ach-toast-title">${title}</div>
            <div class="ach-toast-desc">${desc}</div>
        </div>
        <button class="ach-toast-close" aria-label="Kapat">&times;</button>
    `;

    const closeBtn = banner.querySelector(".ach-toast-close");
    const dismiss = () => {
        banner.classList.add("fade-out");
        setTimeout(() => {
            if (banner.parentNode) banner.remove();
        }, 400);
    };

    if (closeBtn) closeBtn.addEventListener("click", dismiss);
    container.appendChild(banner);

    setTimeout(dismiss, 5500);
}

// Helper display names for tiers and categories
function getTierDisplayName(tier, lang) {
    const names = {
        bronze: { tr: "Bronz", en: "Bronze", de: "Bronze" },
        silver: { tr: "Gümüş", en: "Silver", de: "Silber" },
        gold: { tr: "Altın", en: "Gold", de: "Gold" },
        platinum: { tr: "Platin", en: "Platinum", de: "Platin" },
        legendary: { tr: "Efsanevi", en: "Legendary", de: "Legendär" }
    };
    return (names[tier] && names[tier][lang]) || tier;
}

function getCategoryDisplayName(cat, lang) {
    const cats = {
        general: { tr: "Temel & Sözlük", en: "General & Vocab", de: "Grundlagen & Wortschatz" },
        streak: { tr: "Seri & Sadakat", en: "Streak & Habit", de: "Serie & Treue" },
        quiz: { tr: "Quiz & Sınav", en: "Quiz & Knowledge", de: "Quiz & Prüfung" },
        category: { tr: "Uzmanlık Alanları", en: "Domain Mastery", de: "Fachbereiche" },
        custom: { tr: "Özel Kelimeler", en: "Custom Words", de: "Eigene Wörter" },
        audio: { tr: "Ses & Fonetik", en: "Audio & Pronunciation", de: "Audio & Phonetik" },
        cards: { tr: "Kart & Hafıza", en: "Cards & Memory", de: "Karten & Gedächtnis" },
        special: { tr: "Özel Görevler", en: "Special Feats", de: "Spezielle Aufgaben" }
    };
    return (cats[cat] && cats[cat][lang]) || cat;
}

// Metric evaluator for all 58 achievements
function getAchievementMetric(type) {
    switch(type) {
        case "learned_words":
            return (typeof learnedWordIds !== "undefined" && learnedWordIds) ? learnedWordIds.length : 0;
        case "level_a1":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.level === "A1" || w.level === "A2" || (!w.level && w.category && w.category.includes("Basic"))) && learnedWordIds.includes(w.id)).length;
        case "level_b1":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.level === "B1" || w.level === "B2" || (!w.level && w.category && w.category.includes("Intermediate"))) && learnedWordIds.includes(w.id)).length;
        case "level_c1":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.level === "C1" || w.level === "C2" || (!w.level && w.category && (w.category.includes("Advanced") || w.category.includes("İleri")))) && learnedWordIds.includes(w.id)).length;
        case "streak":
            return typeof streakCount !== "undefined" ? streakCount : 0;
        case "quest_days": {
            try {
                return JSON.parse(getAppStorage("completed_quest_days") || "[]").length;
            } catch(e) { return 0; }
        }
        case "quizzes_completed":
            return parseInt(getAppStorage("total_quizzes_completed") || "0");
        case "perfect_quiz":
            return (getAppStorage("perfect_quiz_unlocked") === "true" || parseInt(getAppStorage("perfect_quiz_count") || "0") >= 1) ? 1 : 0;
        case "perfect_quiz_count":
            return parseInt(getAppStorage("perfect_quiz_count") || "0");
        case "marathon_quiz":
            return getAppStorage("marathon_quiz_unlocked") === "true" ? 1 : 0;
        case "marathon_perfect_quiz":
            return getAppStorage("marathon_perfect_quiz") === "true" ? 1 : 0;
        case "speed_quiz":
            return getAppStorage("speed_quiz_unlocked") === "true" ? 1 : 0;
        case "german_quiz_master":
            return getAppStorage("german_quiz_master") === "true" ? 1 : 0;
        case "cat_aviation":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Aviation") || w.category.includes("Havacılık") || w.category.includes("Luftfahrt"))) && learnedWordIds.includes(w.id)).length;
        case "cat_tourism":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Tourism") || w.category.includes("Turizm") || w.category.includes("Tourismus") || w.category.includes("Travel"))) && learnedWordIds.includes(w.id)).length;
        case "cat_business":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Business") || w.category.includes("İş") || w.category.includes("Wirtschaft") || w.category.includes("Finance") || w.category.includes("Finans"))) && learnedWordIds.includes(w.id)).length;
        case "cat_tech":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Tech") || w.category.includes("Yazılım") || w.category.includes("IT") || w.category.includes("Informatik") || w.category.includes("Software"))) && learnedWordIds.includes(w.id)).length;
        case "cat_medical":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Med") || w.category.includes("Sağlık") || w.category.includes("Tıp") || w.category.includes("Gesundheit") || w.category.includes("Health"))) && learnedWordIds.includes(w.id)).length;
        case "cat_numbers":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Number") || w.category.includes("Sayı") || w.category.includes("Zahl"))) && learnedWordIds.includes(w.id)).length;
        case "cat_nature":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Nature") || w.category.includes("Doğa") || w.category.includes("Natur") || w.category.includes("Environment") || w.category.includes("Çevre"))) && learnedWordIds.includes(w.id)).length;
        case "cat_law":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Law") || w.category.includes("Hukuk") || w.category.includes("Recht") || w.category.includes("Legal"))) && learnedWordIds.includes(w.id)).length;
        case "cat_art":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Art") || w.category.includes("Sanat") || w.category.includes("Kunst") || w.category.includes("Culture") || w.category.includes("Kültür"))) && learnedWordIds.includes(w.id)).length;
        case "cat_culinary":
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            return wordsList.filter(w => (w.category && (w.category.includes("Food") || w.category.includes("Yemek") || w.category.includes("Mutfak") || w.category.includes("Küche") || w.category.includes("Culinary") || w.category.includes("Gastronomy"))) && learnedWordIds.includes(w.id)).length;
        case "multi_cat": {
            if (typeof wordsList === "undefined" || !wordsList) return 0;
            const learned = wordsList.filter(w => learnedWordIds.includes(w.id));
            const catMap = {};
            learned.forEach(w => {
                if (w.category) {
                    const primaryCat = w.category.split(/[,/]/)[0].trim();
                    catMap[primaryCat] = (catMap[primaryCat] || 0) + 1;
                }
            });
            return Object.values(catMap).filter(count => count >= 5).length;
        }
        case "custom_words":
            return (typeof customWords !== "undefined" && customWords) ? customWords.length : 0;
        case "audio_listened":
            return parseInt(getAppStorage("total_audio_listened") || "0");
        case "wod_days": {
            try {
                return JSON.parse(getAppStorage("wod_listened_days") || "[]").length;
            } catch(e) { return 0; }
        }
        case "sentence_audio":
            return parseInt(getAppStorage("total_sentence_audio") || "0");
        case "cards_studied":
            return parseInt(getAppStorage("total_cards_studied") || "0");
        case "cards_shuffled":
            return parseInt(getAppStorage("total_card_shuffles") || "0");
        case "night_owl":
            return getAppStorage("study_night_owl") === "true" ? 1 : 0;
        case "early_bird":
            return getAppStorage("study_early_bird") === "true" ? 1 : 0;
        case "weekend_warrior":
            return getAppStorage("study_weekend_warrior") === "true" ? 1 : 0;
        default:
            return 0;
    }
}

// Activity logger to catch Night Owl, Early Bird, Weekend Warrior
function logStudyActivity() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const today = getTodayDateString();

    // Night Owl: 00:00 - 04:59
    if (hour >= 0 && hour < 5) {
        setAppStorage("study_night_owl", "true");
    }

    // Early Bird: 05:00 - 07:30
    if ((hour === 5) || (hour === 6) || (hour === 7 && now.getMinutes() <= 30)) {
        setAppStorage("study_early_bird", "true");
    }

    // Weekend Warrior: Both Saturday & Sunday
    if (day === 6) {
        setAppStorage("study_weekend_sat", today);
    } else if (day === 0) {
        const satDate = getAppStorage("study_weekend_sat");
        if (satDate) {
            const diffDays = Math.floor((new Date(today) - new Date(satDate)) / 86400000);
            if (diffDays === 1) {
                setAppStorage("study_weekend_warrior", "true");
            }
        }
    }
}

function trackSentenceAudioListen() {
    const cur = parseInt(getAppStorage("total_sentence_audio") || "0") + 1;
    setAppStorage("total_sentence_audio", cur.toString());
    logStudyActivity();
    if (typeof checkAchievements === "function") {
        checkAchievements();
    }
}

// Complete 58-badge achievements engine test
const ACHIEVEMENTS_RAW = [
    // 1-10: General & Vocabulary Milestones
    {
        id: "badge-first-step",
        tier: "bronze",
        category: "general",
        icon: "fa-solid fa-shoe-prints",
        title: { tr: "İlk Adım", en: "First Step", de: "Erster Schritt" },
        desc: {
            tr: "Kelime öğrenme yolculuğuna ilk adımını attın.",
            en: "Took your very first step in vocabulary.",
            de: "Den allerersten Schritt auf der Vokabelreise gemacht."
        },
        howToUnlock: {
            tr: "Herhangi 1 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark any 1 word as learned.",
            de: "1 beliebiges Wort als gelernt markieren."
        },
        target: 1,
        type: "learned_words"
    },
    {
        id: "badge-hunter-25",
        tier: "bronze",
        category: "general",
        icon: "fa-solid fa-bullseye",
        title: { tr: "Kelime Avcısı", en: "Word Hunter", de: "Wortjäger" },
        desc: {
            tr: "Kelime dağarcığını genişletme konusunda ilk ciddi viraj.",
            en: "Reached your first major milestone.",
            de: "Den ersten großen Meilenstein erreicht."
        },
        howToUnlock: {
            tr: "25 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark 25 words as learned.",
            de: "25 Wörter als gelernt markieren."
        },
        target: 25,
        type: "learned_words"
    },
    {
        id: "badge-vocab-50",
        tier: "silver",
        category: "general",
        icon: "fa-solid fa-book-open-reader",
        title: { tr: "Çırak Kelimebaz", en: "Word Apprentice", de: "Vokabel-Lehrling" },
        desc: {
            tr: "50 kelimeyi hafızana kazıyarak temelini sağlamlaştırdın.",
            en: "Solidified your foundation with 50 words.",
            de: "50 Wörter gelernt und das Fundament gefestigt."
        },
        howToUnlock: {
            tr: "50 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark 50 words as learned.",
            de: "50 Wörter als gelernt markieren."
        },
        target: 50,
        type: "learned_words"
    },
    {
        id: "badge-vocab-100",
        tier: "silver",
        category: "general",
        icon: "fa-solid fa-award",
        title: { tr: "Yüzlük Kulüp", en: "Centurion Scholar", de: "Hunderter-Club" },
        desc: {
            tr: "100 kelime barajını aşarak büyük bir adım attın!",
            en: "Crossed the 100-word milestone!",
            de: "Die 100-Wörter-Marke geknackt!"
        },
        howToUnlock: {
            tr: "100 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark 100 words as learned.",
            de: "100 Wörter als gelernt markieren."
        },
        target: 100,
        type: "learned_words"
    },
    {
        id: "badge-vocab-250",
        tier: "gold",
        category: "general",
        icon: "fa-solid fa-gem",
        title: { tr: "Sözlük Fatihi", en: "Lexicon Conqueror", de: "Lexikon-Eroberer" },
        desc: {
            tr: "250 kelimelik zengin bir hazineye sahipsin.",
            en: "Command a rich vocabulary of 250 words.",
            de: "Beherrsche einen reichen Schatz von 250 Wörtern."
        },
        howToUnlock: {
            tr: "250 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark 250 words as learned.",
            de: "250 Wörter als gelernt markieren."
        },
        target: 250,
        type: "learned_words"
    },
    {
        id: "badge-vocab-500",
        tier: "platinum",
        category: "general",
        icon: "fa-solid fa-crown",
        title: { tr: "Dil Bilgesi", en: "Polyglot Sage", de: "Sprachweiser" },
        desc: {
            tr: "500 kelime! Artık dilde akıcı diyaloglar kurabilirsin.",
            en: "500 words! You can converse with true confidence.",
            de: "500 Wörter! Du kannst selbstbewusst sprechen."
        },
        howToUnlock: {
            tr: "500 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark 500 words as learned.",
            de: "500 Wörter als gelernt markieren."
        },
        target: 500,
        type: "learned_words"
    },
    {
        id: "badge-vocab-1000",
        tier: "legendary",
        category: "general",
        icon: "fa-solid fa-dragon",
        title: { tr: "Sözlük Anıtı", en: "Living Lexicon", de: "Lebendes Lexikon" },
        desc: {
            tr: "1000 kelimelik devasa bir bilgi havuzu. Tam bir efsanesin!",
            en: "1000 words mastered. A monumental linguistic achievement!",
            de: "1000 Wörter gemeistert. Ein legendärer Erfolg!"
        },
        howToUnlock: {
            tr: "1000 kelimeyi 'Öğrendim' olarak işaretle.",
            en: "Mark 1000 words as learned.",
            de: "1000 Wörter als gelernt markieren."
        },
        target: 1000,
        type: "learned_words"
    },
    {
        id: "badge-level-a1",
        tier: "bronze",
        category: "general",
        icon: "fa-solid fa-seedling",
        title: { tr: "A1 Temelleri", en: "A1 Foundation", de: "A1 Fundament" },
        desc: {
            tr: "Başlangıç seviyesindeki en temel kalıplara hakim oldun.",
            en: "Mastered fundamental beginner vocabulary.",
            de: "Grundlegenden A1-Wortschatz gemeistert."
        },
        howToUnlock: {
            tr: "A1/A2 seviyesinde en az 30 kelime öğren.",
            en: "Learn at least 30 A1/A2 level words.",
            de: "Mindestens 30 Wörter der Stufe A1/A2 lernen."
        },
        target: 30,
        type: "level_a1"
    },
    {
        id: "badge-level-b1",
        tier: "silver",
        category: "general",
        icon: "fa-solid fa-mountain",
        title: { tr: "B1 Zirvesi", en: "B1 Ascender", de: "B1 Gipfelstürmer" },
        desc: {
            tr: "Orta seviye kelimeleri fethederek kendini aşmaya başladın.",
            en: "Climbed into intermediate language mastery.",
            de: "In die Mittelstufe aufgestiegen."
        },
        howToUnlock: {
            tr: "B1/B2 seviyesinde en az 30 kelime öğren.",
            en: "Learn at least 30 B1/B2 level words.",
            de: "Mindestens 30 Wörter der Stufe B1/B2 lernen."
        },
        target: 30,
        type: "level_b1"
    },
    {
        id: "badge-level-c1",
        tier: "gold",
        category: "general",
        icon: "fa-solid fa-chess-queen",
        title: { tr: "C1 Eliti", en: "C1 Mastermind", de: "C1 Meistergeist" },
        desc: {
            tr: "İleri düzey akademik ve profesyonel kelimeleri çözdün.",
            en: "Cracked advanced academic and professional vocabulary.",
            de: "Fortgeschrittenen Wortschatz geknackt."
        },
        howToUnlock: {
            tr: "C1/C2 veya Advanced seviyesinde 20 kelime öğren.",
            en: "Learn 20 advanced (C1/C2) words.",
            de: "20 fortgeschrittene Wörter (C1/C2) lernen."
        },
        target: 20,
        type: "level_c1"
    },

    // 11-18: Streaks & Habit Badges
    {
        id: "badge-streak-3",
        tier: "bronze",
        category: "streak",
        icon: "fa-solid fa-fire",
        title: { tr: "İstikrarlı", en: "Consistent", de: "Beständig" },
        desc: {
            tr: "3 gün boyunca hiç aksatmadan çalışarak alışkanlık kazandın.",
            en: "Studied 3 consecutive days without missing.",
            de: "3 aufeinanderfolgende Tage ohne Pause gelernt."
        },
        howToUnlock: {
            tr: "Çalışma serisini 3 güne çıkar.",
            en: "Reach a 3-day study streak.",
            de: "Erreiche eine 3-Tage-Lernserie."
        },
        target: 3,
        type: "streak"
    },
    {
        id: "badge-streak-7",
        tier: "silver",
        category: "streak",
        icon: "fa-solid fa-fire-flame-curved",
        title: { tr: "Haftalık Maraton", en: "Weekly Dynamo", de: "Wöchentlicher Dynamo" },
        desc: {
            tr: "Tam bir hafta boyunca her gün öğrenmeye devam ettin!",
            en: "A whole week of relentless daily learning!",
            de: "Eine ganze Woche ununterbrochen gelernt!"
        },
        howToUnlock: {
            tr: "Çalışma serisini 7 güne çıkar.",
            en: "Reach a 7-day study streak.",
            de: "Erreiche eine 7-Tage-Lernserie."
        },
        target: 7,
        type: "streak"
    },
    {
        id: "badge-streak-14",
        tier: "gold",
        category: "streak",
        icon: "fa-solid fa-bolt-lightning",
        title: { tr: "İki Haftalık Azim", en: "Fortnight Fortitude", de: "Zweiwöchige Ausdauer" },
        desc: {
            tr: "14 gün kesintisiz odaklanma. Artık bu senin bir parçan.",
            en: "14 consecutive days of sheer dedication.",
            de: "14 aufeinanderfolgende Tage purer Hingabe."
        },
        howToUnlock: {
            tr: "Çalışma serisini 14 güne çıkar.",
            en: "Reach a 14-day study streak.",
            de: "Erreiche eine 14-Tage-Lernserie."
        },
        target: 14,
        type: "streak"
    },
    {
        id: "badge-streak-30",
        tier: "platinum",
        category: "streak",
        icon: "fa-solid fa-calendar-check",
        title: { tr: "Aylık Şampiyon", en: "Monthly Titan", de: "Monatlicher Titan" },
        desc: {
            tr: "30 günlük efsanevi seri! Disiplinin zirvesindesin.",
            en: "30 straight days of unstoppable learning habit!",
            de: "30 Tage unaufhaltsame Lerndisziplin!"
        },
        howToUnlock: {
            tr: "Çalışma serisini 30 güne çıkar.",
            en: "Reach a 30-day study streak.",
            de: "Erreiche eine 30-Tage-Lernserie."
        },
        target: 30,
        type: "streak"
    },
    {
        id: "badge-streak-60",
        tier: "legendary",
        category: "streak",
        icon: "fa-solid fa-shield-halved",
        title: { tr: "Demir İrade", en: "Iron Will", de: "Eiserner Wille" },
        desc: {
            tr: "60 gün boyunca hiçbir şey seni yolundan alıkoyamadı.",
            en: "60 unbroken days. Nothing can derail your focus.",
            de: "60 Tage ungebrochene Serie. Nichts hält dich auf."
        },
        howToUnlock: {
            tr: "Çalışma serisini 60 güne çıkar.",
            en: "Reach a 60-day study streak.",
            de: "Erreiche eine 60-Tage-Lernserie."
        },
        target: 60,
        type: "streak"
    },
    {
        id: "badge-streak-100",
        tier: "legendary",
        category: "streak",
        icon: "fa-solid fa-infinity",
        title: { tr: "Yüzyıllık Sadakat", en: "Centurion Legend", de: "Hundert-Tage-Legende" },
        desc: {
            tr: "100 günlük efsane! Bu rozeti sadece en kararlılar hak eder.",
            en: "100 straight days. Only true masters achieve this!",
            de: "100 Tage in Folge. Nur wahre Meister schaffen das!"
        },
        howToUnlock: {
            tr: "Çalışma serisini 100 güne çıkar.",
            en: "Reach a 100-day study streak.",
            de: "Erreiche eine 100-Tage-Lernserie."
        },
        target: 100,
        type: "streak"
    },
    {
        id: "badge-quests-all-3",
        tier: "silver",
        category: "streak",
        icon: "fa-solid fa-list-check",
        title: { tr: "Görev Avcısı", en: "Quest Champion", de: "Quest-Champion" },
        desc: {
            tr: "Günün tüm 5 görevini 3 farklı günde eksiksiz bitirdin.",
            en: "Completed all 5 daily quests on 3 different days.",
            de: "Alle 5 Tagesquests an 3 verschiedenen Tagen erledigt."
        },
        howToUnlock: {
            tr: "Tüm 5 günlük görevi 3 farklı günde tamamla.",
            en: "Complete all 5 daily quests on 3 distinct days.",
            de: "Schließe alle 5 Quests an 3 verschiedenen Tagen ab."
        },
        target: 3,
        type: "quest_days"
    },
    {
        id: "badge-quests-all-7",
        tier: "gold",
        category: "streak",
        icon: "fa-solid fa-star-half-stroke",
        title: { tr: "Haftalık Kusursuzluk", en: "Flawless Week", de: "Makellose Woche" },
        desc: {
            tr: "7 farklı günde 5'te 5 günlük görev başarısı gösterdin.",
            en: "Completed every single daily quest on 7 different days.",
            de: "An 7 verschiedenen Tagen jede Tagesquest gelöst."
        },
        howToUnlock: {
            tr: "Tüm 5 günlük görevi 7 farklı günde tamamla.",
            en: "Complete all 5 daily quests on 7 distinct days.",
            de: "Schließe alle 5 Quests an 7 verschiedenen Tagen ab."
        },
        target: 7,
        type: "quest_days"
    },

    // 19-29: Quiz Badges
    {
        id: "badge-quiz-novice",
        tier: "bronze",
        category: "quiz",
        icon: "fa-solid fa-feather-pointed",
        title: { tr: "Test Ateşi", en: "Quiz Spark", de: "Quiz-Funke" },
        desc: {
            tr: "İlk kelime testini başarıyla tamamlayarak yarışa katıldın.",
            en: "Completed your very first vocabulary quiz.",
            de: "Dein allererstes Vokabelquiz abgeschlossen."
        },
        howToUnlock: {
            tr: "Herhangi bir quizi tamamla.",
            en: "Complete any quiz.",
            de: "Ein beliebiges Quiz abschließen."
        },
        target: 1,
        type: "quizzes_completed"
    },
    {
        id: "badge-quiz-5",
        tier: "bronze",
        category: "quiz",
        icon: "fa-solid fa-graduation-cap",
        title: { tr: "Sınav Kurdu", en: "Quiz Veteran", de: "Quiz-Veteran" },
        desc: {
            tr: "5 farklı test çözerek bilgilerini sınadın.",
            en: "Tested yourself by finishing 5 quizzes.",
            de: "Dich durch das Bestehen von 5 Quizzes getestet."
        },
        howToUnlock: {
            tr: "Toplam 5 quizi başarıyla tamamla.",
            en: "Complete 5 quizzes.",
            de: "5 Quizzes erfolgreich abschließen."
        },
        target: 5,
        type: "quizzes_completed"
    },
    {
        id: "badge-quiz-20",
        tier: "silver",
        category: "quiz",
        icon: "fa-solid fa-brain",
        title: { tr: "Quiz Canavarı", en: "Quiz Beast", de: "Quiz-Bestie" },
        desc: {
            tr: "20 test tamamladın. Soru çözmek artık refleksin oldu.",
            en: "Finished 20 quizzes with sharp reflexes.",
            de: "20 Quizzes mit scharfen Reflexen abgeschlossen."
        },
        howToUnlock: {
            tr: "Toplam 20 quiz tamamla.",
            en: "Complete 20 quizzes.",
            de: "20 Quizzes abschließen."
        },
        target: 20,
        type: "quizzes_completed"
    },
    {
        id: "badge-quiz-50",
        tier: "gold",
        category: "quiz",
        icon: "fa-solid fa-trophy",
        title: { tr: "Test İmparatoru", en: "Quiz Emperor", de: "Quiz-Imperator" },
        desc: {
            tr: "50 quiz tamamlayarak binlerce soruya meydan okudun.",
            en: "50 quizzes conquered! Thousands of questions mastered.",
            de: "50 Quizzes erobert! Tausende Fragen gemeistert."
        },
        howToUnlock: {
            tr: "Toplam 50 quiz tamamla.",
            en: "Complete 50 quizzes.",
            de: "50 Quizzes abschließen."
        },
        target: 50,
        type: "quizzes_completed"
    },
    {
        id: "badge-quiz-perfect",
        tier: "gold",
        category: "quiz",
        icon: "fa-solid fa-wand-magic-sparkles",
        title: { tr: "Dahi", en: "Genius", de: "Genie" },
        desc: {
            tr: "Bir quizdeki tüm soruları sıfır hata ile bildin!",
            en: "Scored 100% on a quiz with zero errors!",
            de: "100% in einem Quiz ohne Fehler erzielt!"
        },
        howToUnlock: {
            tr: "Bir quizden %100 tam puan al.",
            en: "Score 100% on any quiz.",
            de: "100% in einem beliebigen Quiz erreichen."
        },
        target: 1,
        type: "perfect_quiz"
    },
    {
        id: "badge-quiz-perfect-3",
        tier: "silver",
        category: "quiz",
        icon: "fa-solid fa-clover",
        title: { tr: "Üçlü Kusursuzluk", en: "Triple Perfection", de: "Dreifache Perfektion" },
        desc: {
            tr: "3 farklı quizde %100 tam puan aldın.",
            en: "Achieved 100% perfection across 3 quizzes.",
            de: "In 3 Quizzes volle 100% erzielt."
        },
        howToUnlock: {
            tr: "3 farklı quizde %100 tam puan elde et.",
            en: "Score 100% on 3 separate quizzes.",
            de: "Erziele in 3 verschiedenen Tests 100%."
        },
        target: 3,
        type: "perfect_quiz_count"
    },
    {
        id: "badge-quiz-perfect-10",
        tier: "gold",
        category: "quiz",
        icon: "fa-solid fa-crown",
        title: { tr: "Yenilmez Zihin", en: "Invincible Mind", de: "Unbesiegbare Vernunft" },
        desc: {
            tr: "Tam 10 kez %100 tam puan alarak ustalığını kanıtladın.",
            en: "Scored 100% in 10 different quizzes. Untouchable!",
            de: "10-mal 100% erzielt. Unantastbar!"
        },
        howToUnlock: {
            tr: "10 farklı quizde %100 tam puan elde et.",
            en: "Score 100% on 10 separate quizzes.",
            de: "In 10 verschiedenen Tests 100% erreichen."
        },
        target: 10,
        type: "perfect_quiz_count"
    },
    {
        id: "badge-marathon",
        tier: "silver",
        category: "quiz",
        icon: "fa-solid fa-person-running",
        title: { tr: "Demir Maratoncu", en: "Iron Marathoner", de: "Eisen-Marathonläufer" },
        desc: {
            tr: "30 soruluk uzun soluklu bir quizi tek nefeste tamamladın.",
            en: "Completed a grueling 30-question marathon quiz.",
            de: "Ein langes 30-Fragen-Marathon-Quiz abgeschlossen."
        },
        howToUnlock: {
            tr: "30 soruluk bir quizi tamamla.",
            en: "Finish a 30-question quiz.",
            de: "Ein Quiz mit 30 Fragen beenden."
        },
        target: 1,
        type: "marathon_quiz"
    },
    {
        id: "badge-quiz-marathon-perfect",
        tier: "platinum",
        category: "quiz",
        icon: "fa-solid fa-medal",
        title: { tr: "Kusursuz Maraton", en: "Flawless Marathon", de: "Makelloser Marathon" },
        desc: {
            tr: "30 soruluk dev quizde 30'da 30 yaptın! Muazzam bir başarı!",
            en: "Answered 30 out of 30 correctly in a marathon quiz!",
            de: "30 von 30 in einem Marathon-Quiz richtig beantwortet!"
        },
        howToUnlock: {
            tr: "30 soruluk bir quizden %100 tam puan al.",
            en: "Score 100% on a 30-question quiz.",
            de: "Erziele 100% in einem 30-Fragen-Quiz."
        },
        target: 1,
        type: "marathon_perfect_quiz"
    },
    {
        id: "badge-quiz-speed",
        tier: "platinum",
        category: "quiz",
        icon: "fa-solid fa-bolt",
        title: { tr: "Şimşek Refleks", en: "Lightning Reflex", de: "Blitzschneller Reflex" },
        desc: {
            tr: "Bir testi soru başına 4 saniyenin altında yüksek puanla bitirdin.",
            en: "Blazed through a quiz under 4s per question with high score.",
            de: "Ein Quiz in unter 4 Sekunden pro Frage gemeistert."
        },
        howToUnlock: {
            tr: "En az 10 soruluk bir quizi soru başına ortalama 4 saniyenin altında ve %80+ başarıyla bitir.",
            en: "Finish a 10+ question quiz averaging under 4s/question with 80%+ score.",
            de: "Ein 10+ Fragen Quiz mit durchschnittlich unter 4s pro Frage und 80%+ abschließen."
        },
        target: 1,
        type: "speed_quiz"
    },
    {
        id: "badge-quiz-german",
        tier: "gold",
        category: "quiz",
        icon: "fa-solid fa-flag",
        title: { tr: "Almanca Üstadı", en: "German Master", de: "Deutsch-Meister" },
        desc: {
            tr: "Almanca modundaki bir quizde tam isabet sağlayarak 100 aldın.",
            en: "Aced a German quiz with 100% accuracy.",
            de: "Ein Deutsch-Quiz mit 100% Genauigkeit gemeistert."
        },
        howToUnlock: {
            tr: "Almanca modunda bir quizden %100 tam puan al.",
            en: "Score 100% on a German quiz.",
            de: "Erziele 100% in einem Deutsch-Quiz."
        },
        target: 1,
        type: "german_quiz_master"
    },

    // 30-40: Domain / Category Mastery
    {
        id: "badge-aviation",
        tier: "silver",
        category: "category",
        icon: "fa-solid fa-plane-departure",
        title: { tr: "Kaptan Pilot", en: "Captain", de: "Kapitän" },
        desc: {
            tr: "Havacılık ve uçuş terminolojisini göklere taşıdın.",
            en: "Soared high with aviation vocabulary.",
            de: "Mit Luftfahrt-Vokabular in die Lüfte gestiegen."
        },
        howToUnlock: {
            tr: "Havacılık alanında en az 5 kelime öğren.",
            en: "Learn at least 5 aviation words.",
            de: "Mindestens 5 Luftfahrt-Wörter lernen."
        },
        target: 5,
        type: "cat_aviation"
    },
    {
        id: "badge-tourism",
        tier: "silver",
        category: "category",
        icon: "fa-solid fa-compass",
        title: { tr: "Gezgin Kaşif", en: "Global Explorer", de: "Weltenbummler" },
        desc: {
            tr: "Turizm ve seyahat kelimeleriyle dünyayı gezmeye hazırsın.",
            en: "Ready to explore the world with tourism vocabulary.",
            de: "Bereit, die Welt mit Reisevokabeln zu erkunden."
        },
        howToUnlock: {
            tr: "Turizm / Seyahat alanında en az 5 kelime öğren.",
            en: "Learn at least 5 tourism words.",
            de: "Mindestens 5 Tourismus-Wörter lernen."
        },
        target: 5,
        type: "cat_tourism"
    },
    {
        id: "badge-cat-business",
        tier: "silver",
        category: "category",
        icon: "fa-solid fa-briefcase",
        title: { tr: "İş Dünyası Lideri", en: "Business Tycoon", de: "Wirtschafts-Pionier" },
        desc: {
            tr: "İş dünyası, finans ve toplantı terimlerini kavradın.",
            en: "Mastered corporate, finance, and trade terms.",
            de: "Wirtschafts- und Geschäftsbegriffe gemeistert."
        },
        howToUnlock: {
            tr: "İş & Finans alanında en az 10 kelime öğren.",
            en: "Learn at least 10 business words.",
            de: "Mindestens 10 Wirtschaftswörter lernen."
        },
        target: 10,
        type: "cat_business"
    },
    {
        id: "badge-cat-tech",
        tier: "silver",
        category: "category",
        icon: "fa-solid fa-microchip",
        title: { tr: "Teknoloji Gurusu", en: "Tech Guru", de: "Tech-Guru" },
        desc: {
            tr: "Yazılım, yapay zeka ve dijital dünya dilini söktün.",
            en: "Decoded software, AI, and digital tech terms.",
            de: "Software- und Technologiewörter entschlüsselt."
        },
        howToUnlock: {
            tr: "Teknoloji & Yazılım alanında en az 10 kelime öğren.",
            en: "Learn at least 10 technology words.",
            de: "Mindestens 10 Technikwörter lernen."
        },
        target: 10,
        type: "cat_tech"
    },
    {
        id: "badge-cat-medical",
        tier: "silver",
        category: "category",
        icon: "fa-solid fa-stethoscope",
        title: { tr: "Şifacı", en: "Healer Scholar", de: "Heiler" },
        desc: {
            tr: "Tıp, anatomi ve sağlık terimlerini dağarcığına kattın.",
            en: "Absorbed medical and healthcare vocabulary.",
            de: "Medizinischen Wortschatz angeeignet."
        },
        howToUnlock: {
            tr: "Sağlık & Tıp alanında en az 10 kelime öğren.",
            en: "Learn at least 10 medical words.",
            de: "Mindestens 10 Medizinwörter lernen."
        },
        target: 10,
        type: "cat_medical"
    },
    {
        id: "badge-cat-numbers",
        tier: "bronze",
        category: "category",
        icon: "fa-solid fa-arrow-down-1-9",
        title: { tr: "Sayılar Ustası", en: "Number Master", de: "Zahlen-Meister" },
        desc: {
            tr: "Sayma sayılarını ve rakamları eksiksiz öğrendin.",
            en: "Mastered numbers and counting words.",
            de: "Zahlen und Zählwörter fehlerfrei gelernt."
        },
        howToUnlock: {
            tr: "Sayılar kategorisinde en az 15 kelime öğren.",
            en: "Learn at least 15 number words.",
            de: "Mindestens 15 Zahlenwörter lernen."
        },
        target: 15,
        type: "cat_numbers"
    },
    {
        id: "badge-cat-nature",
        tier: "bronze",
        category: "category",
        icon: "fa-solid fa-leaf",
        title: { tr: "Doğa Muhafızı", en: "Nature Warden", de: "Naturwächter" },
        desc: {
            tr: "Çevre, canlılar ve doğal dünyanın sözcüklerini öğrendin.",
            en: "Learned the vocabulary of nature and ecology.",
            de: "Natur- und Umweltbegriffe gelernt."
        },
        howToUnlock: {
            tr: "Doğa & Çevre alanında en az 10 kelime öğren.",
            en: "Learn at least 10 nature words.",
            de: "Mindestens 10 Naturwörter lernen."
        },
        target: 10,
        type: "cat_nature"
    },
    {
        id: "badge-cat-law",
        tier: "gold",
        category: "category",
        icon: "fa-solid fa-scale-balanced",
        title: { tr: "Adalet Terazisi", en: "Lawgiver", de: "Hüter des Rechts" },
        desc: {
            tr: "Hukuk, haklar ve adalet sisteminin zorlu terimlerini çözdün.",
            en: "Mastered rigorous legal and judicial terms.",
            de: "Schwierige juristische Fachbegriffe gemeistert."
        },
        howToUnlock: {
            tr: "Hukuk & Adalet alanında en az 8 kelime öğren.",
            en: "Learn at least 8 legal words.",
            de: "Mindestens 8 Rechtsbegriffe lernen."
        },
        target: 8,
        type: "cat_law"
    },
    {
        id: "badge-cat-art",
        tier: "bronze",
        category: "category",
        icon: "fa-solid fa-palette",
        title: { tr: "Sanat Eleştirmeni", en: "Art Connoisseur", de: "Kunstkenner" },
        desc: {
            tr: "Sanat, müzik ve edebiyat dünyasının renkli kelimelerine hakim oldun.",
            en: "Mastered cultural, musical, and artistic terms.",
            de: "Kunst- und Kulturbegriffe angeeignet."
        },
        howToUnlock: {
            tr: "Sanat & Kültür alanında en az 10 kelime öğren.",
            en: "Learn at least 10 art words.",
            de: "Mindestens 10 Kunstwörter lernen."
        },
        target: 10,
        type: "cat_art"
    },
    {
        id: "badge-cat-culinary",
        tier: "bronze",
        category: "category",
        icon: "fa-solid fa-utensils",
        title: { tr: "Gurme Şef", en: "Gourmet Chef", de: "Gourmet-Koch" },
        desc: {
            tr: "Mutfak, lezzetler ve yemek kültürünün dilini öğrendin.",
            en: "Speaks the delicious language of culinary arts.",
            de: "Die Sprache der Küche und Kulinarik gelernt."
        },
        howToUnlock: {
            tr: "Yemek & Mutfak alanında en az 10 kelime öğren.",
            en: "Learn at least 10 culinary words.",
            de: "Mindestens 10 Gastronomiewörter lernen."
        },
        target: 10,
        type: "cat_culinary"
    },
    {
        id: "badge-cat-multi-5",
        tier: "platinum",
        category: "category",
        icon: "fa-solid fa-cubes",
        title: { tr: "Rönesans İnsanı", en: "Renaissance Polymath", de: "Universalgelehrter" },
        desc: {
            tr: "5 farklı uzmanlık alanının her birinde en az 5 kelime öğrendin!",
            en: "Mastered at least 5 words across 5 distinct domains!",
            de: "In 5 verschiedenen Bereichen je 5 Wörter gelernt!"
        },
        howToUnlock: {
            tr: "5 farklı kategorinin her birinden en az 5'er kelime öğren.",
            en: "Learn 5+ words across 5 distinct categories.",
            de: "In 5 Kategorien jeweils mindestens 5 Wörter lernen."
        },
        target: 5,
        type: "multi_cat"
    },

    // 41-45: Custom Words & Personalization
    {
        id: "badge-custom-1",
        tier: "bronze",
        category: "custom",
        icon: "fa-solid fa-pen",
        title: { tr: "İlk Mürekkep", en: "First Ink", de: "Erste Tinte" },
        desc: {
            tr: "Kendi sözlüğüne ilk özel kelimeni ekledin.",
            en: "Added your first custom word to the vocabulary.",
            de: "Dein erstes eigenes Wort hinzugefügt."
        },
        howToUnlock: {
            tr: "Kendi seçtiğin 1 kelimeyi listene ekle.",
            en: "Add 1 custom word.",
            de: "Füge 1 eigenes Wort hinzu."
        },
        target: 1,
        type: "custom_words"
    },
    {
        id: "badge-custom-author",
        tier: "bronze",
        category: "custom",
        icon: "fa-solid fa-pen-nib",
        title: { tr: "Kelime Yazarı", en: "Author", de: "Wortautor" },
        desc: {
            tr: "Kişisel listene 3 yeni kelime ekleyerek kendi sözlüğünü oluşturdun.",
            en: "Crafted your personal vocabulary with 3 words.",
            de: "3 eigene Wörter zu deiner Liste hinzugefügt."
        },
        howToUnlock: {
            tr: "Kendi listene en az 3 kelime ekle.",
            en: "Add at least 3 custom words.",
            de: "Mindestens 3 eigene Wörter hinzufügen."
        },
        target: 3,
        type: "custom_words"
    },
    {
        id: "badge-custom-10",
        tier: "silver",
        category: "custom",
        icon: "fa-solid fa-book-bookmark",
        title: { tr: "Özel Kütüphane", en: "Curated Library", de: "Eigene Bibliothek" },
        desc: {
            tr: "10 özel kelime ekleyerek kişiselleştirilmiş bir arşiv kurdun.",
            en: "Curated an archive of 10 personal words.",
            de: "Ein Archiv aus 10 eigenen Wörtern kuratiert."
        },
        howToUnlock: {
            tr: "Kendi listene en az 10 kelime ekle.",
            en: "Add at least 10 custom words.",
            de: "Mindestens 10 eigene Wörter hinzufügen."
        },
        target: 10,
        type: "custom_words"
    },
    {
        id: "badge-custom-25",
        tier: "gold",
        category: "custom",
        icon: "fa-solid fa-feather",
        title: { tr: "Sözlük Derleyicisi", en: "Lexicographer", de: "Lexikograf" },
        desc: {
            tr: "25 özel kelime! Kendi öğrenme materyalini kendin üretiyorsun.",
            en: "25 custom words created! True self-directed learner.",
            de: "25 eigene Wörter erstellt! Selbstbestimmtes Lernen."
        },
        howToUnlock: {
            tr: "Kendi listene en az 25 kelime ekle.",
            en: "Add at least 25 custom words.",
            de: "Mindestens 25 eigene Wörter hinzufügen."
        },
        target: 25,
        type: "custom_words"
    },
    {
        id: "badge-custom-50",
        tier: "platinum",
        category: "custom",
        icon: "fa-solid fa-scroll",
        title: { tr: "Büyük Ansiklopedist", en: "Grand Encyclopedist", de: "Großenzyklopädist" },
        desc: {
            tr: "Tam 50 özel kelime! Adına bir sözlük basılsa yeridir.",
            en: "50 custom words authored. A monumental collection!",
            de: "50 eigene Wörter verfasst. Eine monumentale Sammlung!"
        },
        howToUnlock: {
            tr: "Kendi listene en az 50 kelime ekle.",
            en: "Add at least 50 custom words.",
            de: "Mindestens 50 eigene Wörter hinzufügen."
        },
        target: 50,
        type: "custom_words"
    },

    // 46-51: Audio & Pronunciation
    {
        id: "badge-audio-first",
        tier: "bronze",
        category: "audio",
        icon: "fa-solid fa-volume-low",
        title: { tr: "İlk Tını", en: "First Sound", de: "Erster Klang" },
        desc: {
            tr: "İlk kez ses motoruyla bir kelime telaffuzu dinledin.",
            en: "Listened to your first word pronunciation.",
            de: "Deine erste Vokabelaussprache angehört."
        },
        howToUnlock: {
            tr: "Herhangi bir kelimenin ses telaffuzunu dinle.",
            en: "Listen to any word's pronunciation.",
            de: "Die Aussprache eines beliebigen Wortes anhören."
        },
        target: 1,
        type: "audio_listened"
    },
    {
        id: "badge-audio-25",
        tier: "bronze",
        category: "audio",
        icon: "fa-solid fa-headphones",
        title: { tr: "Keskin Kulak", en: "Sharp Ear", de: "Scharfes Ohr" },
        desc: {
            tr: "25 kelimenin telaffuzunu dinleyerek kulağını eğittin.",
            en: "Trained your ear with 25 pronunciations.",
            de: "Dein Gehör mit 25 Aussprachen geschult."
        },
        howToUnlock: {
            tr: "Toplam 25 kelime seslendirmesi dinle.",
            en: "Listen to 25 word pronunciations.",
            de: "25 Vokabelaussprachen anhören."
        },
        target: 25,
        type: "audio_listened"
    },
    {
        id: "badge-audio-100",
        tier: "silver",
        category: "audio",
        icon: "fa-solid fa-music",
        title: { tr: "Fonetik Ustası", en: "Phonetic Virtuoso", de: "Phonetik-Meister" },
        desc: {
            tr: "100 kelimenin doğru vurgusunu ve tonlamasını dinledin.",
            en: "Absorbed natural cadence and accent across 100 words.",
            de: "Natürliche Betonung von 100 Wörtern verinnerlicht."
        },
        howToUnlock: {
            tr: "Toplam 100 kelime seslendirmesi dinle.",
            en: "Listen to 100 word pronunciations.",
            de: "100 Vokabelaussprachen anhören."
        },
        target: 100,
        type: "audio_listened"
    },
    {
        id: "badge-audio-300",
        tier: "gold",
        category: "audio",
        icon: "fa-solid fa-compact-disc",
        title: { tr: "Akustik Okyanus", en: "Acoustic Ocean", de: "Akustischer Ozean" },
        desc: {
            tr: "300 kelime dinleyerek telaffuzda ana dil seviyesine yaklaştın.",
            en: "Listened to 300 words. Pronunciation is second nature!",
            de: "300 Wörter angehört. Aussprache fast muttersprachlich!"
        },
        howToUnlock: {
            tr: "Toplam 300 kelime seslendirmesi dinle.",
            en: "Listen to 300 word pronunciations.",
            de: "300 Vokabelaussprachen anhören."
        },
        target: 300,
        type: "audio_listened"
    },
    {
        id: "badge-audio-wod-5",
        tier: "silver",
        category: "audio",
        icon: "fa-solid fa-calendar-day",
        title: { tr: "Günün Sadık Dinleyicisi", en: "Daily Listener", de: "Täglicher Hörer" },
        desc: {
            tr: "Günün Kelimesini 5 farklı günde sesli olarak dinledin.",
            en: "Listened to the Word of the Day across 5 distinct days.",
            de: "Das Wort des Tages an 5 verschiedenen Tagen angehört."
        },
        howToUnlock: {
            tr: "Günün Kelimesini 5 farklı günde dinle.",
            en: "Listen to the Word of the Day on 5 different days.",
            de: "Wort des Tages an 5 verschiedenen Tagen anhören."
        },
        target: 5,
        type: "wod_days"
    },
    {
        id: "badge-audio-sentence-20",
        tier: "silver",
        category: "audio",
        icon: "fa-solid fa-comment-dots",
        title: { tr: "Cümle Ezgisi", en: "Sentence Cadence", de: "Satzmelodie" },
        desc: {
            tr: "20 örnek cümlenin sesli telaffuzunu dinledin.",
            en: "Listened to 20 full contextual example sentences.",
            de: "20 Beispielsätze vollständig angehört."
        },
        howToUnlock: {
            tr: "Toplam 20 örnek cümle seslendirmesi dinle.",
            en: "Listen to 20 example sentence audios.",
            de: "20 Beispielsatzaussprachen anhören."
        },
        target: 20,
        type: "sentence_audio"
    },

    // 52-55: Cards & Practice
    {
        id: "badge-cards-50",
        tier: "bronze",
        category: "cards",
        icon: "fa-solid fa-clone",
        title: { tr: "Kart Çevirici", en: "Card Flipper", de: "Karten-Umdreher" },
        desc: {
            tr: "3D kelime kartlarını 50 kez çevirerek pratik yaptın.",
            en: "Flipped 3D smart cards 50 times in practice.",
            de: "3D-Karten 50-mal gewendet und geübt."
        },
        howToUnlock: {
            tr: "Kartlar sekmesinde en az 50 kez kart çevir veya incele.",
            en: "Study or flip 50 flashcards.",
            de: "50-mal Karten wenden oder lernen."
        },
        target: 50,
        type: "cards_studied"
    },
    {
        id: "badge-cards-200",
        tier: "silver",
        category: "cards",
        icon: "fa-solid fa-layer-group",
        title: { tr: "Hafıza Mimarı", en: "Memory Architect", de: "Gedächtnis-Architekt" },
        desc: {
            tr: "200 kelime kartı inceleyerek görsel hafızanı güçlendirdin.",
            en: "Reviewed 200 flashcards, cementing visual recall.",
            de: "200 Karten studiert und die Erinnerung gestärkt."
        },
        howToUnlock: {
            tr: "Kartlar sekmesinde en az 200 kez kart incele.",
            en: "Study 200 flashcards.",
            de: "200 Karteikarten studieren."
        },
        target: 200,
        type: "cards_studied"
    },
    {
        id: "badge-cards-500",
        tier: "gold",
        category: "cards",
        icon: "fa-solid fa-monument",
        title: { tr: "Zihin Sarayı", en: "Mind Palace", de: "Gedankenpalast" },
        desc: {
            tr: "500 kart çalışmasıyla muazzam bir zihinsel kütüphane inşa ettin.",
            en: "Built an unshakeable mental palace over 500 card sessions.",
            de: "Mit 500 Kartenwiederholungen einen Gedankenpalast erbaut."
        },
        howToUnlock: {
            tr: "Kartlar sekmesinde en az 500 kez kart incele.",
            en: "Study 500 flashcards.",
            de: "500 Karteikarten studieren."
        },
        target: 500,
        type: "cards_studied"
    },
    {
        id: "badge-cards-shuffle-10",
        tier: "bronze",
        category: "cards",
        icon: "fa-solid fa-shuffle",
        title: { tr: "Kaderi Karıştır", en: "Fate Shuffler", de: "Kartenmischer" },
        desc: {
            tr: "Kartları 10 kez karıştırarak ezberi bozdun ve beynini şaşırttın.",
            en: "Shuffled decks 10 times to disrupt linear memorization.",
            de: "Karten 10-mal gemischt, um das Gehirn herauszufordern."
        },
        howToUnlock: {
            tr: "Kartlar sekmesinde 'Karıştır' butonuna 10 kez tıkla.",
            en: "Click 'Shuffle' 10 times in Flashcards.",
            de: "Klicke 10-mal auf 'Mischen' bei den Karten."
        },
        target: 10,
        type: "cards_shuffled"
    },

    // 56-58: Special Challenges
    {
        id: "badge-night-owl",
        tier: "gold",
        category: "special",
        icon: "fa-solid fa-moon",
        title: { tr: "Gece Kuşu", en: "Night Owl", de: "Nachteule" },
        desc: {
            tr: "Herkes uyurken (00:00 - 05:00) dil öğrenme azmini sürdürdün.",
            en: "Studied while the world slept (between 00:00 and 05:00).",
            de: "Gelernt, während alle schliefen (zwischen 00:00 und 05:00 Uhr)."
        },
        howToUnlock: {
            tr: "Gece saat 00:00 ile 05:00 arasında kelime öğren veya çalışma yap.",
            en: "Study cards, learn words or take a quiz between 00:00 and 05:00.",
            de: "Lerne zwischen 00:00 und 05:00 Uhr Wörter oder löse ein Quiz."
        },
        target: 1,
        type: "night_owl"
    },
    {
        id: "badge-early-bird",
        tier: "silver",
        category: "special",
        icon: "fa-solid fa-sun",
        title: { tr: "Erken Kalkan", en: "Early Bird", de: "Frühaufsteher" },
        desc: {
            tr: "Günün ilk ışıklarıyla (05:00 - 07:30) zihnini kelimelerle açtın.",
            en: "Woke up early to learn with sunrise (05:00 - 07:30).",
            de: "Mit dem Sonnenaufgang gelernt (05:00 - 07:30 Uhr)."
        },
        howToUnlock: {
            tr: "Sabah saat 05:00 ile 07:30 arasında çalışma yap.",
            en: "Study words or cards early in the morning between 05:00 and 07:30.",
            de: "Lerne morgens zwischen 05:00 und 07:30 Uhr."
        },
        target: 1,
        type: "early_bird"
    },
    {
        id: "badge-weekend-warrior",
        tier: "gold",
        category: "special",
        icon: "fa-solid fa-dumbbell",
        title: { tr: "Hafta Sonu Savaşçısı", en: "Weekend Warrior", de: "Wochenend-Krieger" },
        desc: {
            tr: "Tatil günlerinde rehavete kapılmayıp hem Cumartesi hem Pazar çalıştın.",
            en: "Studied actively on both Saturday and Sunday in a weekend.",
            de: "Sowohl am Samstag als auch am Sonntag aktiv gelernt."
        },
        howToUnlock: {
            tr: "Aynı hafta sonunun hem Cumartesi hem de Pazar günü aktif çalışma yap.",
            en: "Study on both Saturday and Sunday in the same weekend.",
            de: "Lerne am selben Wochenende sowohl samstags als auch sonntags."
        },
        target: 1,
        type: "weekend_warrior"
    }
];

const ACHIEVEMENTS_DATABASE = ACHIEVEMENTS_RAW.map(ach => ({
    ...ach,
    progress: function() {
        const cur = (typeof getAchievementMetric === "function") ? getAchievementMetric(this.type) : 0;
        const target = this.target;
        return {
            current: Math.min(cur, target),
            target: target,
            percent: Math.min(100, Math.round((cur / target) * 100))
        };
    },
    check: function() {
        const cur = (typeof getAchievementMetric === "function") ? getAchievementMetric(this.type) : 0;
        return cur >= this.target;
    }
}));




// Tooltip presentation controller
function showBadgeTooltip(badgeId, targetEl, mouseEvent) {
    const tooltip = document.getElementById("badge-hover-tooltip");
    if (!tooltip) return;

    const ach = ACHIEVEMENTS_DATABASE.find(a => a.id === badgeId);
    if (!ach) return;

    const isUnlocked = unlockedAchievements.includes(ach.id);
    const lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "tr";
    const title = ach.title[lang] || ach.title.tr || ach.title.en;
    const desc = ach.desc[lang] || ach.desc.tr || ach.desc.en;
    const howTo = ach.howToUnlock[lang] || ach.howToUnlock.tr || ach.howToUnlock.en;
    const tierName = getTierDisplayName(ach.tier, lang);
    const categoryName = getCategoryDisplayName(ach.category, lang);
    const prog = ach.progress();

    const statusHtml = isUnlocked 
        ? '<div class="badge-tooltip-status unlocked"><i class="fa-solid fa-circle-check"></i> ' + (lang === 'en' ? 'Unlocked & Achieved' : (lang === 'de' ? 'Erfolg freigeschaltet' : 'Kazanıldı!')) + '</div>'
        : '<div class="badge-tooltip-status locked"><i class="fa-solid fa-lock"></i> ' + (lang === 'en' ? 'Locked' : (lang === 'de' ? 'Gesperrt' : 'Henüz Kazanılmadı')) + '</div>';

    tooltip.innerHTML = `
        <div class="badge-tooltip-header">
            <span class="badge-tooltip-tier tier-${ach.tier}-badge">${tierName}</span>
            <span class="badge-tooltip-cat">${categoryName}</span>
        </div>
        <div class="badge-tooltip-title-row">
            <div class="badge-tooltip-icon tier-${ach.tier}">
                <i class="${ach.icon}"></i>
            </div>
            <div>
                <h4 class="badge-tooltip-title">${title}</h4>
                <p class="badge-tooltip-lore">${desc}</p>
            </div>
        </div>
        <div class="badge-tooltip-req">
            <div class="badge-tooltip-req-title">
                <i class="fa-solid fa-compass-drafting"></i> ${lang === 'en' ? 'How to Unlock' : (lang === 'de' ? 'Freischaltbedingung' : 'Nasıl Kazanılır?')}
            </div>
            <div class="badge-tooltip-req-text">${howTo}</div>
        </div>
        <div class="badge-tooltip-progress-box">
            <div class="badge-tooltip-progress-row">
                <span>${lang === 'en' ? 'Progress' : (lang === 'de' ? 'Fortschritt' : 'İlerleme')}</span>
                <span>${prog.current} / ${prog.target} (${prog.percent}%)</span>
            </div>
            <div class="badge-tooltip-progress-bar">
                <div class="badge-tooltip-progress-fill" style="width: ${prog.percent}%;"></div>
            </div>
        </div>
        ${statusHtml}
    `;

    tooltip.classList.add("visible");
    positionTooltip(tooltip, targetEl, mouseEvent);
}

function positionTooltip(tooltip, targetEl, mouseEvent) {
    if (!tooltip || !targetEl) return;
    const tooltipRect = tooltip.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const margin = 12;

    let left = 0;
    let top = 0;

    if (mouseEvent && mouseEvent.clientX) {
        left = mouseEvent.clientX + margin;
        top = mouseEvent.clientY + margin;
    } else {
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        top = targetRect.bottom + margin;
    }

    // Horizontal edge clamping
    if (left + tooltipRect.width > window.innerWidth - 12) {
        left = window.innerWidth - tooltipRect.width - 12;
    }
    if (left < 12) left = 12;

    // Vertical edge clamping
    if (top + tooltipRect.height > window.innerHeight - 12) {
        top = (mouseEvent ? mouseEvent.clientY : targetRect.top) - tooltipRect.height - margin;
    }
    if (top < 12) top = 12;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

function hideBadgeTooltip() {
    const tooltip = document.getElementById("badge-hover-tooltip");
    if (tooltip) {
        tooltip.classList.remove("visible");
    }
}

function setupBadgeTooltips() {
    const tooltip = document.getElementById("badge-hover-tooltip");
    if (!tooltip) return;

    let activeTarget = null;

    document.addEventListener("mouseover", (e) => {
        const badgeEl = e.target.closest(".badge-item, .ach-card");
        if (badgeEl) {
            const badgeId = badgeEl.getAttribute("data-badge-id") || badgeEl.id;
            if (badgeId) {
                activeTarget = badgeEl;
                showBadgeTooltip(badgeId, badgeEl, e);
            }
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (activeTarget && tooltip.classList.contains("visible")) {
            positionTooltip(tooltip, activeTarget, e);
        }
    });

    document.addEventListener("mouseout", (e) => {
        const badgeEl = e.target.closest(".badge-item, .ach-card");
        if (badgeEl && (!e.relatedTarget || !badgeEl.contains(e.relatedTarget))) {
            activeTarget = null;
            hideBadgeTooltip();
        }
    });

    document.addEventListener("click", (e) => {
        const badgeEl = e.target.closest(".badge-item, .ach-card");
        if (badgeEl) {
            const badgeId = badgeEl.getAttribute("data-badge-id") || badgeEl.id;
            if (badgeId) {
                if (tooltip.classList.contains("visible") && activeTarget === badgeEl) {
                    activeTarget = null;
                    hideBadgeTooltip();
                } else {
                    activeTarget = badgeEl;
                    showBadgeTooltip(badgeId, badgeEl, null);
                }
                return;
            }
        }
        if (!e.target.closest("#badge-hover-tooltip")) {
            activeTarget = null;
            hideBadgeTooltip();
        }
    });
}

// Achievements Gallery Modal Controller
function setupAchievementsModal() {
    const openBtn = document.getElementById("open-all-badges-btn");
    const closeBtn = document.getElementById("close-achievements-modal-btn");
    const modalOverlay = document.getElementById("achievements-modal-overlay");
    const searchInput = document.getElementById("ach-search-input");
    const searchClear = document.getElementById("ach-search-clear");
    const filterTabsContainer = document.getElementById("ach-filter-tabs");

    if (openBtn && modalOverlay) {
        openBtn.addEventListener("click", () => {
            renderModalBadges();
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove("active");
            document.body.style.overflow = "";
            hideBadgeTooltip();
        }
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentAchSearchQuery = e.target.value.trim().toLowerCase();
            if (searchClear) {
                searchClear.style.display = currentAchSearchQuery ? "block" : "none";
            }
            renderModalBadges();
        });
    }

    if (searchClear && searchInput) {
        searchClear.addEventListener("click", () => {
            searchInput.value = "";
            currentAchSearchQuery = "";
            searchClear.style.display = "none";
            renderModalBadges();
        });
    }

    if (filterTabsContainer) {
        filterTabsContainer.querySelectorAll(".ach-tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                filterTabsContainer.querySelectorAll(".ach-tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentAchCategoryFilter = btn.getAttribute("data-filter") || "all";
                renderModalBadges();
            });
        });
    }
}

// Render badges inside the pop-up modal gallery
function renderModalBadges() {
    const grid = document.getElementById("ach-modal-badges-grid");
    if (!grid) return;

    const unlockedCount = unlockedAchievements.length;
    const totalCount = ACHIEVEMENTS_DATABASE.length;
    const percent = Math.min(100, Math.round((unlockedCount / totalCount) * 100));
    const lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "tr";

    // Update modal stats
    const mCountEl = document.getElementById("m-badges-unlocked-count");
    const mPercentEl = document.getElementById("m-badges-percent");
    const mProgLabel = document.getElementById("m-badges-progress-label");
    const mProgFill = document.getElementById("m-badges-progress-fill");
    const tabUnlockedCount = document.getElementById("ach-tab-unlocked-count");
    const tabLockedCount = document.getElementById("ach-tab-locked-count");

    if (mCountEl) mCountEl.textContent = unlockedCount + " / " + totalCount;
    if (mPercentEl) mPercentEl.textContent = percent + "%";
    if (mProgLabel) mProgLabel.textContent = unlockedCount + " / " + totalCount;
    if (mProgFill) mProgFill.style.width = percent + "%";
    if (tabUnlockedCount) tabUnlockedCount.textContent = unlockedCount;
    if (tabLockedCount) tabLockedCount.textContent = totalCount - unlockedCount;

    // Filter achievements
    let filtered = ACHIEVEMENTS_DATABASE.filter(ach => {
        const isUnlocked = unlockedAchievements.includes(ach.id);
        if (currentAchCategoryFilter === "unlocked") return isUnlocked;
        if (currentAchCategoryFilter === "locked") return !isUnlocked;
        if (currentAchCategoryFilter !== "all") return ach.category === currentAchCategoryFilter;
        return true;
    });

    if (currentAchSearchQuery) {
        const q = currentAchSearchQuery.toLowerCase();
        filtered = filtered.filter(ach => {
            const title = (ach.title[lang] || ach.title.tr || "").toLowerCase();
            const desc = (ach.desc[lang] || ach.desc.tr || "").toLowerCase();
            const how = (ach.howToUnlock[lang] || ach.howToUnlock.tr || "").toLowerCase();
            const tier = getTierDisplayName(ach.tier, lang).toLowerCase();
            const cat = getCategoryDisplayName(ach.category, lang).toLowerCase();
            return title.includes(q) || desc.includes(q) || how.includes(q) || tier.includes(q) || cat.includes(q);
        });
    }

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
                <p>${lang === 'en' ? 'No achievements match your filter.' : (lang === 'de' ? 'Keine Erfolge entsprechen deinen Filtern.' : 'Aramanızla eşleşen başarı rozeti bulunamadı.')}</p>
            </div>
        `;
        return;
    }

    filtered.forEach(ach => {
        const isUnlocked = unlockedAchievements.includes(ach.id);
        const title = ach.title[lang] || ach.title.tr || ach.title.en;
        const desc = ach.desc[lang] || ach.desc.tr || ach.desc.en;
        const tierName = getTierDisplayName(ach.tier, lang);
        const categoryName = getCategoryDisplayName(ach.category, lang);
        const prog = ach.progress();

        const card = document.createElement("div");
        card.className = 'ach-card ' + (isUnlocked ? 'unlocked' : 'locked') + ' tier-' + ach.tier;
        card.setAttribute("data-badge-id", ach.id);
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.innerHTML = `
            <div class="ach-card-top">
                <span class="ach-card-category">${categoryName}</span>
                <span class="ach-card-tier-pill tier-${ach.tier}-badge">${tierName}</span>
            </div>
            <div class="ach-card-icon tier-${ach.tier}">
                <i class="${ach.icon}"></i>
            </div>
            <h4 class="ach-card-title">${title}</h4>
            <p class="ach-card-desc">${desc}</p>
            <div class="ach-card-progress-box">
                <div class="ach-card-progress-row">
                    <span>${lang === 'en' ? 'Progress' : (lang === 'de' ? 'Fortschritt' : 'İlerleme')}</span>
                    <span>${prog.current} / ${prog.target}</span>
                </div>
                <div class="ach-card-progress-bar">
                    <div class="ach-card-progress-fill" style="width: ${prog.percent}%;"></div>
                </div>
            </div>
            <div class="ach-card-status-badge">
                ${isUnlocked 
                    ? '<i class="fa-solid fa-circle-check"></i> ' + (lang === 'en' ? 'Unlocked' : (lang === 'de' ? 'Freigeschaltet' : 'Kazanıldı'))
                    : '<i class="fa-solid fa-lock"></i> ' + (lang === 'en' ? 'Locked' : (lang === 'de' ? 'Gesperrt' : 'Kilitli'))
                }
            </div>
        `;

        grid.appendChild(card);
    });
}

// Render 8 featured badges on the home tab badges card
function renderHomeBadges() {
    const unlockedCount = unlockedAchievements.length;
    const totalCount = ACHIEVEMENTS_DATABASE.length;
    const percent = Math.min(100, Math.round((unlockedCount / totalCount) * 100));

    const countPill = document.getElementById("home-badges-unlocked-count");
    const miniFill = document.getElementById("home-badges-mini-fill");
    const grid = document.getElementById("home-featured-badges-grid");

    if (countPill) countPill.textContent = unlockedCount + " / " + totalCount;
    if (miniFill) miniFill.style.width = percent + "%";

    if (!grid) return;

    const featuredIds = [
        "badge-first-step",
        "badge-hunter-25",
        "badge-streak-3",
        "badge-quiz-perfect",
        "badge-custom-author",
        "badge-night-owl"
    ];

    const lang = (typeof currentLang !== "undefined" && currentLang) ? currentLang : "tr";
    grid.innerHTML = "";

    featuredIds.forEach(id => {
        const ach = ACHIEVEMENTS_DATABASE.find(a => a.id === id);
        if (!ach) return;

        const isUnlocked = unlockedAchievements.includes(ach.id);
        const title = ach.title[lang] || ach.title.tr || ach.title.en;
        const tierName = getTierDisplayName(ach.tier, lang);

        const badgeEl = document.createElement("div");
        badgeEl.className = 'badge-item ' + (isUnlocked ? 'unlocked' : 'locked') + ' tier-' + ach.tier;
        badgeEl.id = ach.id;
        badgeEl.setAttribute("data-badge-id", ach.id);
        badgeEl.setAttribute("tabindex", "0");
        badgeEl.setAttribute("role", "button");

        badgeEl.innerHTML = `
            <div class="badge-icon">
                <i class="${ach.icon}"></i>
                ${!isUnlocked ? '<span class="badge-lock-tag"><i class="fa-solid fa-lock"></i></span>' : ''}
            </div>
            <span class="badge-title">${title}</span>
            <span class="badge-tier-indicator tier-${ach.tier}-badge">${tierName}</span>
        `;

        grid.appendChild(badgeEl);
    });
}

// Core evaluation of all 58 achievements
function checkAchievements(suppressNotifications = false) {
    let newlyUnlocked = [];

    ACHIEVEMENTS_DATABASE.forEach(ach => {
        const isAlreadyUnlocked = unlockedAchievements.includes(ach.id);
        if (!isAlreadyUnlocked) {
            if (ach.check()) {
                unlockedAchievements.push(ach.id);
                newlyUnlocked.push(ach);
            }
        }
    });

    if (newlyUnlocked.length > 0) {
        setAppStorage("lexigoo_unlocked_achievements", JSON.stringify(unlockedAchievements));
        const shouldNotify = !suppressNotifications && isAppReady;
        if (shouldNotify) {
            playAchievementSound();
            newlyUnlocked.forEach((ach, index) => {
                setTimeout(() => {
                    showAchievementUnlockNotification(ach);
                }, index * 400);
            });
        }
    }

    renderHomeBadges();
    const modal = document.getElementById("achievements-modal-overlay");
    if (modal && modal.classList.contains("active")) {
        renderModalBadges();
    }
}

// Initialization of Achievements Engine
function initAchievementsEngine() {
    if (isAchievementsInitialized) return;
    isAchievementsInitialized = true;

    try {
        unlockedAchievements = JSON.parse(getAppStorage("lexigoo_unlocked_achievements") || "[]");
    } catch(e) {
        unlockedAchievements = [];
    }

    const toastContainer = document.getElementById("achievement-toast-container");
    if (toastContainer) {
        toastContainer.innerHTML = "";
    }

    setupBadgeTooltips();
    setupAchievementsModal();
    renderHomeBadges();
}

window.ACHIEVEMENTS_DATABASE = ACHIEVEMENTS_DATABASE;

// ==========================================================================
// 13. Localization & i18n Engine (Turkish / English / German Support)
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
        "tenses-subtitle": "Dilbilgisindeki temel zamanları ve en çok kullanılan kipleri detaylı formüller ve örneklerle öğrenin.",
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
        "btn-view-all-badges": "Tümünü Göster",
        "modal-badges-title": "Başarı Rozetleri Galerisi",
        "modal-badges-subtitle": "Tüm başarılar, kilit açma hedefleri ve kazanılan ödüller",
        "modal-stat-unlocked": "Kazanılan Rozet",
        "modal-stat-completion": "Tamamlanma Oranı",
        "modal-overall-progress": "Genel Başarım İlerlemesi",
        "qa-title": "Bugün Ne Yapmak İstersin?",
        "qa-subtitle": "Öğrenme yolculuğuna devam etmek için aşağıdaki aktivitelerden birini seçerek anında başlayabilirsin.",
        "qa-search-title": "Kelimeleri Ara",
        "qa-search-desc": "Zengin sözlük veritabanında filtreleme ve arama yap.",
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
        "drawer-target-lang-title": "Öğrenilen Dil (Target Language)",
        "drawer-target-lang-desc": "Çalışmak istediğiniz hedef dili değiştirin:",
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
        "drawer-lang-title": "Arayüz Dili (Interface Language)",
        "drawer-lang-desc": "Uygulama arayüz dilini değiştirin:",
        "drawer-reset-title": "İlerleme Sıfırlama",
        "drawer-reset-desc": "Çalışma verilerinizi temizleyebilirsiniz (serileriniz, rozetleriniz ve kendi eklediğiniz kelimeler sıfırlanır):",
        "drawer-reset-btn": "Tüm İlerlemeyi Sıfırla",
        "greeting-welcome": "Hoş Geldiniz! ✨",
        "cards-title": "Kelime Kartları ile Pratik",
        "list-title": "Tüm Kelimeler & Sözlük",
        "add-word-title": "Yeni Kelime Ekle",
        "label-word-tr": "Türkçe Anlamı",
        "label-word-category": "Kategori / Tür",
        "label-word-example-tr": "Türkçe Çeviri (İsteğe Bağlı)",
        "btn-save-word": "Listeme Ekle",
        "th-meaning": "Türkçe Anlamı",
        "th-category": "Kategori",
        "th-actions": "İşlemler",
        "btn-prev": "Önceki",
        "btn-next": "Sonraki",
        "btn-shuffle": "Karıştır",
        "quiz-title": "Bilgini Sına!",
        "quiz-subtitle": "Öğrendiğin kelimeleri farklı modlarda test et. Test uzunluğunu ve soru çeşidini seçebilirsin.",
        "quiz-intro-title": "Kelime Yarışı Başlıyor!",
        "quiz-source-label": "Soru Kaynağı ve Alanı:",
        "quiz-type-label": "Soru Türü:",
        "quiz-count-label": "Soru Sayısı:",
        "btn-start-quiz": "Testi Başlat",
        "btn-quit-quiz": "Testten Çık",
        "btn-next-question": "Sonraki Soru",
        "btn-retry-quiz": "Yeniden Dene",
        "btn-home-return": "Ana Sayfaya Dön",
        "grammar-empty-text": "Öğrenmek istediğiniz dilbilgisi konusunu soldaki listeden seçin."
    },
    en: {
        "nav-home": "Home",
        "nav-cards": "Flashcards",
        "nav-list": "Dictionary",
        "nav-add": "Add Word",
        "btn-add-word": "Add New Word",
        "nav-tenses": "Grammar & Modals",
        "nav-quiz": "Quiz",
        "tenses-title": "Grammar & Modals",
        "tenses-subtitle": "Learn core tenses and key modals with structural formulas and examples.",
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
        "btn-view-all-badges": "View All",
        "modal-badges-title": "Achievement Gallery",
        "modal-badges-subtitle": "All achievements, unlock objectives and earned milestones",
        "modal-stat-unlocked": "Unlocked Badges",
        "modal-stat-completion": "Completion Rate",
        "modal-overall-progress": "Overall Progress",
        "qa-title": "What would you like to do today?",
        "qa-subtitle": "Choose from the learning activities below to get started instantly.",
        "qa-search-title": "Search Dictionary",
        "qa-search-desc": "Search and filter in our rich multilingual database.",
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
        "drawer-target-lang-title": "Target Learning Language",
        "drawer-target-lang-desc": "Choose which language you want to study:",
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
        "drawer-lang-title": "Interface Language",
        "drawer-lang-desc": "Toggle the interface language:",
        "drawer-reset-title": "Reset Progress",
        "drawer-reset-desc": "Clean up your learning data (streaks, badges, and custom words will be deleted):",
        "drawer-reset-btn": "Reset All Progress",
        "greeting-welcome": "Welcome! ✨",
        "cards-title": "Flashcards Practice",
        "list-title": "All Words & Dictionary",
        "add-word-title": "Add New Word",
        "label-word-tr": "Turkish Meaning",
        "label-word-category": "Category / Type",
        "label-word-example-tr": "Turkish Translation (Optional)",
        "btn-save-word": "Add to My List",
        "th-meaning": "Turkish Meaning",
        "th-category": "Category",
        "th-actions": "Actions",
        "btn-prev": "Previous",
        "btn-next": "Next",
        "btn-shuffle": "Shuffle",
        "quiz-title": "Test Your Knowledge!",
        "quiz-subtitle": "Test vocabulary in various modes. Pick length and question type.",
        "quiz-intro-title": "Word Race Begins!",
        "quiz-source-label": "Question Source & Category:",
        "quiz-type-label": "Question Type:",
        "quiz-count-label": "Number of Questions:",
        "btn-start-quiz": "Start Quiz",
        "btn-quit-quiz": "Quit Quiz",
        "btn-next-question": "Next Question",
        "btn-retry-quiz": "Try Again",
        "btn-home-return": "Return to Home",
        "grammar-empty-text": "Select a grammar topic from the list on the left."
    },
    de: {
        "nav-home": "Startseite",
        "nav-cards": "Karteikarten",
        "nav-list": "Wörterbuch",
        "nav-add": "Wort Hinzufügen",
        "btn-add-word": "Neues Wort Hinzufügen",
        "nav-tenses": "Grammatik & Modale",
        "nav-quiz": "Quiz",
        "tenses-title": "Grammatik & Modale",
        "tenses-subtitle": "Lernen Sie die wichtigsten Zeiten, Modalverben und Strukturen mit Formeln und Beispielen.",
        "grammar-topics": "Themenliste",
        "grammar-usage": "Verwendung / Zweck",
        "grammar-formula": "Satzstruktur (Formel)",
        "grammar-ex-title": "Beispielsätze (Positiv / Negativ / Frage)",
        "stat-total": "Wörter Gesamt",
        "stat-learned": "Gelernte Wörter",
        "stat-custom": "Eigene Wörter",
        "stat-streak": "Lernserie",
        "quests-title": "Tägliche Quests",
        "quests-subtitle": "Täglich zurückgesetzt – halte deine Serie aktiv!",
        "wod-title": "Wort des Tages",
        "wod-subtitle": "Das heutige Fokus-Wort zum Lernen",
        "wod-study-btn": "In Karten lernen",
        "badges-title": "Erfolgsabzeichen",
        "badges-subtitle": "Belohnungen auf deiner Lernreise",
        "badge-first-step-title": "Erster Schritt",
        "badge-aviation-title": "Kapitän",
        "badge-quiz-title": "Genie",
        "badge-streak-title": "Beständig",
        "badge-tourism-title": "Entdecker",
        "badge-custom-title": "Autor",
        "badge-marathon-title": "Marathonläufer",
        "badge-hunter-title": "Wortjäger",
        "btn-view-all-badges": "Alle anzeigen",
        "modal-badges-title": "Erfolgsabzeichen-Galerie",
        "modal-badges-subtitle": "Alle Erfolge, Freischaltziele und verdienten Belohnungen",
        "modal-stat-unlocked": "Freigeschaltete Abzeichen",
        "modal-stat-completion": "Abschlussrate",
        "modal-overall-progress": "Gesamtfortschritt",
        "qa-title": "Was möchtest du heute tun?",
        "qa-subtitle": "Wähle eine der folgenden Aktivitäten, um sofort loszulegen.",
        "qa-search-title": "Wörterbuch durchsuchen",
        "qa-search-desc": "Durchsuche und filtere in unserer umfangreichen Datenbank.",
        "qa-search-btn": "Zum Wörterbuch",
        "qa-cards-title": "Karteikarten lernen",
        "qa-cards-desc": "Lerne mit 3D-Karten und Sprachausgabe.",
        "qa-cards-btn": "Karten öffnen",
        "qa-quiz-title": "Quiz starten",
        "qa-quiz-desc": "Löse Tests, sammle Punkte und schütze deine Serie.",
        "qa-quiz-btn": "Quiz starten",
        "drawer-title": "Einstellungen & Themes",
        "drawer-theme-title": "Farbschema auswählen",
        "drawer-theme-desc": "Ändere den visuellen Stil der Anwendung:",
        "drawer-target-lang-title": "Lernsprache (Ziel)",
        "drawer-target-lang-desc": "Wähle die Sprache, die du lernen möchtest:",
        "theme-mid": "Mitternachtsblau (Standard)",
        "theme-mid-desc": "Tiefes Marineblau & lebendiges Indigo",
        "theme-eme": "Smaragdwald",
        "theme-eme-desc": "Beruhigendes Tannengrün & Smaragdtöne",
        "theme-sun": "Sonnenuntergang",
        "theme-sun-desc": "Warmes Karmesinrot & Bernsteinleuchten",
        "theme-amy": "Dunkler Amethyst",
        "theme-amy-desc": "Kosmisches Violett & Amethysttöne",
        "theme-aur": "Nordlichter",
        "theme-aur-desc": "Futuristisches Cyan & elektrisches Türkis",
        "drawer-lang-title": "Oberflächensprache",
        "drawer-lang-desc": "Ändere die Sprache der Benutzeroberfläche:",
        "drawer-reset-title": "Fortschritt zurücksetzen",
        "drawer-reset-desc": "Lösche deine Lerndaten (Serien, Abzeichen und eigene Wörter werden entfernt):",
        "drawer-reset-btn": "Gesamten Fortschritt zurücksetzen",
        "greeting-welcome": "Willkommen! ✨",
        "cards-title": "Karteikarten-Praxis",
        "list-title": "Alle Wörter & Wörterbuch",
        "add-word-title": "Neues Wort Hinzufügen",
        "label-word-tr": "Türkische Bedeutung",
        "label-word-category": "Kategorie / Wortart",
        "label-word-example-tr": "Türkische Übersetzung (Optional)",
        "btn-save-word": "Zu meiner Liste hinzufügen",
        "th-meaning": "Türkische Bedeutung",
        "th-category": "Kategorie",
        "th-actions": "Aktionen",
        "btn-prev": "Zurück",
        "btn-next": "Weiter",
        "btn-shuffle": "Mischen",
        "quiz-title": "Teste dein Wissen!",
        "quiz-subtitle": "Teste deinen Wortschatz in verschiedenen Modi. Wähle Testlänge und Fragetyp.",
        "quiz-intro-title": "Das Wörter-Rennen beginnt!",
        "quiz-source-label": "Fragenquelle & Kategorie:",
        "quiz-type-label": "Fragetyp:",
        "quiz-count-label": "Anzahl der Fragen:",
        "btn-start-quiz": "Quiz starten",
        "btn-quit-quiz": "Quiz beenden",
        "btn-next-question": "Nächste Frage",
        "btn-retry-quiz": "Erneut versuchen",
        "btn-home-return": "Zurück zur Startseite",
        "grammar-empty-text": "Wählen Sie ein Grammatikthema aus der linken Liste."
    }
};

function applySavedLanguage() {
    const savedLang = getAppStorage("lang") || "tr";
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
    const deBtn = document.getElementById("lang-de-btn");
    
    [trBtn, enBtn, deBtn].forEach(b => {
        if (b) {
            b.classList.remove("active");
            b.style.background = "rgba(255,255,255,0.03)";
            b.style.borderColor = "var(--glass-border)";
            b.style.color = "var(--text-secondary)";
        }
    });

    let activeBtn = null;
    if (lang === "tr") activeBtn = trBtn;
    else if (lang === "de") activeBtn = deBtn;
    else activeBtn = enBtn;

    if (activeBtn) {
        activeBtn.classList.add("active");
        activeBtn.style.background = "";
        activeBtn.style.borderColor = "";
        activeBtn.style.color = "";
    }
    
    // 3. Dynamic header titles & labels translation updates
    setGreeting(); // Refresh greeting to translate time words
    checkDailyQuests(); // Refresh quests labels
    updateFormLabelsForTargetLang();
    renderDashboard(); // Refresh localized stats labels and units
    displayCurrentCard(); // Refresh current card texts
    renderDictionaryList(); // Refresh dictionary list texts
    if (typeof renderHomeBadges === "function") renderHomeBadges();
    if (typeof renderModalBadges === "function") renderModalBadges();
}

function trackWodListening() {
    const today = getTodayDateString();
    let wodDays = [];
    try {
        wodDays = JSON.parse(getAppStorage("wod_listened_days") || "[]");
    } catch(e) { wodDays = []; }
    if (!wodDays.includes(today)) {
        wodDays.push(today);
        setAppStorage("wod_listened_days", JSON.stringify(wodDays));
    }
    if (typeof logStudyActivity === "function") logStudyActivity();
    if (!wodListenedToday) {
        wodListenedToday = true;
        setAppStorage("quest_wod", "true");
        showToast(currentLang === 'en' ? "Daily Quest Completed: Listened to Word of the Day! ⚡" : (currentLang === 'de' ? "Tagesquest abgeschlossen: Wort des Tages angehört! ⚡" : "Günlük Görev Tamamlandı: Günün Kelimesi Dinlendi! ⚡"));
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
            deferredPrompt = null;
            installBtn.style.display = 'none';
        });
    });
}

window.addEventListener('appinstalled', (evt) => {
    if (installBtn) {
        installBtn.style.display = 'none';
    }
});

// ==========================================================================
// 15. Zamanlar & Modallar (Tenses & Modals) Controller Logic
// ==========================================================================
function initGrammarTab() {
    const tensesContainer = document.getElementById("tenses-list-container");
    const modalsContainer = document.getElementById("modals-list-container");
    
    if (!tensesContainer || !modalsContainer) return;
    
    tensesContainer.innerHTML = "";
    modalsContainer.innerHTML = "";
    
    const isDe = targetLang === "de";
    const db = isDe 
        ? (typeof TENSES_DE_DATABASE !== 'undefined' ? TENSES_DE_DATABASE : [])
        : (typeof TENSES_MODALS_DATABASE !== 'undefined' ? TENSES_MODALS_DATABASE : []);
    
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
        
        const cat = item.category || "";
        if (cat.includes("Zamanlar") || cat === "Tense" || cat.includes("Zeiten")) {
            tensesContainer.appendChild(btn);
        } else {
            modalsContainer.appendChild(btn);
        }
    });

    // Reset display view
    const emptyState = document.getElementById("grammar-empty-state");
    const displayPanel = document.getElementById("grammar-content-display");
    if (emptyState) emptyState.style.display = "block";
    if (displayPanel) displayPanel.style.display = "none";
    activeGrammarItem = null;
}

function selectGrammarTopic(id) {
    const isDe = targetLang === "de";
    const db = isDe 
        ? (typeof TENSES_DE_DATABASE !== 'undefined' ? TENSES_DE_DATABASE : [])
        : (typeof TENSES_MODALS_DATABASE !== 'undefined' ? TENSES_MODALS_DATABASE : []);
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

    // On mobile devices, smoothly scroll down to display panel
    if (window.innerWidth <= 768 && displayPanel) {
        displayPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderGrammarExamples() {
    const container = document.getElementById("grammar-examples-container");
    if (!container || !activeGrammarItem) return;
    
    container.innerHTML = "";
    
    const examples = activeGrammarItem.examples || [];
    const isDe = targetLang === "de";
    
    examples.forEach((ex, idx) => {
        const slide = document.createElement("div");
        slide.className = `grammar-example-slide ${idx === currentExampleIndex ? "active" : ""}`;
        
        slide.innerHTML = `
            <div class="state-block positive-block">
                <div class="state-block-header">
                    <span class="state-lbl pos">Olumlu (${isDe ? 'Positiv' : 'Positive'})</span>
                    <button class="action-btn-sm btn-sentence-tts btn-grammar-tts" data-speech="${encodeURIComponent(ex.positive)}" title="Cümleyi Sesli Dinle">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <p class="state-sentence-en" data-speech="${encodeURIComponent(ex.positive)}" title="Cümleyi Dinlemek İçin Tıklayın">${ex.positive}</p>
                <p class="state-sentence-tr">${ex.positiveTr}</p>
            </div>
            <div class="state-block negative-block">
                <div class="state-block-header">
                    <span class="state-lbl neg">Olumsuz (${isDe ? 'Negativ' : 'Negative'})</span>
                    <button class="action-btn-sm btn-sentence-tts btn-grammar-tts" data-speech="${encodeURIComponent(ex.negative)}" title="Cümleyi Sesli Dinle">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <p class="state-sentence-en" data-speech="${encodeURIComponent(ex.negative)}" title="Cümleyi Dinlemek İçin Tıklayın">${ex.negative}</p>
                <p class="state-sentence-tr">${ex.negativeTr}</p>
            </div>
            <div class="state-block question-block">
                <div class="state-block-header">
                    <span class="state-lbl que">Soru (${isDe ? 'Frage' : 'Question'})</span>
                    <button class="action-btn-sm btn-sentence-tts btn-grammar-tts" data-speech="${encodeURIComponent(ex.question)}" title="Cümleyi Sesli Dinle">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <p class="state-sentence-en" data-speech="${encodeURIComponent(ex.question)}" title="Cümleyi Dinlemek İçin Tıklayın">${ex.question}</p>
                <p class="state-sentence-tr">${ex.questionTr}</p>
            </div>
        `;
        
        container.appendChild(slide);
    });

    // Attach speech listeners to grammar sentence items & buttons
    container.querySelectorAll(".btn-grammar-tts, .state-sentence-en").forEach(el => {
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            const textToSpeak = decodeURIComponent(el.getAttribute("data-speech") || "");
            if (textToSpeak) {
                speakEnglishText(textToSpeak);
            }
        });
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

// ==========================================================================
// 16. ThreeUI 3D Hero WebGL Background (Axiom Ribbon Field Shader)
// Sourced from ThreeUI Community (MengTo/threeui by Meng To & DesignCode)
// Native WebGL GLSL implementation optimized for LexiGoo PWA & mobile
// ==========================================================================
function initHero3DBackground() {
    const card = document.querySelector(".welcome-card");
    const canvas = document.getElementById("hero-3d-canvas");
    if (!card || !canvas) return;

    let gl = null;
    try {
        gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    } catch (e) {
        console.warn("WebGL not supported for Hero 3D background:", e);
        return;
    }
    if (!gl) return;

    const vsSource = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fsSource = `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform vec2 pointer;

        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }

        float ribbon(vec2 uv, float offset, float width, float phase) {
            float y = 0.55 + 0.20 * sin((uv.x * 2.15) + phase) + 0.045 * sin((uv.x * 7.0) - phase * 0.7);
            float d = abs(uv.y - y - offset);
            return exp(-(d * d) / width);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec2 p = uv;
            p.x *= resolution.x / resolution.y;

            float t = time * 0.22;
            float drift = (pointer.x - 0.5) * 0.06;

            float rightFade = smoothstep(0.28, 0.72, uv.x);
            float centerDark = 1.0 - smoothstep(0.0, 0.88, distance(uv, vec2(0.18, 0.48)));

            float r1 = ribbon(vec2(uv.x + drift, uv.y), 0.03, 0.0065, t + 0.9);
            float r2 = ribbon(vec2(uv.x - drift * 0.7, uv.y), -0.23, 0.0085, t + 3.25);
            float r3 = ribbon(vec2(uv.x + drift * 0.4, uv.y), 0.25, 0.014, t + 1.85);

            float glow = r1 * 1.14 + r2 * 1.05 + r3 * 0.48;

            vec3 teal = vec3(0.17, 0.83, 0.75);
            vec3 cyan = vec3(0.22, 0.82, 0.96);
            vec3 indigo = vec3(0.39, 0.38, 0.92);
            vec3 purple = vec3(0.66, 0.33, 0.98);
            vec3 blue = vec3(0.23, 0.51, 0.96);

            vec3 col = vec3(0.0);
            col += cyan * r1 * 0.92;
            col += teal * r1 * 0.62;
            col += indigo * r3 * 0.42;
            col += blue * r2 * 0.66;
            col += purple * (r2 + r3) * 0.30;

            float bloom = exp(-pow(distance(uv, vec2(0.76, 0.40 + 0.035 * sin(t))), 2.0) / 0.050);
            bloom += exp(-pow(distance(uv, vec2(0.71, 0.75 + 0.025 * cos(t))), 2.0) / 0.030);
            col += vec3(0.42, 0.85, 1.0) * bloom * 0.34;

            vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
            float dotShape = smoothstep(0.29, 0.11, length(grid));
            float noise = hash(floor(gl_FragCoord.xy / 7.0));
            float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
            float dots = dotShape * (0.48 + 0.52 * noise) * scan;

            float micro = hash(gl_FragCoord.xy + time) * 0.035;
            float alpha = clamp((glow * 1.55 + bloom * 0.50) * dots * rightFade, 0.0, 1.0);
            alpha *= 1.0 - centerDark * 0.56;

            vec3 base = vec3(0.005, 0.005, 0.005);
            vec3 finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
            finalColor += micro * rightFade;

            gl_FragColor = vec4(finalColor, clamp(alpha * 1.6, 0.0, 1.0));
        }
    `;

    function compileShader(type, src) {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn("Shader compilation failure:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("Shader program link failure:", gl.getProgramInfoLog(program));
        return;
    }
    gl.useProgram(program);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const resUni = gl.getUniformLocation(program, "resolution");
    const timeUni = gl.getUniformLocation(program, "time");
    const pointerUni = gl.getUniformLocation(program, "pointer");

    let currPtrX = 0.72, currPtrY = 0.42;
    let targetPtrX = 0.72, targetPtrY = 0.42;
    let animFrameId = 0;
    let isVisible = true;
    const startTime = performance.now();

    function updateResolution() {
        const rect = card.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.floor(rect.width * dpr));
        const h = Math.max(1, Math.floor(rect.height * dpr));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
            gl.uniform2f(resUni, w, h);
        }
    }

    const handlePointerMove = (e) => {
        const rect = card.getBoundingClientRect();
        targetPtrX = 0.72 + ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.72) * 1.0;
        targetPtrY = 0.42 + (1 - (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.42) * 1.0;
    };

    const handlePointerLeave = () => {
        targetPtrX = 0.72;
        targetPtrY = 0.42;
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    function render(timeNow) {
        currPtrX += (targetPtrX - currPtrX) * 0.04;
        currPtrY += (targetPtrY - currPtrY) * 0.04;

        gl.uniform1f(timeUni, (timeNow - startTime) * 0.001);
        gl.uniform2f(pointerUni, currPtrX, currPtrY);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (isVisible && !document.hidden && activeTab === "home-tab") {
            animFrameId = requestAnimationFrame(render);
        } else {
            animFrameId = 0;
        }
    }

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animFrameId && activeTab === "home-tab") {
                animFrameId = requestAnimationFrame(render);
            } else if (!isVisible && animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = 0;
            }
        });
        io.observe(card);
    }

    if ("ResizeObserver" in window) {
        const ro = new ResizeObserver(updateResolution);
        ro.observe(card);
    } else {
        window.addEventListener("resize", updateResolution);
    }

    updateResolution();
    animFrameId = requestAnimationFrame(render);

    window.hero3DController = {
        resume: () => {
            if (!animFrameId && isVisible) {
                updateResolution();
                animFrameId = requestAnimationFrame(render);
            }
        },
        pause: () => {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = 0;
            }
        }
    };
}

// ==========================================================================
// 17. App Bootstrap Execution
// ==========================================================================
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

