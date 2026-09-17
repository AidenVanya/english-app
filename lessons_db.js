// ==========================================================================
// LexiGoo - Duolingo-style Learning Path & Lessons Database (EN & DE)
// Each path contains structured lessons with exactly 10 interactive questions.
// ==========================================================================

const LESSONS_DATABASE = {
    en: [
        {
            id: "en_lesson_1",
            unit: 1,
            title: "Tanışma & Selamlaşma",
            subtitle: "Greetings & Basic Introductions",
            icon: "fa-hand-wave",
            description: "İlk adımı at: Merhaba de, kendini tanıt ve basit cümleler kur.",
            color: "#6366f1",
            questions: [
                {
                    type: "choice",
                    question: "'Hello, how are you?' cümlesinin Türkçe anlamı nedir?",
                    phrase: "Hello, how are you?",
                    options: ["Merhaba, nasılsın?", "Günaydın, neredesin?", "İyi akşamlar, kimsin?", "Görüşürüz, kendine iyi bak."],
                    correct: 0,
                    explanation: "'Hello' merhaba, 'how are you' nasılsın demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Benim adım ...' ifadesinin İngilizce karşılığı hangisidir?",
                    options: ["I am come from...", "My name is...", "I live in...", "Nice to meet you"],
                    correct: 1,
                    explanation: "'My name is' benim adım anlamına gelir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi doğru seç:",
                    phrase: "Welcome",
                    options: ["Welcome", "Window", "Weather", "Wonderful"],
                    correct: 0,
                    explanation: "'Welcome' hoş geldiniz demektir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'Nice to ______ you!'",
                    sentence: "Nice to ______ you!",
                    options: ["meet", "meat", "make", "stay"],
                    correct: 0,
                    explanation: "'Nice to meet you' tanıştığımıza memnun oldum kalıbıdır."
                },
                {
                    type: "word_order",
                    question: "Kelimeleri doğru sıraya dizerek cümleyi oluştur:",
                    words: ["morning", "Good", "friend", "my"],
                    correctOrder: ["Good", "morning", "my", "friend"],
                    translation: "Günaydın arkadaşım."
                },
                {
                    type: "choice",
                    question: "'Thank you very much' ne anlama gelir?",
                    phrase: "Thank you very much",
                    options: ["Çok teşekkür ederim", "Bir şey değil", "Özür dilerim", "Lütfen rica ederim"],
                    correct: 0,
                    explanation: "'Thank you very much' çok teşekkür ederim demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Sonra görüşürüz' demek için hangisi kullanılır?",
                    options: ["Good night", "See you later", "You are welcome", "Excuse me"],
                    correct: 1,
                    explanation: "'See you later' sonra görüşürüz anlamına gelir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'Where are you ______?'",
                    sentence: "Where are you ______?",
                    options: ["from", "at", "for", "to"],
                    correct: 0,
                    explanation: "'Where are you from?' nerelisin sorusudur."
                },
                {
                    type: "listen",
                    question: "Dinlediğin selamlaşma ifadesini seç:",
                    phrase: "Good evening",
                    options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
                    correct: 2,
                    explanation: "'Good evening' iyi akşamlar demektir."
                },
                {
                    type: "word_order",
                    question: "Kelimeleri doğru sıraya dizerek cümleyi kur:",
                    words: ["am", "I", "fine", "thank", "you"],
                    correctOrder: ["I", "am", "fine", "thank", "you"],
                    translation: "İyiyim, teşekkür ederim."
                }
            ]
        },
        {
            id: "en_lesson_2",
            unit: 2,
            title: "Günlük Hayat & Geniş Zaman",
            subtitle: "Daily Habits & Simple Present",
            icon: "fa-sun",
            description: "Gündelik rutinlerini, alışkanlıklarını ve Simple Present kurallarını öğren.",
            color: "#06b6d4",
            questions: [
                {
                    type: "choice",
                    question: "'I drink coffee every morning.' cümlesinin anlamı nedir?",
                    phrase: "I drink coffee every morning.",
                    options: ["Her sabah kahve içerim.", "Dün sabah çay içtim.", "Sabahları kahvaltı yaparım.", "Her akşam kahve pişiririm."],
                    correct: 0,
                    explanation: "'every morning' her sabah, 'drink' içmek demektir."
                },
                {
                    type: "fill_blank",
                    question: "Geniş zamanda He/She/It için fiile -s takısı gelir: 'He ______ tennis on Sundays.'",
                    sentence: "He ______ tennis on Sundays.",
                    options: ["plays", "play", "playing", "played"],
                    correct: 0,
                    explanation: "Simple Present Tense'de 3. tekil şahıs (He) fiile '-s' alır: 'plays'."
                },
                {
                    type: "reverse_choice",
                    question: "'Her gün kitap okurum.' cümlesi hangisidir?",
                    options: ["I read a book every day.", "I will read a book tomorrow.", "I am reading a book now.", "I read books yesterday."],
                    correct: 0,
                    explanation: "Alışkanlıklar için Simple Present kullanılır: 'I read a book every day'."
                },
                {
                    type: "listen",
                    question: "Dinlediğin eylemi seç:",
                    phrase: "Wake up early",
                    options: ["Wake up early", "Go to bed", "Eat lunch", "Take a shower"],
                    correct: 0,
                    explanation: "'Wake up early' erken uyanmak anlamına gelir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur: 'O asla geç kalmaz.'",
                    words: ["is", "never", "late", "She"],
                    correctOrder: ["She", "is", "never", "late"],
                    translation: "O asla geç kalmaz."
                },
                {
                    type: "fill_blank",
                    question: "Olumsuz geniş zaman: 'They ______ not live in London.'",
                    sentence: "They ______ not live in London.",
                    options: ["do", "does", "is", "are"],
                    correct: 0,
                    explanation: "'They' öznesi ile olumsuzlukta 'do not (don't)' kullanılır."
                },
                {
                    type: "choice",
                    question: "'What time do you wake up?' sorusu ne sorar?",
                    phrase: "What time do you wake up?",
                    options: ["Saat kaçta uyanırsın?", "Nereye gidiyorsun?", "Ne zaman uyursun?", "Nasıl kahvaltı yaparsın?"],
                    correct: 0,
                    explanation: "'What time' saat kaçta, 'wake up' uyanmak demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Always",
                    options: ["Always", "Sometimes", "Often", "Never"],
                    correct: 0,
                    explanation: "'Always' daima / her zaman anlamına gelir."
                },
                {
                    type: "reverse_choice",
                    question: "'Bazen müzik dinleriz.' ifadesinin İngilizcesi hangisidir?",
                    options: ["We sometimes listen to music.", "We always watch movies.", "We never sing songs.", "We listen to the radio."],
                    correct: 0,
                    explanation: "'sometimes' bazen, 'listen to music' müzik dinlemektir."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini sıraya diz:",
                    words: ["you", "Do", "speak", "English"],
                    correctOrder: ["Do", "you", "speak", "English"],
                    translation: "İngilizce konuşur musun?"
                }
            ]
        },
        {
            id: "en_lesson_3",
            unit: 3,
            title: "Yiyecek, İçecek & Restoran",
            subtitle: "Food, Drinks & Ordering at Restaurant",
            icon: "fa-utensils",
            description: "Restoranda sipariş ver, hesap iste ve lezzetli yemeklerden bahset.",
            color: "#f59e0b",
            questions: [
                {
                    type: "choice",
                    question: "'Can I have the menu, please?' ne anlama gelir?",
                    phrase: "Can I have the menu, please?",
                    options: ["Menüyü alabilir miyim, lütfen?", "Hesap lütfen.", "Yemek lezzetli mi?", "Masa boş mu?"],
                    correct: 0,
                    explanation: "Kibarca menü isterken 'Can I have the menu, please?' kullanılır."
                },
                {
                    type: "fill_blank",
                    question: "Sipariş verirken: 'I would ______ a glass of water.'",
                    sentence: "I would ______ a glass of water.",
                    options: ["like", "likes", "wanting", "drink"],
                    correct: 0,
                    explanation: "'I would like' (I'd like) istemek kalıbıdır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin yiyecek/içeceği seç:",
                    phrase: "Delicious breakfast",
                    options: ["Delicious breakfast", "Cold coffee", "Sweet apple", "Hot dinner"],
                    correct: 0,
                    explanation: "'Delicious breakfast' lezzetli kahvaltı demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Hesabı alabilir miyiz lütfen?' nasıl denir?",
                    options: ["Could we have the bill, please?", "Where is the kitchen?", "I don't like this food.", "What is today's soup?"],
                    correct: 0,
                    explanation: "'the bill' veya 'the check' hesap anlamına gelir."
                },
                {
                    type: "word_order",
                    question: "Kelimeleri dizerek sipariş ver:",
                    words: ["like", "pizza", "I", "would", "a"],
                    correctOrder: ["I", "would", "like", "a", "pizza"],
                    translation: "Bir pizza rica ediyorum."
                },
                {
                    type: "choice",
                    question: "'Bon appétit / Enjoy your meal!' diyen bir garson ne dilemektedir?",
                    phrase: "Enjoy your meal!",
                    options: ["Afiyet olsun!", "İyi yolculuklar!", "Geçmiş olsun!", "Hoşça kalın!"],
                    correct: 0,
                    explanation: "'Enjoy your meal!' afiyet olsun demektir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'Is this food spicy ______ sweet?'",
                    sentence: "Is this food spicy ______ sweet?",
                    options: ["or", "and", "so", "but"],
                    correct: 0,
                    explanation: "'spicy or sweet?' acı mı yoksa tatlı mı anlamına gelir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Vegetable soup",
                    options: ["Vegetable soup", "Tomato sauce", "Grilled chicken", "Orange juice"],
                    correct: 0,
                    explanation: "'Vegetable soup' sebze çorbası demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Su ister misiniz?' sorusunun İngilizcesi nedir?",
                    options: ["Would you like some water?", "Do you drink milk?", "Can you cook dinner?", "Are you hungry?"],
                    correct: 0,
                    explanation: "Teklif cümlelerinde 'Would you like...?' kullanılır."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["food", "The", "was", "very", "delicious"],
                    correctOrder: ["The", "food", "was", "very", "delicious"],
                    translation: "Yemek çok lezzetliydi."
                }
            ]
        },
        {
            id: "en_lesson_4",
            unit: 4,
            title: "Seyahat, Ulaşım & Yönler",
            subtitle: "Travel, Airport & Asking Directions",
            icon: "fa-plane-departure",
            description: "Havalimanında bilet al, yön sor ve şehirde rahatça dolaş.",
            color: "#10b981",
            questions: [
                {
                    type: "choice",
                    question: "'Where is the nearest subway station?' ne sorar?",
                    phrase: "Where is the nearest subway station?",
                    options: ["En yakın metro istasyonu nerede?", "Metro bileti kaç para?", "Tren saat kaçta kalkıyor?", "Burası neresi?"],
                    correct: 0,
                    explanation: "'nearest' en yakın, 'subway station' metro istasyonudur."
                },
                {
                    type: "fill_blank",
                    question: "Yol tarifi verirken: 'Turn ______ at the corner.' (Sağa dön)",
                    sentence: "Turn ______ at the corner.",
                    options: ["right", "write", "straight", "away"],
                    correct: 0,
                    explanation: "'Turn right' sağa dön demektir ('turn left' sola dön)."
                },
                {
                    type: "listen",
                    question: "Dinlediğin seyahat terimini seç:",
                    phrase: "Boarding pass",
                    options: ["Boarding pass", "Passport check", "Luggage claim", "Departure gate"],
                    correct: 0,
                    explanation: "'Boarding pass' uçağa biniş kartıdır."
                },
                {
                    type: "reverse_choice",
                    question: "'Düz git ve sola dön' yönergesi hangisidir?",
                    options: ["Go straight and turn left.", "Go back and stop.", "Turn right then go home.", "Cross the road quickly."],
                    correct: 0,
                    explanation: "'Go straight' düz git, 'turn left' sola dön."
                },
                {
                    type: "word_order",
                    question: "Cümleyi doğru sıraya diz:",
                    words: ["is", "the", "Where", "hotel"],
                    correctOrder: ["Where", "is", "the", "hotel"],
                    translation: "Otel nerede?"
                },
                {
                    type: "choice",
                    question: "'How much is a single ticket to London?' sorusunun anlamı nedir?",
                    phrase: "How much is a single ticket to London?",
                    options: ["Londra'ya tek yön bilet ne kadar?", "Londra treni ne zaman?", "Londra ne kadar uzak?", "Londra'ya bilet var mı?"],
                    correct: 0,
                    explanation: "'single ticket' tek yön bilet, 'how much' fiyat sorar."
                },
                {
                    type: "fill_blank",
                    question: "Havalimanında: 'Your flight is ______ gate 14.'",
                    sentence: "Your flight is ______ gate 14.",
                    options: ["at", "on", "into", "over"],
                    correct: 0,
                    explanation: "Kapı numaralarında 'at gate 14' edatı kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Suitcase",
                    options: ["Suitcase", "Ticket", "Airport", "Passport"],
                    correct: 0,
                    explanation: "'Suitcase' bavul / bavul çantası demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'İyi yolculuklar!' ifadesi hangisidir?",
                    options: ["Have a safe trip!", "Good luck today!", "See you yesterday!", "Welcome back!"],
                    correct: 0,
                    explanation: "'Have a safe trip!' güvenli / iyi yolculuklar diler."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["need", "I", "my", "passport"],
                    correctOrder: ["I", "need", "my", "passport"],
                    translation: "Pasaportuma ihtiyacım var."
                }
            ]
        },
        {
            id: "en_lesson_5",
            unit: 5,
            title: "Şu Anda Olanlar & Şimdiki Zaman",
            subtitle: "Actions Happening Right Now",
            icon: "fa-clock",
            description: "Şu an gerçekleşen eylemleri Present Continuous Tense ile ifade et.",
            color: "#8b5cf6",
            questions: [
                {
                    type: "choice",
                    question: "'I am writing a computer program right now.' ne anlatır?",
                    phrase: "I am writing a computer program right now.",
                    options: ["Şu anda bir bilgisayar programı yazıyorum.", "Dün bir program yazdım.", "Yarın bilgisayar programı yazacağım.", "Program yazmayı severim."],
                    correct: 0,
                    explanation: "'am writing ... right now' şu anda sürmekte olan eylemi belirtir."
                },
                {
                    type: "fill_blank",
                    question: "Şimdiki zaman formülü: am/is/are + V(ing): 'She ______ listening to music.'",
                    sentence: "She ______ listening to music.",
                    options: ["is", "are", "am", "be"],
                    correct: 0,
                    explanation: "'She' öznesi için yardımcı fiil 'is' kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin eylemi seç:",
                    phrase: "They are studying",
                    options: ["They are studying", "They are sleeping", "They are walking", "They are eating"],
                    correct: 0,
                    explanation: "'They are studying' onlar ders çalışıyor demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Dışarıda yağmur yağıyor.' cümlesi hangisidir?",
                    options: ["It is raining outside.", "It rained yesterday.", "It always rains.", "It will rain tomorrow."],
                    correct: 0,
                    explanation: "Şu an yağan yağmur için 'It is raining outside' denir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur: 'Biz yeni bir dil öğreniyoruz.'",
                    words: ["are", "We", "learning", "language", "a", "new"],
                    correctOrder: ["We", "are", "learning", "a", "new", "language"],
                    translation: "Biz yeni bir dil öğreniyoruz."
                },
                {
                    type: "choice",
                    question: "'What are you doing at the moment?' sorusu ne demektir?",
                    phrase: "What are you doing at the moment?",
                    options: ["Şu anda ne yapıyorsun?", "Dün ne yaptın?", "Hafta sonu ne yapacaksın?", "Ne iş yapıyorsun?"],
                    correct: 0,
                    explanation: "'at the moment' şu anda demektir."
                },
                {
                    type: "fill_blank",
                    question: "Olumsuz şimdiki zaman: 'He is ______ working today.'",
                    sentence: "He is ______ working today.",
                    options: ["not", "no", "never", "don't"],
                    correct: 0,
                    explanation: "'is not' (isn't) ile olumsuz yapılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelime öbeğini seç:",
                    phrase: "Looking for keys",
                    options: ["Looking for keys", "Cooking in kitchen", "Playing games", "Reading books"],
                    correct: 0,
                    explanation: "'Looking for keys' anahtarları aramak demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Sen beni dinlemiyorsun.' nasıl ifade edilir?",
                    options: ["You are not listening to me.", "You do not hear me.", "You did not listen.", "You will not listen."],
                    correct: 0,
                    explanation: "'You are not listening to me' şimdiki zaman olumsuzdur."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini oluştur:",
                    words: ["she", "Is", "coming", "us", "with"],
                    correctOrder: ["Is", "she", "coming", "with", "us"],
                    translation: "O bizimle geliyor mu?"
                }
            ]
        },
        {
            id: "en_lesson_6",
            unit: 6,
            title: "Geçmiş Zamanın Anıları",
            subtitle: "Simple Past Tense & Memories",
            icon: "fa-landmark",
            description: "Dün, geçen yıl ve geçmişte olan olayları anlatmayı öğren.",
            color: "#ec4899",
            questions: [
                {
                    type: "choice",
                    question: "'We visited Paris last summer.' ne anlama gelir?",
                    phrase: "We visited Paris last summer.",
                    options: ["Geçen yaz Paris'i ziyaret ettik.", "Gelecek yaz Paris'e gideceğiz.", "Her yaz Paris'e gideriz.", "Şu an Paris'teyiz."],
                    correct: 0,
                    explanation: "'visited' (V2) ve 'last summer' geçmiş zamanı gösterir."
                },
                {
                    type: "fill_blank",
                    question: "Düzensiz fiil: 'Go' fiilinin geçmiş zaman (V2) hali nedir? 'Yesterday I ______ to school.'",
                    sentence: "Yesterday I ______ to school.",
                    options: ["went", "goed", "gone", "going"],
                    correct: 0,
                    explanation: "'Go' fiilinin 2. hali 'went' şeklindedir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin geçmiş zaman cümlesini seç:",
                    phrase: "I saw a great movie",
                    options: ["I saw a great movie", "I see a movie", "I will see a movie", "I am watching a movie"],
                    correct: 0,
                    explanation: "'I saw a great movie' harika bir film izledim / gördüm demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Dün bana telefon etmedi.' cümlesi hangisidir?",
                    options: ["He did not call me yesterday.", "He does not call me.", "He was not calling me.", "He won't call me."],
                    correct: 0,
                    explanation: "Simple Past olumsuzunda 'did not + V1' kullanılır."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["bought", "new", "car", "a", "They"],
                    correctOrder: ["They", "bought", "a", "new", "car"],
                    translation: "Onlar yeni bir araba satın aldılar."
                },
                {
                    type: "choice",
                    question: "'Did you finish your homework?' sorusu ne sorar?",
                    phrase: "Did you finish your homework?",
                    options: ["Ödevini bitirdin mi?", "Ödevini yapıyor musun?", "Ödevin ne zaman bitecek?", "Ödevin var mı?"],
                    correct: 0,
                    explanation: "'Did you finish' bitirdin mi anlamına gelir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'She ______ born in 1998.'",
                    sentence: "She ______ born in 1998.",
                    options: ["was", "were", "is", "did"],
                    correct: 0,
                    explanation: "Doğmak fiilinde geçmiş zaman için 'was/were born' kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Yesterday morning",
                    options: ["Yesterday morning", "Tomorrow night", "Today afternoon", "Last weekend"],
                    correct: 0,
                    explanation: "'Yesterday morning' dün sabah anlamına gelir."
                },
                {
                    type: "reverse_choice",
                    question: "'Anahtarlarımı kaybettim.' nasıl denir?",
                    options: ["I lost my keys.", "I lose my keys.", "I am losing keys.", "I will lose keys."],
                    correct: 0,
                    explanation: "'Lose' fiilinin geçmiş hali 'lost' tur."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini kur:",
                    words: ["you", "Where", "yesterday", "were"],
                    correctOrder: ["Where", "were", "you", "yesterday"],
                    translation: "Dün neredeydin?"
                }
            ]
        },
        {
            id: "en_lesson_7",
            unit: 7,
            title: "Gelecek & Hayaller",
            subtitle: "Future: Will & Going To",
            icon: "fa-rocket",
            description: "Geleceğe dair planlar yap, tahminlerde bulun ve randevulaş.",
            color: "#3b82f6",
            questions: [
                {
                    type: "choice",
                    question: "'I will always support you.' ne demektir?",
                    phrase: "I will always support you.",
                    options: ["Seni her zaman destekleyeceğim.", "Seni her gün görüyorum.", "Beni desteklemelisin.", "Geçmişte seni destekledim."],
                    correct: 0,
                    explanation: "'will support' destekleyeceğim anlamına gelir."
                },
                {
                    type: "fill_blank",
                    question: "Kararlaştırılmış plan: 'We are ______ to travel to Italy next month.'",
                    sentence: "We are ______ to travel to Italy next month.",
                    options: ["going", "go", "will", "went"],
                    correct: 0,
                    explanation: "Önceden planlanmış gelecek eylemlerinde 'be going to' kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin gelecek zaman ifadesini seç:",
                    phrase: "Tomorrow is a new day",
                    options: ["Tomorrow is a new day", "Yesterday was great", "Today is sunny", "Next week begins"],
                    correct: 0,
                    explanation: "'Tomorrow is a new day' yarın yeni bir gündür demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Sana yardım edeceğim.' (anlık karar) nasıl söylenir?",
                    options: ["I will help you.", "I help you.", "I am helped.", "I helped you."],
                    correct: 0,
                    explanation: "Konuşma anında verilen yardım kararlarında 'will' kullanılır."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["rain", "It", "will", "tomorrow"],
                    correctOrder: ["It", "will", "rain", "tomorrow"],
                    translation: "Yarın yağmur yağacak."
                },
                {
                    type: "choice",
                    question: "'What are your plans for tonight?' sorusu ne sorar?",
                    phrase: "What are your plans for tonight?",
                    options: ["Bu akşam için planların neler?", "Dün akşam neredeydin?", "Akşamları ne yaparsın?", "Yemekte ne var?"],
                    correct: 0,
                    explanation: "'tonight' bu gece/bu akşam, 'plans' planlardır."
                },
                {
                    type: "fill_blank",
                    question: "Olumsuz gelecek zaman: 'I ______ not be late, I promise.'",
                    sentence: "I ______ not be late, I promise.",
                    options: ["will", "do", "did", "am"],
                    correct: 0,
                    explanation: "'will not' (won't) gelecek zamanda olumsuzluk bildirir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin geleceğe yönelik eylemi seç:",
                    phrase: "She is going to pass the exam",
                    options: ["She is going to pass the exam", "She passed the exam", "She takes the exam", "She failed the exam"],
                    correct: 0,
                    explanation: "'She is going to pass the exam' sınavı geçecek demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Gelecekte başarılı olacaksın.' cümlesi hangisidir?",
                    options: ["You will be successful in the future.", "You are success now.", "You were successful.", "You can success."],
                    correct: 0,
                    explanation: "'You will be successful' başarılı olacaksın demektir."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini oluştur:",
                    words: ["you", "call", "me", "Will", "later"],
                    correctOrder: ["Will", "you", "call", "me", "later"],
                    translation: "Beni daha sonra arayacak mısın?"
                }
            ]
        },
        {
            id: "en_lesson_8",
            unit: 8,
            title: "Yetenekler, Tavsiyeler & Kurallar",
            subtitle: "Modals: Can, Should & Must",
            icon: "fa-shield-halved",
            description: "Neler yapabildiğini söyle, tavsiyeler ver ve zorunlulukları belirt.",
            color: "#14b8a6",
            questions: [
                {
                    type: "choice",
                    question: "'You should drink more water.' ne ifade eder?",
                    phrase: "You should drink more water.",
                    options: ["Daha fazla su içmelisin (Tavsiye).", "Su içmek zorundasın (Ceza).", "Su içebilirsin (İzin).", "Dün çok su içtin."],
                    correct: 0,
                    explanation: "'Should' tavsiye ve öneri bildirir."
                },
                {
                    type: "fill_blank",
                    question: "Yetenek bildiren modal: 'She ______ speak three languages fluently.'",
                    sentence: "She ______ speak three languages fluently.",
                    options: ["can", "must", "should", "ought"],
                    correct: 0,
                    explanation: "Yetenek bildirirken 'can' kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin zorunluluk ifadesini seç:",
                    phrase: "You must stop here",
                    options: ["You must stop here", "You can go now", "You should wait", "You might arrive"],
                    correct: 0,
                    explanation: "'You must stop here' burada durmak zorundasın anlamına gelir."
                },
                {
                    type: "reverse_choice",
                    question: "'Burada sigara içemezsiniz (Yasak).' nasıl denir?",
                    options: ["You cannot smoke here.", "You should smoke here.", "You can smoke here.", "You will smoke here."],
                    correct: 0,
                    explanation: "Yasak ve izin yokluğu için 'cannot / mustn't' kullanılır."
                },
                {
                    type: "word_order",
                    question: "Tavsiye cümlesini oluştur:",
                    words: ["doctor", "see", "You", "should", "a"],
                    correctOrder: ["You", "should", "see", "a", "doctor"],
                    translation: "Bir doktora görünmelisin."
                },
                {
                    type: "choice",
                    question: "'Could you please open the window?' cümlesi ne bildirir?",
                    phrase: "Could you please open the window?",
                    options: ["Kibar bir rica (Pencereyi açabilir misiniz?)", "Geçmiş zaman (Pencereyi açtın mı?)", "Zorunluluk (Pencereyi açmalısın)", "Tahmin (Pencere açılabilir)"],
                    correct: 0,
                    explanation: "'Could you please...' çok kibar bir rica kalıbıdır."
                },
                {
                    type: "fill_blank",
                    question: "İhtimal bildiren modal: 'Take an umbrella, it ______ rain.'",
                    sentence: "Take an umbrella, it ______ rain.",
                    options: ["might", "must", "can't", "have to"],
                    correct: 0,
                    explanation: "'might' düşük/orta ihtimal bildirir (yağabilir)."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "I can swim very well",
                    options: ["I can swim very well", "I cannot run fast", "I must sleep now", "I should study hard"],
                    correct: 0,
                    explanation: "'I can swim very well' çok iyi yüzebilirim demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Erken kalkmak zorundayım.' nasıl söylenir?",
                    options: ["I have to get up early.", "I can get up early.", "I may get up early.", "I wouldn't get up."],
                    correct: 0,
                    explanation: "Dışsal zorunluluklarda 'have to' kullanılır."
                },
                {
                    type: "word_order",
                    question: "İzin isteyen soru cümlesini kur:",
                    words: ["in", "come", "I", "May"],
                    correctOrder: ["May", "I", "come", "in"],
                    translation: "İçeri girebilir miyim?"
                }
            ]
        },
        {
            id: "en_lesson_9",
            unit: 9,
            title: "İş Dünyası & İletişim",
            subtitle: "Work, Office & Professional Skills",
            icon: "fa-briefcase",
            description: "İş yerinde iletişim kur, toplantılara katıl ve profesyonel terimleri kavra.",
            color: "#64748b",
            questions: [
                {
                    type: "choice",
                    question: "'We have an important meeting at 2 PM.' ne anlama gelir?",
                    phrase: "We have an important meeting at 2 PM.",
                    options: ["Saat 14:00'te önemli bir toplantımız var.", "Saat 2'de öğle yemeği yiyeceğiz.", "Toplantı saat 2'de iptal oldu.", "Önemli bir rapor hazırladım."],
                    correct: 0,
                    explanation: "'important meeting' önemli toplantı demektir."
                },
                {
                    type: "fill_blank",
                    question: "İş e-postalarında: 'Please find the attached ______.'",
                    sentence: "Please find the attached ______.",
                    options: ["file", "food", "table", "chair"],
                    correct: 0,
                    explanation: "'attached file' ekteki dosya anlamına gelir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin mesleki ifadeyi seç:",
                    phrase: "Team project",
                    options: ["Team project", "Vacation plan", "Coffee break", "Movie night"],
                    correct: 0,
                    explanation: "'Team project' takım / ekip projesi demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Raporu yarın göndereceğim.' cümlesi hangisidir?",
                    options: ["I will send the report tomorrow.", "I wrote the report yesterday.", "I read the report now.", "I delete the report."],
                    correct: 0,
                    explanation: "'send the report tomorrow' raporu yarın göndereceğim."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["works", "company", "in", "He", "a", "global"],
                    correctOrder: ["He", "works", "in", "a", "global", "company"],
                    translation: "O küresel bir şirkette çalışıyor."
                },
                {
                    type: "choice",
                    question: "'Deadline' iş hayatında neyi ifade eder?",
                    phrase: "What is the project deadline?",
                    options: ["Son teslim tarihi", "Toplantı odası", "Maaş günü", "İş mülakatı"],
                    correct: 0,
                    explanation: "'Deadline' bir işin teslim edilmesi gereken son süredir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'Could you give me some ______ on this design?' (Geri bildirim)",
                    sentence: "Could you give me some ______ on this design?",
                    options: ["feedback", "food", "sleep", "trouble"],
                    correct: 0,
                    explanation: "'feedback' geri bildirim / dönüt demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin terimi seç:",
                    phrase: "Customer satisfaction",
                    options: ["Customer satisfaction", "Company policy", "Employee discount", "Business strategy"],
                    correct: 0,
                    explanation: "'Customer satisfaction' müşteri memnuniyeti demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Sorularınız için teşekkür ederim.' ifadesi hangisidir?",
                    options: ["Thank you for your questions.", "Please ask no questions.", "I have no answers.", "Goodbye everyone."],
                    correct: 0,
                    explanation: "Sunum sonlarında 'Thank you for your questions' denir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur:",
                    words: ["success", "We", "achieved", "great"],
                    correctOrder: ["We", "achieved", "great", "success"],
                    translation: "Büyük bir başarı elde ettik."
                }
            ]
        },
        {
            id: "en_lesson_10",
            unit: 10,
            title: "Deneyimler & Usta Dilbilgisi",
            subtitle: "Present Perfect & Language Mastery",
            icon: "fa-trophy",
            description: "Hayat deneyimlerini 'Have you ever...' ile paylaş ve zirveye ulaş!",
            color: "#eab308",
            questions: [
                {
                    type: "choice",
                    question: "'Have you ever been to Rome?' sorusu ne sorar?",
                    phrase: "Have you ever been to Rome?",
                    options: ["Hiç Roma'da bulundun mu?", "Roma'ya ne zaman gideceksin?", "Roma'yı seviyor musun?", "Roma nerede?"],
                    correct: 0,
                    explanation: "'Have you ever been to...' hayat boyu deneyim sorar: 'Hiç bulundun mu?'."
                },
                {
                    type: "fill_blank",
                    question: "Present Perfect formülü: have/has + V3: 'She has ______ lived in London.'",
                    sentence: "She has ______ lived in London.",
                    options: ["always", "yesterday", "last year", "ago"],
                    correct: 0,
                    explanation: "Present Perfect ile 'always', 'never', 'already' gibi zaman zarfları kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "I have finished my work",
                    options: ["I have finished my work", "I finish my work", "I will finish my work", "I was finishing my work"],
                    correct: 0,
                    explanation: "'I have finished my work' işimi bitirdim (etkisi şimdi hissediliyor) demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'O raporu henüz teslim etmedi.' cümlesi hangisidir?",
                    options: ["She has not submitted the report yet.", "She does not submit reports.", "She submitted yesterday.", "She will submit soon."],
                    correct: 0,
                    explanation: "'yet' henüz anlamına gelir ve Present Perfect olumsuz cümlelerin sonunda kullanılır."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["known", "each", "have", "We", "other", "for", "years"],
                    correctOrder: ["We", "have", "known", "each", "other", "for", "years"],
                    translation: "Biz birbirimizi yıllardır tanıyoruz."
                },
                {
                    type: "choice",
                    question: "'I have already seen this movie.' ne anlatır?",
                    phrase: "I have already seen this movie.",
                    options: ["Bu filmi zaten çoktan izledim.", "Bu filmi henüz izlemedim.", "Bu filmi yarın izleyeceğim.", "Bu filmi hiç sevmedim."],
                    correct: 0,
                    explanation: "'already' çoktan, zaten anlamına gelir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'How ______ have you lived here?' (Süre sorusu)",
                    sentence: "How ______ have you lived here?",
                    options: ["long", "many", "much", "often"],
                    correct: 0,
                    explanation: "'How long' ne kadar süredir sorusudur."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Achievement",
                    options: ["Achievement", "Adventure", "Appointment", "Accident"],
                    correct: 0,
                    explanation: "'Achievement' başarı / kazanım anlamına gelir."
                },
                {
                    type: "reverse_choice",
                    question: "'İngilizce seviyemi geliştirdim.' ifadesi hangisidir?",
                    options: ["I have improved my English skills.", "I forget English words.", "I don't study English.", "English is hard."],
                    correct: 0,
                    explanation: "'improved' geliştirmek demektir."
                },
                {
                    type: "word_order",
                    question: "Zafer cümlesini doğru kur:",
                    words: ["course", "completed", "have", "I", "this"],
                    correctOrder: ["I", "have", "completed", "this", "course"],
                    translation: "Bu kursu tamamladım!"
                }
            ]
        }
    ],

    // ======================================================================
    // GERMAN (ALMANCA) LESSONS DATABASE
    // ======================================================================
    de: [
        {
            id: "de_lesson_1",
            unit: 1,
            title: "Begrüßung & Artikel (der/die/das)",
            subtitle: "Selamlaşma, Tanışma & Artikeller",
            icon: "fa-hand-wave",
            description: "Almancanın temeli: Hallo de, artikelleri tanı ve kendini tanıt.",
            color: "#6366f1",
            questions: [
                {
                    type: "choice",
                    question: "'Guten Tag, wie geht es Ihnen?' cümlesi ne anlama gelir?",
                    phrase: "Guten Tag, wie geht es Ihnen?",
                    options: ["İyi günler, nasılsınız? (Kibar)", "Günaydın, neredesin?", "İyi akşamlar, kimsin?", "Görüşürüz, kendine iyi bak."],
                    correct: 0,
                    explanation: "'Guten Tag' iyi günler, 'wie geht es Ihnen' nasılsınız (saygı formu) demektir."
                },
                {
                    type: "fill_blank",
                    question: "Almanca erkek cins artikel: '______ Mann liest ein Buch.'",
                    sentence: "______ Mann liest ein Buch.",
                    options: ["Der", "Die", "Das", "Den"],
                    correct: 0,
                    explanation: "'Mann' (adam) kelimesinin artikeli 'der'dir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin nezaket kelimesini seç:",
                    phrase: "Dankeschön",
                    options: ["Dankeschön", "Bitteschön", "Auf Wiedersehen", "Entschuldigung"],
                    correct: 0,
                    explanation: "'Dankeschön' çok teşekkür ederim demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Benim adım ...' Almanca nasıl söylenir?",
                    options: ["Ich heiße...", "Ich komme aus...", "Ich wohne in...", "Wie bitte?"],
                    correct: 0,
                    explanation: "'Ich heiße...' benim adım anlamına gelir."
                },
                {
                    type: "word_order",
                    question: "Kelimeleri doğru sıraya diz:",
                    words: ["Morgen", "Guten", "Herr", "Müller"],
                    correctOrder: ["Guten", "Morgen", "Herr", "Müller"],
                    translation: "Günaydın Bay Müller."
                },
                {
                    type: "choice",
                    question: "'Auf Wiedersehen!' vedası ne demektir?",
                    phrase: "Auf Wiedersehen!",
                    options: ["Tekrar görüşmek üzere / Hoşça kalın!", "Lütfen rica ederim!", "Gününüz güzel geçsin!", "Afiyet olsun!"],
                    correct: 0,
                    explanation: "'Auf Wiedersehen' tekrar görüşmek üzere / hoşça kalın demektir."
                },
                {
                    type: "fill_blank",
                    question: "Dişil artikel (kadın/dişi): '______ Frau arbeitet im Büro.'",
                    sentence: "______ Frau arbeitet im Büro.",
                    options: ["Die", "Der", "Das", "Dem"],
                    correct: 0,
                    explanation: "'Frau' (kadın) kelimesinin artikeli 'die'dir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "Ich komme aus der Türkei",
                    options: ["Ich komme aus der Türkei", "Ich lebe in Berlin", "Ich lerne Deutsch", "Ich spreche Englisch"],
                    correct: 0,
                    explanation: "'Ich komme aus der Türkei' Türkiye'den geliyorum demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Nötr artikel' (Das) ile kullanılan kelime hangisidir?",
                    options: ["das Kind (çocuk)", "der Hund (köpek)", "die Katze (kedi)", "der Tisch (masa)"],
                    correct: 0,
                    explanation: "'Kind' nötrdür ve 'das Kind' olarak kullanılır."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["sehr", "Es", "freut", "mich"],
                    correctOrder: ["Es", "freut", "mich"],
                    translation: "Tanıştığıma memnun oldum."
                }
            ]
        },
        {
            id: "de_lesson_2",
            unit: 2,
            title: "Im Restaurant & Essen",
            subtitle: "Yiyecekler, İçecekler & Sipariş",
            icon: "fa-utensils",
            description: "Alman restoranında menü iste, sipariş ver ve hesap öde.",
            color: "#f59e0b",
            questions: [
                {
                    type: "choice",
                    question: "'Ich möchte bitte einen Kaffee.' ne demektir?",
                    phrase: "Ich möchte bitte einen Kaffee.",
                    options: ["Lütfen bir kahve rica ediyorum.", "Bir bardak su istiyorum.", "Kahve sevmiyorum.", "Hesap lütfen."],
                    correct: 0,
                    explanation: "'Ich möchte' rica ediyorum / istiyorum, 'einen Kaffee' bir kahvedir."
                },
                {
                    type: "fill_blank",
                    question: "Hesap isterken: 'Die ______, bitte!' (Hesap lütfen)",
                    sentence: "Die ______, bitte!",
                    options: ["Rechnung", "Karte", "Suppe", "Gabel"],
                    correct: 0,
                    explanation: "'Die Rechnung, bitte' hesap lütfen demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Guten Appetit",
                    options: ["Guten Appetit", "Gute Reise", "Gute Nacht", "Guten Morgen"],
                    correct: 0,
                    explanation: "'Guten Appetit' afiyet olsun demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Su içer misiniz?' Almanca nasıl sorulur?",
                    options: ["Möchten Sie etwas Wasser trinken?", "Essen Sie Pizza?", "Haben Sie Hunger?", "Wo ist das Café?"],
                    correct: 0,
                    explanation: "'Möchten Sie... trinken?' içmek ister misiniz sorusudur."
                },
                {
                    type: "word_order",
                    question: "Siparişi sıraya diz:",
                    words: ["bitte", "Ein", "Glas", "Wasser"],
                    correctOrder: ["Ein", "Glas", "Wasser", "bitte"],
                    translation: "Bir bardak su lütfen."
                },
                {
                    type: "choice",
                    question: "'Das Essen schmeckt sehr lecker!' ne anlama gelir?",
                    phrase: "Das Essen schmeckt sehr lecker!",
                    options: ["Yemek çok lezzetli!", "Yemek çok soğuk.", "Yemek henüz gelmedi.", "Yemek çok pahalı."],
                    correct: 0,
                    explanation: "'schmeckt sehr lecker' çok lezzetli anlamına gelir."
                },
                {
                    type: "fill_blank",
                    question: "Garson sorar: 'Zusammen oder ______?' (Birlikte mi ayrı mı?)",
                    sentence: "Zusammen oder ______?",
                    options: ["getrennt", "warm", "kalt", "schnell"],
                    correct: 0,
                    explanation: "Almanya'da hesap öderken 'getrennt' (ayrı ayrı) sıkça kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin yiyecek adını seç:",
                    phrase: "Frisches Brot",
                    options: ["Frisches Brot", "Kalter Tee", "Grüner Apfel", "Süße Schokolade"],
                    correct: 0,
                    explanation: "'Frisches Brot' taze ekmek demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Kredi kartıyla ödeyebilir miyim?' cümlesi hangisidir?",
                    options: ["Kann ich mit Karte zahlen?", "Haben Sie Bargeld?", "Kostet das viel?", "Wo ist der Kellner?"],
                    correct: 0,
                    explanation: "'mit Karte zahlen' kartla ödemek demektir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["hat", "gut", "Es", "geschmeckt"],
                    correctOrder: ["Es", "hat", "gut", "geschmeckt"],
                    translation: "Tadı çok güzeldi."
                }
            ]
        },
        {
            id: "de_lesson_3",
            unit: 3,
            title: "Alltag & Verben (Geniş Zaman)",
            subtitle: "Günlük Rutinler & Düzenli Fiiller",
            icon: "fa-sun",
            description: "Fiil çekimlerini (ich -e, du -st, er/sie -t) ve günlük aktiviteleri öğren.",
            color: "#06b6d4",
            questions: [
                {
                    type: "choice",
                    question: "'Ich lerne jeden Tag Deutsch.' cümlesinin anlamı nedir?",
                    phrase: "Ich lerne jeden Tag Deutsch.",
                    options: ["Her gün Almanca öğreniyorum / çalışıyorum.", "Dün Almanca konuştum.", "Yarın Almanca sınavım var.", "Almanca zor bir dildir."],
                    correct: 0,
                    explanation: "'jeden Tag' her gün, 'lernen' öğrenmek/çalışmaktır."
                },
                {
                    type: "fill_blank",
                    question: "'Du' öznesi için fiil çekimi: 'Du ______ sehr gut Fußball.' (spielen)",
                    sentence: "Du ______ sehr gut Fußball.",
                    options: ["spielst", "spielt", "spiele", "spielen"],
                    correct: 0,
                    explanation: "Almancada 'du' şahsı fiil köküne '-st' takısı alır: 'spielst'."
                },
                {
                    type: "listen",
                    question: "Dinlediğin eylemi seç:",
                    phrase: "Früh aufstehen",
                    options: ["Früh aufstehen", "Spät schlafen", "Musik hören", "Buch lesen"],
                    correct: 0,
                    explanation: "'Früh aufstehen' erken kalkmak demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'O Berlin'de yaşıyor.' cümlesi hangisidir?",
                    options: ["Er wohnt in Berlin.", "Er kommt nach Berlin.", "Er fährt mit dem Bus.", "Er arbeitet gern."],
                    correct: 0,
                    explanation: "'wohnen' ikamet etmek/yaşamak fiilidir: 'Er wohnt in Berlin'."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur: 'Biz müzik dinliyoruz.'",
                    words: ["hören", "Wir", "Musik", "gern"],
                    correctOrder: ["Wir", "hören", "gern", "Musik"],
                    translation: "Severek müzik dinliyoruz."
                },
                {
                    type: "choice",
                    question: "'Um wie viel Uhr stehst du auf?' ne demektir?",
                    phrase: "Um wie viel Uhr stehst du auf?",
                    options: ["Saat kaçta kalkarsın?", "Nereye gidiyorsun?", "Ne zaman uyursun?", "Hangi gün buluşuyoruz?"],
                    correct: 0,
                    explanation: "'Um wie viel Uhr' saat kaçta, 'aufstehen' kalkmaktır."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'Sie (onlar) ______ im Park spazieren.'",
                    sentence: "Sie ______ im Park spazieren.",
                    options: ["gehen", "geht", "gehe", "gehst"],
                    correct: 0,
                    explanation: "'Sie' (onlar) çoğul çekiminde fiil mastar halini alır: 'gehen'."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Manchmal",
                    options: ["Manchmal", "Immer", "Nie", "Oft"],
                    correct: 0,
                    explanation: "'Manchmal' bazen anlamına gelir."
                },
                {
                    type: "reverse_choice",
                    question: "'Asla geç kalmam.' ifadesi hangisidir?",
                    options: ["Ich komme nie zu spät.", "Ich bin immer pünktlich.", "Ich habe keine Zeit.", "Ich fahre schnell."],
                    correct: 0,
                    explanation: "'nie zu spät' asla geç kalmam demektir."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini sıraya diz:",
                    words: ["du", "Trinkst", "Tee", "morgens"],
                    correctOrder: ["Trinkst", "du", "morgens", "Tee"],
                    translation: "Sabahları çay içer misin?"
                }
            ]
        },
        {
            id: "de_lesson_4",
            unit: 4,
            title: "Unterwegs, Flughafen & Reisen",
            subtitle: "Seyahat, Ulaşım & Yön Bulma",
            icon: "fa-plane-departure",
            description: "Havalimanında, trende ve şehirde yönünü kolayca bul.",
            color: "#10b981",
            questions: [
                {
                    type: "choice",
                    question: "'Wo ist der nächste Bahnhof?' ne sorar?",
                    phrase: "Wo ist der nächste Bahnhof?",
                    options: ["En yakın tren istasyonu nerede?", "Tren ne zaman hareket ediyor?", "Bilet ne kadar?", "Hangi peron?"],
                    correct: 0,
                    explanation: "'der Bahnhof' tren istasyonu, 'der nächste' en yakındır."
                },
                {
                    type: "fill_blank",
                    question: "Havalimanında: 'Das ______ fliegt über die Wolken.' (Uçak)",
                    sentence: "Das ______ fliegt über die Wolken.",
                    options: ["Flugzeug", "Auto", "Fahrrad", "Schiff"],
                    correct: 0,
                    explanation: "'das Flugzeug' uçak anlamına gelir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin seyahat terimini seç:",
                    phrase: "Der Reisepass",
                    options: ["Der Reisepass", "Die Fahrkarte", "Der Koffer", "Das Hotel"],
                    correct: 0,
                    explanation: "'Der Reisepass' pasaport demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'İyi yolculuklar!' Almanca nasıl denir?",
                    options: ["Gute Reise!", "Guten Abend!", "Herzlichen Glückwunsch!", "Viel Spaß!"],
                    correct: 0,
                    explanation: "'Gute Reise!' iyi yolculuklar anlamına gelir."
                },
                {
                    type: "word_order",
                    question: "Yön tarifini sıraya diz:",
                    words: ["Sie", "Gehen", "geradeaus"],
                    correctOrder: ["Gehen", "Sie", "geradeaus"],
                    translation: "Düz gidiniz."
                },
                {
                    type: "choice",
                    question: "'Ein Ticket nach München, bitte.' ne anlama gelir?",
                    phrase: "Ein Ticket nach München, bitte.",
                    options: ["Münih'e bir bilet lütfen.", "Münih nerede?", "Münih treni kaçta?", "Münih'te otel var mı?"],
                    correct: 0,
                    explanation: "'Ein Ticket nach...' bir yere bilet istemektir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'Biegen Sie nach ______ ab.' (Sağa dönünüz)",
                    sentence: "Biegen Sie nach ______ ab.",
                    options: ["rechts", "links", "oben", "unten"],
                    correct: 0,
                    explanation: "'nach rechts' sağa, 'nach links' sola demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Der Koffer ist schwer",
                    options: ["Der Koffer ist schwer", "Die Tasche ist klein", "Das Hotel ist nah", "Der Zug kommt"],
                    correct: 0,
                    explanation: "'Der Koffer ist schwer' bavul ağır demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Pardon, bana yardım edebilir misiniz?' hangisidir?",
                    options: ["Entschuldigung, können Sie mir helfen?", "Wo sind Sie?", "Wer spricht da?", "Ich weiß nicht."],
                    correct: 0,
                    explanation: "'Können Sie mir helfen?' bana yardım edebilir misiniz sorusudur."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["Gleis", "Der", "fährt", "Zug", "auf", "4"],
                    correctOrder: ["Der", "Zug", "fährt", "auf", "Gleis", "4"],
                    translation: "Tren 4. perondan kalkıyor."
                }
            ]
        },
        {
            id: "de_lesson_5",
            unit: 5,
            title: "Modalverben: Können, Müssen, Wollen",
            subtitle: "Modal Fiiller & Yetenekler",
            icon: "fa-shield-halved",
            description: "Almanca modal fiillerle yapabilmeyi, zorunluluğu ve istekleri anlat.",
            color: "#8b5cf6",
            questions: [
                {
                    type: "choice",
                    question: "'Ich kann Deutsch sprechen.' ne ifade eder?",
                    phrase: "Ich kann Deutsch sprechen.",
                    options: ["Almanca konuşabiliyorum (Yetenek).", "Almanca konuşmalıyım (Zorunluluk).", "Almanca konuşmak istiyorum (İstek).", "Dün Almanca konuştum."],
                    correct: 0,
                    explanation: "'können' yetenek bildirir: 'Ich kann sprechen'."
                },
                {
                    type: "fill_blank",
                    question: "Zorunluluk fiili 'müssen': 'Er ______ heute lange arbeiten.'",
                    sentence: "Er ______ heute lange arbeiten.",
                    options: ["muss", "müsst", "müssen", "musst"],
                    correct: 0,
                    explanation: "'Er' için 'müssen' çekimi 'muss' şeklindedir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin isteği seç:",
                    phrase: "Ich will eine Pause machen",
                    options: ["Ich will eine Pause machen", "Ich muss jetzt gehen", "Ich kann schnell laufen", "Ich darf hier bleiben"],
                    correct: 0,
                    explanation: "'Ich will eine Pause machen' mola vermek istiyorum demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Burada park edemezsiniz (Yasak).' nasıl denir?",
                    options: ["Hier darf man nicht parken.", "Hier kann man schlafen.", "Hier muss man fahren.", "Hier will niemand sein."],
                    correct: 0,
                    explanation: "Yasak bildiren 'dürfen nicht' modal fiilidir."
                },
                {
                    type: "word_order",
                    question: "Modal fiil kuralı (asıl fiil en sonda mastar kalır):",
                    words: ["schwimmen", "gut", "kann", "Sie"],
                    correctOrder: ["Sie", "kann", "gut", "schwimmen"],
                    translation: "O iyi yüzebilir."
                },
                {
                    type: "choice",
                    question: "'Du solltest mehr schlafen.' cümlesi ne bildirir?",
                    phrase: "Du solltest mehr schlafen.",
                    options: ["Daha çok uyumalısın (Tavsiye / Öneri).", "Uyumak zorundasın.", "Uyuyamazsın.", "Uyumak istemiyorsun."],
                    correct: 0,
                    explanation: "'sollten' kibar tavsiye bildirir (İngilizce 'should' gibi)."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'Wir ______ ins Kino gehen.' (İstiyoruz)",
                    sentence: "Wir ______ ins Kino gehen.",
                    options: ["wollen", "will", "willst", "wollt"],
                    correct: 0,
                    explanation: "'Wir' öznesi için 'wollen' fiili mastar şeklinde kalır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "Darf ich eine Frage stellen?",
                    options: ["Darf ich eine Frage stellen?", "Habe ich eine Antwort?", "Muss ich jetzt lernen?", "Will ich das kaufen?"],
                    correct: 0,
                    explanation: "'Darf ich eine Frage stellen?' bir soru sorabilir miyim demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Erken kalkmak zorundayım.' ifadesi hangisidir?",
                    options: ["Ich muss früh aufstehen.", "Ich will früh aufstehen.", "Ich darf früh aufstehen.", "Ich mag aufstehen."],
                    correct: 0,
                    explanation: "'müssen' zorunluluk bildirir."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini kur:",
                    words: ["du", "helfen", "mir", "Kannst"],
                    correctOrder: ["Kannst", "du", "mir", "helfen"],
                    translation: "Bana yardım edebilir misin?"
                }
            ]
        },
        {
            id: "de_lesson_6",
            unit: 6,
            title: "Perfekt & Vergangenheit",
            subtitle: "Geçmiş Zaman (haben / sein + Partizip II)",
            icon: "fa-landmark",
            description: "Almanca günlük konuşmada geçmişi anlatmanın anahtarı: Das Perfekt.",
            color: "#ec4899",
            questions: [
                {
                    type: "choice",
                    question: "'Ich habe gestern ein Buch gekauft.' ne anlatır?",
                    phrase: "Ich habe gestern ein Buch gekauft.",
                    options: ["Dün bir kitap satın aldım.", "Yarın kitap alacağım.", "Her gün kitap okurum.", "Kitapları severim."],
                    correct: 0,
                    explanation: "'habe gekauft' satın aldım demektir (Perfekt geçmiş zaman)."
                },
                {
                    type: "fill_blank",
                    question: "Hareket bildiren fiillerde yardımcı fiil 'sein' olur: 'Wir ______ nach Berlin gefahren.'",
                    sentence: "Wir ______ nach Berlin gefahren.",
                    options: ["sind", "haben", "waren", "hatten"],
                    correct: 0,
                    explanation: "Yer değiştirme ve hareket bildiren 'fahren' fiilinde 'sein' (sind) kullanılır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin geçmiş zaman cümlesini seç:",
                    phrase: "Was hast du gemacht?",
                    options: ["Was hast du gemacht?", "Was machst du jetzt?", "Was wirst du machen?", "Was willst du machen?"],
                    correct: 0,
                    explanation: "'Was hast du gemacht?' ne yaptın demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'İyi uyudum.' cümlesi hangisidir?",
                    options: ["Ich habe gut geschlafen.", "Ich schlafe gut.", "Ich werde schlafen.", "Ich muss schlafen."],
                    correct: 0,
                    explanation: "'schlafen' fiilinin Perfekt hali: 'habe geschlafen'."
                },
                {
                    type: "word_order",
                    question: "Perfekt cümlesini sıraya diz (Partizip II sonda):",
                    words: ["gesehen", "einen", "Film", "Er", "hat"],
                    correctOrder: ["Er", "hat", "einen", "Film", "gesehen"],
                    translation: "O bir film izledi."
                },
                {
                    type: "choice",
                    question: "'Sie ist gestern spät angekommen.' cümlesi ne anlama gelir?",
                    phrase: "Sie ist gestern spät angekommen.",
                    options: ["O dün geç vardı / ulaştı.", "O bugün gelecek.", "O her gün erken gelir.", "O hiç gelmedi."],
                    correct: 0,
                    explanation: "'ankommen' varmak/ulaşmaktır ve 'ist angekommen' şeklinde çekimlenir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'Ich habe meine Hausaufgaben ______.' (yapmak)",
                    sentence: "Ich habe meine Hausaufgaben ______.",
                    options: ["gemacht", "machen", "mache", "gemachte"],
                    correct: 0,
                    explanation: "'machen' fiilinin 3. hali 'gemacht'tır."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "Wir haben viel gelacht",
                    options: ["Wir haben viel gelacht", "Wir haben viel gegessen", "Wir haben viel gelernt", "Wir haben viel gearbeitet"],
                    correct: 0,
                    explanation: "'Wir haben viel gelacht' çok güldük demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Kayıp anahtarımı buldum.' nasıl denir?",
                    options: ["Ich habe meinen Schlüssel gefunden.", "Ich suche den Schlüssel.", "Ich verliere alles.", "Wo ist der Schlüssel?"],
                    correct: 0,
                    explanation: "'finden' fiilinin Perfekt hali 'habe gefunden'dur."
                },
                {
                    type: "word_order",
                    question: "Soru cümlesini oluştur:",
                    words: ["verstanden", "du", "das", "Hast"],
                    correctOrder: ["Hast", "du", "das", "verstanden"],
                    translation: "Bunu anladın mı?"
                }
            ]
        },
        {
            id: "de_lesson_7",
            unit: 7,
            title: "Beruf, Arbeit & Karriere",
            subtitle: "Meslekler & İş Hayatı",
            icon: "fa-briefcase",
            description: "İş dünyası, unvanlar, ofis terimleri ve kariyer hedefleri.",
            color: "#64748b",
            questions: [
                {
                    type: "choice",
                    question: "'Was sind Sie von Beruf?' ne sorar?",
                    phrase: "Was sind Sie von Beruf?",
                    options: ["Mesleğiniz nedir?", "Nerede oturuyorsunuz?", "Kaç yaşındasınız?", "Ne zaman mezun oldunuz?"],
                    correct: 0,
                    explanation: "'von Beruf' meslek sorusudur."
                },
                {
                    type: "fill_blank",
                    question: "Kadın doktor için sonuna '-in' eklenir: 'Sie ist ______.'",
                    sentence: "Sie ist ______.",
                    options: ["Ärztin", "Arzt", "Lehrer", "Ingenieur"],
                    correct: 0,
                    explanation: "Almancada kadın meslek sahiplerine '-in' eki gelir: 'Ärztin'."
                },
                {
                    type: "listen",
                    question: "Dinlediğin mesleki ifadeyi seç:",
                    phrase: "Das Vorstellungsgespräch",
                    options: ["Das Vorstellungsgespräch", "Der Feierabend", "Die Mittagspause", "Der Arbeitsvertrag"],
                    correct: 0,
                    explanation: "'Das Vorstellungsgespräch' iş mülakatı / görüşmesi demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Büyük bir şirkette çalışıyorum.' cümlesi hangisidir?",
                    options: ["Ich arbeite bei einer großen Firma.", "Ich suche eine neue Wohnung.", "Ich kaufe viele Sachen.", "Ich lerne eine Sprache."],
                    correct: 0,
                    explanation: "'arbeiten bei...' bir firmada çalışmaktır."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["Termin", "einen", "haben", "Wir", "morgen"],
                    correctOrder: ["Wir", "haben", "morgen", "einen", "Termin"],
                    translation: "Yarın bir randevumuz var."
                },
                {
                    type: "choice",
                    question: "'Feierabend' Alman kültüründe neyi ifade eder?",
                    phrase: "Endlich Feierabend!",
                    options: ["Mesai bitişi ve akşam dinlenme zamanı", "Öğle molası", "Haftalık izin", "Bayram kutlaması"],
                    correct: 0,
                    explanation: "'Feierabend' günün işinin bitip serbest zamanın başlamasıdır."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu tamamla: 'Ich sende Ihnen die Datei per ______.'",
                    sentence: "Ich sende Ihnen die Datei per ______.",
                    options: ["E-Mail", "Postkarte", "Telefon", "Radio"],
                    correct: 0,
                    explanation: "'per E-Mail' e-posta yoluyla demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kelimeyi seç:",
                    phrase: "Die Teamarbeit",
                    options: ["Die Teamarbeit", "Die Einzelarbeit", "Die Hausaufgabe", "Die Pause"],
                    correct: 0,
                    explanation: "'Die Teamarbeit' ekip çalışması demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'İş arkadaşım çok yardımsever.' nasıl söylenir?",
                    options: ["Mein Kollege ist sehr hilfsbereit.", "Mein Chef ist streng.", "Mein Büro ist weit.", "Mein Job ist langweilig."],
                    correct: 0,
                    explanation: "'hilfsbereit' yardımsever demektir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur:",
                    words: ["Erfolg", "großen", "Wir", "feiern"],
                    correctOrder: ["Wir", "feiern", "großen", "Erfolg"],
                    translation: "Büyük bir başarıyı kutluyoruz."
                }
            ]
        },
        {
            id: "de_lesson_8",
            unit: 8,
            title: "Meisterschaft & Zukunft (Zirve)",
            subtitle: "Futur I, Deyimler & İleri Almanca",
            icon: "fa-trophy",
            description: "Almanca serüveninin zirvesi: Akıcı cümleler ve geleceğe güvenle bakış.",
            color: "#eab308",
            questions: [
                {
                    type: "choice",
                    question: "'Übung macht den Meister!' atasözü ne anlatır?",
                    phrase: "Übung macht den Meister!",
                    options: ["İşleyen demir ışıldar / Pratik mükemmelleştirir!", "Acele işe şeytan karışır.", "Damlaya damlaya göl olur.", "Vakit nakittir."],
                    correct: 0,
                    explanation: "'Übung macht den Meister' pratik insanı usta yapar demektir."
                },
                {
                    type: "fill_blank",
                    question: "Almanca gelecek zaman (Futur I): werden + Infinitiv: 'Ich ______ morgen fleißig lernen.'",
                    sentence: "Ich ______ morgen fleißig lernen.",
                    options: ["werde", "wird", "werden", "werdet"],
                    correct: 0,
                    explanation: "'Ich werde... lernen' gelecekte çalışacağım anlamına gelir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin motivasyon sözünü seç:",
                    phrase: "Du schaffst das!",
                    options: ["Du schaffst das!", "Gib jetzt auf!", "Lass das sein!", "Komm nicht wieder!"],
                    correct: 0,
                    explanation: "'Du schaffst das!' bunu başarırsın / yapabilirsin demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Almanca konuşurken kendime güveniyorum.' ifadesi hangisidir?",
                    options: ["Ich fühle mich sicher beim Deutschsprechen.", "Ich habe Angst vor Fehlern.", "Ich verstehe kein Wort.", "Deutsch ist unmöglich."],
                    correct: 0,
                    explanation: "'sicher fühlen' güvende / özgüvenli hissetmektir."
                },
                {
                    type: "word_order",
                    question: "Gelecek zaman cümlesini diz:",
                    words: ["erreichen", "Ziele", "Wir", "werden", "unsere"],
                    correctOrder: ["Wir", "werden", "unsere", "Ziele", "erreichen"],
                    translation: "Hedeflerimize ulaşacağız."
                },
                {
                    type: "choice",
                    question: "'Ich drücke dir die Daumen!' deyimi ne anlama gelir?",
                    phrase: "Ich drücke dir die Daumen!",
                    options: ["Sana şans diliyorum / Başarılar dilerim!", "Sana kızgınım.", "Beni bekle.", "Parmaklarım ağrıyor."],
                    correct: 0,
                    explanation: "'die Daumen drücken' Almancada şans dilemek demektir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'Herzlichen ______ zum Erfolg!' (Tebrikler)",
                    sentence: "Herzlichen ______ zum Erfolg!",
                    options: ["Glückwunsch", "Dank", "Abend", "Morgen"],
                    correct: 0,
                    explanation: "'Herzlichen Glückwunsch' tebrikler / kutlarım demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "Ich habe den Kurs erfolgreich beendet",
                    options: ["Ich habe den Kurs erfolgreich beendet", "Ich habe den Kurs abgebrochen", "Ich beginne den Kurs neu", "Ich suche einen Kurs"],
                    correct: 0,
                    explanation: "'erfolgreich beendet' başarıyla bitirdim demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Her gün yeni bir şeyler öğreniyorum.' cümlesi hangisidir?",
                    options: ["Jeden Tag lerne ich etwas Neues.", "Ich vergesse alles sofort.", "Ich mag keine neuen Dinge.", "Heute mache ich nichts."],
                    correct: 0,
                    explanation: "'etwas Neues lernen' yeni bir şeyler öğrenmektir."
                },
                {
                    type: "word_order",
                    question: "Zafer cümlesini tamamla:",
                    words: ["Stolz", "auf", "Wir", "sind", "dich"],
                    correctOrder: ["Wir", "sind", "stolz", "auf", "dich"],
                    translation: "Seninle gurur duyuyoruz!"
                }
            ]
        },
        {
            id: "de_lesson_9",
            unit: 9,
            title: "Einkaufen, Kleidung & Preise",
            subtitle: "Alışveriş, Kıyafetler & Fiyatlar",
            icon: "fa-bag-shopping",
            description: "Alışveriş yap, beden ve renk sor, fiyat pazarlığı yap.",
            color: "#ec4899",
            questions: [
                {
                    type: "choice",
                    question: "'Wie viel kostet dieses Hemd?' ne sorar?",
                    phrase: "Wie viel kostet dieses Hemd?",
                    options: ["Bu gömlek ne kadar?", "Bu gömlek hangi renk?", "Bu gömlek bana uyar mı?", "Gömlek nerede satılıyor?"],
                    correct: 0,
                    explanation: "'Wie viel kostet...' fiyat sorarken kullanılır; 'das Hemd' gömlektir."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'Ich suche eine Jacke in Größe ______.' (Beden)",
                    sentence: "Ich suche eine Jacke in Größe ______.",
                    options: ["M", "Rot", "Kalt", "Viel"],
                    correct: 0,
                    explanation: "'in Größe M' M beden anlamına gelir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin kıyafeti seç:",
                    phrase: "Die blaue Hose",
                    options: ["Die blaue Hose", "Das weiße Hemd", "Die rote Mütze", "Die schwarzen Schuhe"],
                    correct: 0,
                    explanation: "'Die blaue Hose' mavi pantolon demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Bunu deneyebilir miyim?' Almanca nasıl denir?",
                    options: ["Kann ich das anprobieren?", "Kann ich das kaufen?", "Wo ist der Ausgang?", "Haben Sie Wechselgeld?"],
                    correct: 0,
                    explanation: "'anprobieren' kıyafet denemek demektir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur: 'Bu ayakkabılar çok rahat.'",
                    words: ["Schuhe", "Diese", "sehr", "bequem", "sind"],
                    correctOrder: ["Diese", "Schuhe", "sind", "sehr", "bequem"],
                    translation: "Bu ayakkabılar çok rahat."
                },
                {
                    type: "choice",
                    question: "'Das ist mir zu teuer.' diyen biri ne demek istiyor?",
                    phrase: "Das ist mir zu teuer.",
                    options: ["Bu bana çok pahalı geldi.", "Bu çok ucuz.", "Bunu satın alıyorum.", "Bedenim yok."],
                    correct: 0,
                    explanation: "'zu teuer' aşırı pahalı demektir."
                },
                {
                    type: "fill_blank",
                    question: "İndirim tabelasında: 'Großer ______: Bis zu 50% Rabatt!'",
                    sentence: "Großer ______: Bis zu 50% Rabatt!",
                    options: ["Ausverkauf", "Eingang", "Bahnhof", "Kühlschrank"],
                    correct: 0,
                    explanation: "'der Ausverkauf' büyük indirim / tasfiye satışı demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin ifadeyi seç:",
                    phrase: "Ich nehme das",
                    options: ["Ich nehme das", "Ich suche das", "Ich brauche das", "Ich gebe das"],
                    correct: 0,
                    explanation: "'Ich nehme das' bunu alıyorum / alacağım demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Fiş alabilir miyim lütfen?' nasıl sorulur?",
                    options: ["Kann ich bitte den Kassenbon haben?", "Haben Sie eine Tüte?", "Wo bezahlt man?", "Ist das im Angebot?"],
                    correct: 0,
                    explanation: "'der Kassenbon' kasa fişi demektir."
                },
                {
                    type: "word_order",
                    question: "Cümleyi sıraya diz:",
                    words: ["steht", "Die", "gut", "Farbe", "dir"],
                    correctOrder: ["Die", "Farbe", "steht", "dir", "gut"],
                    translation: "Renk sana çok yakıştı."
                }
            ]
        },
        {
            id: "de_lesson_10",
            unit: 10,
            title: "Gesundheit, Gefühle & Meisterschaft",
            subtitle: "Sağlık, Doktorda İletişim & Zirve",
            icon: "fa-heart-pulse",
            description: "Doktorda derdini anlat, geçmiş olsun dile ve Almanca yolunu taçlandır.",
            color: "#10b981",
            questions: [
                {
                    type: "choice",
                    question: "'Ich habe Kopfschmerzen.' ne anlama gelir?",
                    phrase: "Ich habe Kopfschmerzen.",
                    options: ["Başım ağrıyor.", "Karnım aç.", "Uykum var.", "Boğazım acıyor."],
                    correct: 0,
                    explanation: "'Kopfschmerzen' baş ağrısıdır ('Kopf' baş, 'Schmerz' ağrı)."
                },
                {
                    type: "fill_blank",
                    question: "Hasta olan birine ne denir: 'Gute ______!' (Geçmiş olsun)",
                    sentence: "Gute ______!",
                    options: ["Besserung", "Reise", "Nacht", "Laune"],
                    correct: 0,
                    explanation: "'Gute Besserung!' acil şifalar / geçmiş olsun demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin sağlık tavsiyesini seç:",
                    phrase: "Sie müssen viel Wasser trinken",
                    options: ["Sie müssen viel Wasser trinken", "Sie sollten Sport treiben", "Sie dürfen nicht rennen", "Sie können nach Hause gehen"],
                    correct: 0,
                    explanation: "'Sie müssen viel Wasser trinken' çok su içmelisiniz demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Kendimi çok iyi hissediyorum.' nasıl söylenir?",
                    options: ["Ich fühle mich sehr gut.", "Ich bin sehr müde.", "Ich habe Fieber.", "Mir ist kalt."],
                    correct: 0,
                    explanation: "'sich fühlen' hissetmektir: 'Ich fühle mich sehr gut'."
                },
                {
                    type: "word_order",
                    question: "Cümleyi kur: 'Doktor bana dinlenmemi söyledi.'",
                    words: ["Der", "sagte", "Arzt", "Ruhe", "brauche", "ich"],
                    correctOrder: ["Der", "Arzt", "sagte", "ich", "brauche", "Ruhe"],
                    translation: "Doktor dinlenmeye ihtiyacım olduğunu söyledi."
                },
                {
                    type: "choice",
                    question: "'Die Apotheke' neresidir?",
                    phrase: "Wo ist die nächste Apotheke?",
                    options: ["Eczane", "Hastane", "Kütüphane", "Postane"],
                    correct: 0,
                    explanation: "'Die Apotheke' eczane demektir ('das Krankenhaus' hastanedir)."
                },
                {
                    type: "fill_blank",
                    question: "Boşluğu doldur: 'Nehmen Sie diese Tablette vor dem ______.' (Yemekten önce)",
                    sentence: "Nehmen Sie diese Tablette vor dem ______.",
                    options: ["Essen", "Schlafen", "Laufen", "Trinken"],
                    correct: 0,
                    explanation: "'vor dem Essen' yemekten önce demektir."
                },
                {
                    type: "listen",
                    question: "Dinlediğin cümleyi seç:",
                    phrase: "Ich bin wieder gesund",
                    options: ["Ich bin wieder gesund", "Ich bin noch krank", "Ich brauche einen Termin", "Ich habe Halsschmerzen"],
                    correct: 0,
                    explanation: "'Ich bin wieder gesund' yeniden sağlığıma kavuştum / iyileştim demektir."
                },
                {
                    type: "reverse_choice",
                    question: "'Randevu almak istiyorum.' nasıl denir?",
                    options: ["Ich möchte einen Termin vereinbaren.", "Ich habe keine Zeit.", "Wann ist der Feierabend?", "Wo ist das Wartezimmer?"],
                    correct: 0,
                    explanation: "'einen Termin vereinbaren' randevu kararlaştırmaktır."
                },
                {
                    type: "word_order",
                    question: "Zirve başarısı cümlesini diz:",
                    words: ["alle", "geschafft", "Ich", "Lektionen", "habe"],
                    correctOrder: ["Ich", "habe", "alle", "Lektionen", "geschafft"],
                    translation: "Tüm dersleri başardım!"
                }
            ]
        }
    ]
};

// Global export for vanilla JS modules
if (typeof window !== "undefined") {
    window.LESSONS_DATABASE = LESSONS_DATABASE;
}
if (typeof module !== "undefined") {
    module.exports = LESSONS_DATABASE;
}
