// Tenses and Modals data extracted from ingilizce_zamanlar_ve_modallar.md
// Contains structural formulas, usage, and five examples for each structure
// formatted with Positive, Negative, and Question states.

const TENSES_MODALS_DATABASE = [
    {
        "id": "t_1",
        "title": "Simple Present Tense",
        "trTitle": "Geniş Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + V1/V(s/es/ies) | Olumsuz: S + do not/does not + V1 | Soru: Do/Does + S + V1?",
        "usage": "Genel doğrular, rutinler, alışkanlıklar ve değişmez durumlar.",
        "examples": [
            {
                "positive": "Water boils at 100 degrees Celsius.",
                "positiveTr": "Su 100 santigrat derecede kaynar.",
                "negative": "Water does not boil at 50 degrees Celsius.",
                "negativeTr": "Su 50 santigrat derecede kaynamaz.",
                "question": "Does water boil at 100 degrees Celsius?",
                "questionTr": "Su 100 santigrat derecede mi kaynar?"
            },
            {
                "positive": "He plays tennis every Sunday morning.",
                "positiveTr": "O her pazar sabahı tenis oynar.",
                "negative": "He does not play tennis on weekdays.",
                "negativeTr": "O hafta içi günlerinde tenis oynamaz.",
                "question": "Does he play tennis every Sunday?",
                "questionTr": "O her pazar tenis oynar mı?"
            },
            {
                "positive": "They live in a beautiful house near the beach.",
                "positiveTr": "Onlar sahile yakın güzel bir evde yaşarlar.",
                "negative": "They do not live in the city center anymore.",
                "negativeTr": "Onlar artık şehir merkezinde yaşamıyorlar.",
                "question": "Do they live near the beach?",
                "questionTr": "Onlar sahile yakın mı yaşıyorlar?"
            },
            {
                "positive": "She speaks English fluently at work.",
                "positiveTr": "O iş yerinde akıcı bir şekilde İngilizce konuşur.",
                "negative": "She does not speak German very well.",
                "negativeTr": "O çok iyi Almanca konuşamaz.",
                "question": "Does she speak English fluently?",
                "questionTr": "O akıcı bir şekilde İngilizce konuşur mu?"
            },
            {
                "positive": "The train leaves at exactly 9:00 AM.",
                "positiveTr": "Tren tam olarak saat 09:00'da hareket eder.",
                "negative": "The train does not stop at the small station.",
                "negativeTr": "Tren o küçük istasyonda durmaz.",
                "question": "Does the train leave at 9:00 AM?",
                "questionTr": "Tren saat 09:00'da mı hareket ediyor?"
            }
        ]
    },
    {
        "id": "t_2",
        "title": "Present Continuous Tense",
        "trTitle": "Şimdiki Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + am/is/are + V(ing) | Olumsuz: S + am/is/are + not + V(ing) | Soru: Am/Is/Are + S + V(ing)?",
        "usage": "Konuşma anında gerçekleşen eylemler, geçici durumlar ve kesin gelecek planları.",
        "examples": [
            {
                "positive": "I am writing a computer program right now.",
                "positiveTr": "Şu anda bir bilgisayar programı yazıyorum.",
                "negative": "I am not playing video games right now.",
                "negativeTr": "Şu anda video oyunları oynamıyorum.",
                "question": "Are you writing a computer program?",
                "questionTr": "Bir bilgisayar programı mı yazıyorsun?"
            },
            {
                "positive": "They are studying for their final exams tonight.",
                "positiveTr": "Bu gece final sınavlarına çalışıyorlar.",
                "negative": "They are not watching television tonight.",
                "negativeTr": "Bu gece televizyon izlemiyorlar.",
                "question": "Are they studying for their exams?",
                "questionTr": "Sınavlarına mı çalışıyorlar?"
            },
            {
                "positive": "She is working on a new design project today.",
                "positiveTr": "O bugün yeni bir tasarım projesi üzerinde çalışıyor.",
                "negative": "She is not taking any vacation days today.",
                "negativeTr": "O bugün hiç tatil günü kullanmıyor.",
                "question": "Is she working on a new design today?",
                "questionTr": "Bugün yeni bir tasarım üzerinde mi çalışıyor?"
            },
            {
                "positive": "It is raining heavily outside at the moment.",
                "positiveTr": "Şu anda dışarıda bardaktan boşanırcasına yağmur yağıyor.",
                "negative": "It is not snowing in the city center right now.",
                "negativeTr": "Şu anda şehir merkezinde kar yağmıyor.",
                "question": "Is it raining heavily outside?",
                "questionTr": "Dışarıda çok yağmur yağıyor mu?"
            },
            {
                "positive": "We are planning a trip to London for next month.",
                "positiveTr": "Gelecek ay için Londra'ya bir seyahat planlıyoruz.",
                "negative": "We are not staying in an expensive hotel there.",
                "negativeTr": "Orada pahalı bir otelde kalmayacağız.",
                "question": "Are you planning a trip to London?",
                "questionTr": "Londra'ya seyahat mi planlıyorsunuz?"
            }
        ]
    },
    {
        "id": "t_3",
        "title": "Present Perfect Tense",
        "trTitle": "Belirsiz Geçmiş Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + have/has + V3 | Olumsuz: S + have/has + not + V3 | Soru: Have/Has + S + V3?",
        "usage": "Zamanı belirtilmeyen geçmiş deneyimler veya etkisi hala devam eden olaylar.",
        "examples": [
            {
                "positive": "I have played Sekiro: Shadows Die Twice twice.",
                "positiveTr": "Sekiro'yu iki kez oynadım (deneyimledim).",
                "negative": "I have not completed the final boss yet.",
                "negativeTr": "Son boss'u henüz bitirmedim.",
                "question": "Have you ever played Sekiro?",
                "questionTr": "Hiç Sekiro oynadın mı?"
            },
            {
                "positive": "She has finished her report ahead of schedule.",
                "positiveTr": "Raporunu planlanandan önce bitirdi.",
                "negative": "She has not sent the email to the manager yet.",
                "negativeTr": "E-postayı müdüre henüz göndermedi.",
                "question": "Has she finished her report?",
                "questionTr": "Raporunu bitirdi mi?"
            },
            {
                "positive": "We have visited Rome three times so far.",
                "positiveTr": "Şimdiye kadar Roma'yı üç kez ziyaret ettik.",
                "negative": "We have not been to Paris yet.",
                "negativeTr": "Henüz Paris'te bulunmadık.",
                "question": "Have you ever visited Rome?",
                "questionTr": "Roma'yı hiç ziyaret ettiniz mi?"
            },
            {
                "positive": "He has lost his house keys again.",
                "positiveTr": "Ev anahtarlarını yine kaybetti.",
                "negative": "He has not found them under the sofa.",
                "negativeTr": "Onları koltuğun altında bulamadı.",
                "question": "Has he lost his keys again?",
                "questionTr": "Anahtarlarını yine mi kaybetti?"
            },
            {
                "positive": "They have built a new office in Sancaktepe.",
                "positiveTr": "Sancaktepe'de yeni bir ofis inşa ettiler.",
                "negative": "They have not opened it to public yet.",
                "negativeTr": "Orayı henüz halka açmadılar.",
                "question": "Have they built a new office?",
                "questionTr": "Yeni bir ofis mi inşa ettiler?"
            }
        ]
    },
    {
        "id": "t_4",
        "title": "Present Perfect Continuous Tense",
        "trTitle": "Süreç Bildiren Şimdiki Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + have/has + been + V(ing) | Olumsuz: S + have/has + not + been + V(ing) | Soru: Have/Has + S + been + V(ing)?",
        "usage": "Geçmişte başlayıp kesintisiz bir şekilde şu ana kadar süren eylemler.",
        "examples": [
            {
                "positive": "I have been coding this application for five hours.",
                "positiveTr": "Beş saattir bu uygulamayı kodluyorum.",
                "negative": "I have not been resting at all today.",
                "negativeTr": "Bugün hiç dinlenmedim.",
                "question": "Have you been coding for five hours?",
                "questionTr": "Beş saattir kod mu yazıyorsun?"
            },
            {
                "positive": "He has been waiting at the airport since morning.",
                "positiveTr": "Sabahtan beri havalimanında bekliyor.",
                "negative": "He has not been sitting in the lounge area.",
                "negativeTr": "Yolcu salonunda oturmuyor.",
                "question": "Has he been waiting for a long time?",
                "questionTr": "Uzun süredir mi bekliyor?"
            },
            {
                "positive": "We have been living in Istanbul for ten years.",
                "positiveTr": "On yıldır İstanbul'da yaşıyoruz.",
                "negative": "We have not been planning to move away.",
                "negativeTr": "Buradan taşınmayı planlamıyoruz.",
                "question": "Have you been living here for ten years?",
                "questionTr": "On yıldır mı burada yaşıyorsunuz?"
            },
            {
                "positive": "She has been learning English with cards lately.",
                "positiveTr": "Son zamanlarda kartlarla İngilizce öğreniyor.",
                "negative": "She has not been attending physical classes.",
                "negativeTr": "Fiziksel derslere katılmıyor.",
                "question": "Has she been learning English lately?",
                "questionTr": "Son zamanlarda İngilizce mi öğreniyor?"
            },
            {
                "positive": "They have been arguing about the project all day.",
                "positiveTr": "Bütün gün proje hakkında tartışıp durdular.",
                "negative": "They have not been focusing on actual solutions.",
                "negativeTr": "Gerçek çözümlere odaklanmıyorlar.",
                "question": "Have they been arguing all day?",
                "questionTr": "Tüm gün tartıştılar mı?"
            }
        ]
    },
    {
        "id": "t_5",
        "title": "Simple Past Tense",
        "trTitle": "Geçmiş Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + V2 (regular/irregular) | Olumsuz: S + did not + V1 | Soru: Did + S + V1?",
        "usage": "Geçmişte belirli bir zamanda gerçekleşmiş ve tamamen bitmiş eylemler.",
        "examples": [
            {
                "positive": "We bought a new laptop last weekend.",
                "positiveTr": "Geçen hafta sonu yeni bir dizüstü bilgisayar aldık.",
                "negative": "We did not buy any accessories for it.",
                "negativeTr": "Onun için hiç aksesuar almadık.",
                "question": "Did you buy a new laptop last weekend?",
                "questionTr": "Geçen hafta sonu yeni bir dizüstü bilgisayar mı aldınız?"
            },
            {
                "positive": "She moved to Germany in November 2024.",
                "positiveTr": "Kasım 2024'te Almanya'ya taşındı.",
                "negative": "She did not like the cold weather there.",
                "negativeTr": "Oradaki soğuk havayı beğenmedi.",
                "question": "Did she move to Germany in 2024?",
                "questionTr": "2024'te Almanya'ya mı taşındı?"
            },
            {
                "positive": "He graduated from university two years ago.",
                "positiveTr": "İki yıl önce üniversiteden mezun oldu.",
                "negative": "He did not start his master's degree immediately.",
                "negativeTr": "Yüksek lisansına hemen başlamadı.",
                "question": "Did he graduate two years ago?",
                "questionTr": "İki yıl önce mi mezun oldu?"
            },
            {
                "positive": "They visited the historical museum yesterday.",
                "positiveTr": "Dün tarihi müzeyi ziyaret ettiler.",
                "negative": "They did not take many photos inside.",
                "negativeTr": "İçeride çok fazla fotoğraf çekmediler.",
                "question": "Did they visit the museum yesterday?",
                "questionTr": "Dün müzeyi ziyaret ettiler mi?"
            },
            {
                "positive": "I lost my credit card at the restaurant.",
                "positiveTr": "Kredi kartımı restoranda kaybettim.",
                "negative": "I did not notice it until this morning.",
                "negativeTr": "Bu sabaha kadar fark etmedim.",
                "question": "Did you lose your credit card there?",
                "questionTr": "Kredi kartını orada mı kaybettin?"
            }
        ]
    },
    {
        "id": "t_6",
        "title": "Past Continuous Tense",
        "trTitle": "Şimdiki Zamanın Hikayesi",
        "category": "Tense",
        "formula": "Olumlu: S + was/were + V(ing) | Olumsuz: S + was/were + not + V(ing) | Soru: Was/Were + S + V(ing)?",
        "usage": "Geçmişte belirli bir anda devam eden veya başka bir eylemce kesilen eylemler.",
        "examples": [
            {
                "positive": "I was coding when you called me.",
                "positiveTr": "Sen beni aradığında ben kod yazıyordum.",
                "negative": "I was not sleeping when the phone rang.",
                "negativeTr": "Telefon çaldığında uyumuyordum.",
                "question": "Were you coding when I called?",
                "questionTr": "Aradığımda kod mu yazıyordun?"
            },
            {
                "positive": "They were walking home when it started to rain.",
                "positiveTr": "Yağmur yağmaya başladığında eve yürüyorlardı.",
                "negative": "They were not carrying umbrellas with them.",
                "negativeTr": "Yanlarında şemsiye taşımıyorlardı.",
                "question": "Were they walking home when it rained?",
                "questionTr": "Yağmur başladığında eve mi yürüyorlardı?"
            },
            {
                "positive": "She was teaching English at nine yesterday morning.",
                "positiveTr": "Dün sabah saat dokuzda İngilizce öğretiyordu.",
                "negative": "She was not preparing any class presentations.",
                "negativeTr": "Sınıf sunumları hazırlamıyordu.",
                "question": "Was she teaching English at that time?",
                "questionTr": "O saatte İngilizce mi öğretiyordu?"
            },
            {
                "positive": "He was driving home when the tyre went flat.",
                "positiveTr": "Lastik patladığında arabayla eve sürüyordu.",
                "negative": "He was not speeding on the highway.",
                "negativeTr": "Otobanda hız yapmıyordu.",
                "question": "Was he driving home when the tyre flat?",
                "questionTr": "Lastik patladığında eve mi sürüyordu?"
            },
            {
                "positive": "We were having dinner at 8 PM last night.",
                "positiveTr": "Dün akşam saat 8'de akşam yemeği yiyorduk.",
                "negative": "We were not watching the news on television.",
                "negativeTr": "Televizyonda haberleri izlemiyorduk.",
                "question": "Were you having dinner at 8 PM?",
                "questionTr": "Dün akşam saat 8'de yemek mi yiyordunuz?"
            }
        ]
    },
    {
        "id": "t_7",
        "title": "Past Perfect Tense",
        "trTitle": "Miş'li Geçmiş Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + had + V3 | Olumsuz: S + had not + V3 | Soru: Had + S + V3?",
        "usage": "Geçmişdeki iki olaydan daha önce gerçekleşmiş olanını anlatmak için.",
        "examples": [
            {
                "positive": "The train had left before we arrived there.",
                "positiveTr": "Biz oraya varmadan önce tren kalkmıştı.",
                "negative": "The train had not arrived at the platform yet.",
                "negativeTr": "Tren perona henüz yanaşmamıştı.",
                "question": "Had the train left before you arrived?",
                "questionTr": "Siz varmadan önce tren kalkmış mıydı?"
            },
            {
                "positive": "She had studied English before moving to Berlin.",
                "positiveTr": "Berlin'ye taşınmadan önce İngilizce çalışmıştı.",
                "negative": "She had not learned German before the move.",
                "negativeTr": "Taşınmadan önce Almanca öğrenmemişti.",
                "question": "Had she studied English before Berlin?",
                "questionTr": "Berlin'den önce İngilizce çalışmış mıydı?"
            },
            {
                "positive": "He had saved enough money before buying the car.",
                "positiveTr": "Arabayı satın almadan önce yeterli parayı biriktirmişti.",
                "negative": "He had not taken any loans from the bank.",
                "negativeTr": "Bankadan hiç kredi çekmemişti.",
                "question": "Had he saved enough money for the car?",
                "questionTr": "Araba için yeterli para biriktirmiş miydi?"
            },
            {
                "positive": "They had finished the project before the deadline.",
                "positiveTr": "Projeyi teslim tarihinden önce bitirmişlerdi.",
                "negative": "They had not requested any deadline extensions.",
                "negativeTr": "Hiç süre uzatımı talep etmemişlerdi.",
                "question": "Had they finished it before the deadline?",
                "questionTr": "Süresinden önce bitirmişler miydi?"
            },
            {
                "positive": "I had eaten dinner before the guests came.",
                "positiveTr": "Misafirler gelmeden önce akşam yemeğini yemiştim.",
                "negative": "I had not prepared any desserts for them.",
                "negativeTr": "Onlar için hiç tatlı hazırlamamıştı.",
                "question": "Had you eaten before they arrived?",
                "questionTr": "Onlar gelmeden önce yemek yemiş miydin?"
            }
        ]
    },
    {
        "id": "t_8",
        "title": "Past Perfect Continuous Tense",
        "trTitle": "Öncelikli Süreç Geçmiş Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + had been + V(ing) | Olumsuz: S + had not been + V(ing) | Soru: Had + S + been + V(ing)?",
        "usage": "Geçmişte başlayıp, geçmişteki başka bir olaya kadar kesintisiz süren süreçler.",
        "examples": [
            {
                "positive": "He had been working there for ten years before it closed.",
                "positiveTr": "Şirket kapanmadan önce orada on yıldır çalışmaktaydı.",
                "negative": "He had not been enjoying his job there lately.",
                "negativeTr": "Son zamanlarda oradaki işinden keyif almıyordu.",
                "question": "Had he been working there for a long time?",
                "questionTr": "Orada uzun süredir mi çalışmaktaydı?"
            },
            {
                "positive": "I had been sleeping for hours when you knocked.",
                "positiveTr": "Sen kapıyı çaldığında ben saatlerdir uyumaktaydım.",
                "negative": "I had not been feeling very well that afternoon.",
                "negativeTr": "O öğleden sonra kendimi pek iyi hissetmiyordum.",
                "question": "Had you been sleeping when I knocked?",
                "questionTr": "Ben kapıyı çaldığımda uyuyor muydun?"
            },
            {
                "positive": "She had been studying all day, so she was exhausted.",
                "positiveTr": "Tüm gün ders çalışmaktaydı, bu yüzden çok yorgun bilgiçti.",
                "negative": "She had not been eating properly during the day.",
                "negativeTr": "Gün boyunca düzgün bir şekilde yemek yemiyordu.",
                "question": "Had she been studying for the exam all day?",
                "questionTr": "Tüm gün sınav için mi çalışıyordu?"
            },
            {
                "positive": "The children had been playing outside before dark.",
                "positiveTr": "Hava kararmadan önce çocuklar dışarıda oynamaktaydı.",
                "negative": "They had not been making any noise in the garden.",
                "negativeTr": "Bahçede hiç gürültü yapmıyorlardı.",
                "question": "Had they been playing in the garden?",
                "questionTr": "Bahçede mi oynuyorlardı?"
            },
            {
                "positive": "We had been driving for hours before finding a hotel.",
                "positiveTr": "Bir otel bulmadan önce saatlerdir araba sürmekteydik.",
                "negative": "We had not been using a GPS system at first.",
                "negativeTr": "İlk başta bir GPS sistemi kullanmıyorduk.",
                "question": "Had you been driving for a long time?",
                "questionTr": "Uzun süredir mi araba sürüyordunuz?"
            }
        ]
    },
    {
        "id": "t_9",
        "title": "Simple Future Tense (Will / Be Going To)",
        "trTitle": "Gelecek Zaman",
        "category": "Tense",
        "formula": "Will: S+will+V1 / S+won't+V1 | Going To: S+am/is/are+going to+V1 / S+am/is/are+not+going to+V1",
        "usage": "Planlı veya anlık kararlar ile geleceğe dönük tahminler.",
        "examples": [
            {
                "positive": "I will call you as soon as I arrive home.",
                "positiveTr": "Eve varır varmaz seni arayacağım (anlık karar/söz).",
                "negative": "I will not forget to buy some bread.",
                "negativeTr": "Ekmek almayı unutmayacağım.",
                "question": "Will you call me tonight?",
                "questionTr": "Beni bu gece arayacak mısın?"
            },
            {
                "positive": "We are going to buy a new car next month.",
                "positiveTr": "Gelecek ay yeni bir araba satın alacağız (planlı).",
                "negative": "We are not going to take a bank loan for it.",
                "negativeTr": "Bunun için banka kredisi çekmeyeceğiz.",
                "question": "Are you going to buy a car?",
                "questionTr": "Araba mı alacaksınız?"
            },
            {
                "positive": "She will pass the exam easily, she is very smart.",
                "positiveTr": "Sınavı kolayca geçecektir, o çok zekidir (tahmin).",
                "negative": "She will not fail because of lack of study.",
                "negativeTr": "Çalışma eksikliğinden dolayı kalmayacaktır.",
                "question": "Will she pass the exam?",
                "questionTr": "Sınavı geçecek mi?"
            },
            {
                "positive": "They are going to build a new runway in Sancaktepe.",
                "positiveTr": "Sancaktepe'de yeni bir pist inşa edecekler (kesin plan).",
                "negative": "They are not going to start it before winter.",
                "negativeTr": "Kıştan önce başlamayacaklar.",
                "question": "Are they going to start the project soon?",
                "questionTr": "Projeye yakında başlayacaklar mı?"
            },
            {
                "positive": "I will help you with those heavy bags.",
                "positiveTr": "O ağır çantalarda sana yardım edeceğim (gönüllü teklif).",
                "negative": "I won't let you carry them all alone.",
                "negativeTr": "Onları tek başına taşımana izin vermeyeceğim.",
                "question": "Will you carry these bags for me?",
                "questionTr": "Bu çantaları benim için taşır mısın?"
            }
        ]
    },
    {
        "id": "t_10",
        "title": "Future Continuous Tense",
        "trTitle": "Gelecekte Süregelen Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + will be + V(ing) | Olumsuz: S + will not be + V(ing) | Soru: Will + S + be + V(ing)?",
        "usage": "Gelecekte belirli bir zaman diliminde yapıyor olacağımız eylemler.",
        "examples": [
            {
                "positive": "This time tomorrow, I will be relaxing on the beach.",
                "positiveTr": "Yarın bu saatlerde kumsalda dinleniyor olacağım.",
                "negative": "I won't be working at the office tomorrow afternoon.",
                "negativeTr": "Yarın öğleden sonra ofiste çalışıyor olmayacağım.",
                "question": "Will you be relaxing tomorrow?",
                "questionTr": "Yarın dinleniyor mu olacaksın?"
            },
            {
                "positive": "He will be coding throughout the night.",
                "positiveTr": "Gece boyunca kod yazıyor olacak.",
                "negative": "He won't be answering any support calls during work.",
                "negativeTr": "Çalışırken hiçbir destek çağrısına yanıt vermiyor olacak.",
                "question": "Will he be coding all night?",
                "questionTr": "Tüm gece kod mu yazıyor olacak?"
            },
            {
                "positive": "At 10 AM on Monday, we will be attending a seminar.",
                "positiveTr": "Pazartesi sabah saat 10'da bir seminere katılıyor olacağız.",
                "negative": "We won't be staying at our home office then.",
                "negativeTr": "O sırada ev ofisimizde kalıyor olmayacağız.",
                "question": "Will you be attending the seminar?",
                "questionTr": "Seminere katılıyor olacak mısınız?"
            },
            {
                "positive": "She will be sleeping at midnight, so don't call.",
                "positiveTr": "Gece yarısı uyuyor olacak, bu yüzden arama.",
                "negative": "She won't be reading books at that hour.",
                "negativeTr": "O saatte kitap okuyor olmayacak.",
                "question": "Will she be sleeping by midnight?",
                "questionTr": "Gece yarısı uyuyor mu olacak?"
            },
            {
                "positive": "They will be traveling around Europe next week.",
                "positiveTr": "Gelecek hafta Avrupa'yı seyahat ediyor olacaklar.",
                "negative": "They won't be joining the local projects.",
                "negativeTr": "Yerel projelere katılıyor olmayacaklar.",
                "question": "Will they be traveling next week?",
                "questionTr": "Gelecek hafta seyahat ediyor mu olacaklar?"
            }
        ]
    },
    {
        "id": "t_11",
        "title": "Future Perfect Tense",
        "trTitle": "Gelecekte Tamamlanmış Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + will have + V3 | Olumsuz: S + will not have + V3 | Soru: Will + S + have + V3?",
        "usage": "Gelecekteki belirli bir andan önce bitmiş veya tamamlanmış olacak olaylar.",
        "examples": [
            {
                "positive": "I will have graduated from university by June.",
                "positiveTr": "Haziran ayına kadar üniversiteden mezun olmuş olacağım.",
                "negative": "I won't have found a job by the time I graduate.",
                "negativeTr": "Mezun olduğum vakte kadar henüz bir iş bulmuş olmayacağım.",
                "question": "Will you have graduated by June?",
                "questionTr": "Haziran ayına kadar mezun olmuş olacak mısın?"
            },
            {
                "positive": "They will have completed the project by Friday.",
                "positiveTr": "Cuma gününe kadar projeyi tamamlamış olacaklar.",
                "negative": "They won't have started the phase two by then.",
                "negativeTr": "O zamana kadar henüz ikinci aşamaya başlamış olmayacaklar.",
                "question": "Will they have completed it by Friday?",
                "questionTr": "Cuma gününe kadar onu tamamlamış olacaklar mı?"
            },
            {
                "positive": "She will have cleaned the house before you arrive.",
                "positiveTr": "Sen varmadan önce evi temizlemiş olacak.",
                "negative": "She won't have cooked the dinner yet.",
                "negativeTr": "Akşam yemeğini henüz pişirmiş olmayacak.",
                "question": "Will she have cleaned the house?",
                "questionTr": "Evi temizlemiş olacak mı?"
            },
            {
                "positive": "He will have written his second book by next year.",
                "positiveTr": "Gelecek yıla kadar ikinci kitabını yazmış olacak.",
                "negative": "He won't have published it by then.",
                "negativeTr": "O zamana kadar henüz onu yayınlamış olmayacak.",
                "question": "Will he have written his book by next year?",
                "questionTr": "Gelecek yıla kadar kitabını yazmış olacak mı?"
            },
            {
                "positive": "By tomorrow, we will have fixed all the issues.",
                "positiveTr": "Yarına kadar tüm sorunları çözmüş olacağız.",
                "negative": "We won't have pushed the codes to production.",
                "negativeTr": "Kodları henüz canlı ortama göndermiş olmayacağız.",
                "question": "Will you have fixed the issues by tomorrow?",
                "questionTr": "Yarına kadar sorunları çözmüş olacak mısınız?"
            }
        ]
    },
    {
        "id": "t_12",
        "title": "Future Perfect Continuous Tense",
        "trTitle": "Gelecekte Süreç Bildiren Zaman",
        "category": "Tense",
        "formula": "Olumlu: S + will have been + V(ing) | Olumsuz: S + will not have been + V(ing) | Soru: Will + S + have been + V(ing)?",
        "usage": "Gelecekteki belirli bir ana kadar sürmüş ve o anda ne kadardır devam etmekte olduğunu anlatan süreçler.",
        "examples": [
            {
                "positive": "By December, I will have been living in Sancaktepe for six months.",
                "positiveTr": "Aralık ayına kadar altı aydır Sancaktepe'de yaşıyor olacağım.",
                "negative": "I won't have been working at this company for very long.",
                "negativeTr": "Bu şirkette henüz çok uzun süredir çalışıyor olmayacağım.",
                "question": "Will you have been living there for six months?",
                "questionTr": "Aralıkta orada altı aydır mı yaşıyor olacaksın?"
            },
            {
                "positive": "By next month, she will have been teaching here for five years.",
                "positiveTr": "Gelecek ay itibariyle burada beş yıldır öğretmenlik yapıyor olacak.",
                "negative": "She won't have been taking any long leaves during that time.",
                "negativeTr": "Bu süre boyunca hiç uzun izin kullanmamış olacak.",
                "question": "Will she have been teaching here for five years?",
                "questionTr": "Gelecek ay burada beş yıldır mı öğretmenlik yapıyor olacak?"
            },
            {
                "positive": "When he retires, he will have been driving trains for forty years.",
                "positiveTr": "Emekli olduğunda, kırk yıldır tren sürüyor olacak.",
                "negative": "He won't have been complaining about his shifts.",
                "negativeTr": "Vardiyalarından şikayet ediyor olmayacak.",
                "question": "Will he have been driving trains for forty years?",
                "questionTr": "Kırk yıldır mı tren sürüyor olacak?"
            },
            {
                "positive": "They will have been traveling for ten days by Saturday.",
                "positiveTr": "Cumartesiye kadar on gündür seyahat ediyor olacaklar.",
                "negative": "They won't have been spending too much money on food.",
                "negativeTr": "Yemeğe çok fazla para harcıyor olmayacaklar.",
                "question": "Will they have been traveling for ten days?",
                "questionTr": "Cumartesiye kadar on gündür mü seyahat ediyor olacaklar?"
            },
            {
                "positive": "By 10 PM, he will have been studying for eight hours.",
                "positiveTr": "Saat 22:00'de sekiz saattir ders çalışıyor olacak.",
                "negative": "He won't have been playing any online video games.",
                "negativeTr": "Hiçbir çevrimiçi video oyunu oynamıyor olacak.",
                "question": "Will he have been studying for eight hours?",
                "questionTr": "Sekiz saattir mi ders çalışıyor olacak?"
            }
        ]
    },
    {
        "id": "m_1",
        "title": "Can (Modal)",
        "trTitle": "Yetenek / İzin / İstek",
        "category": "Modal",
        "formula": "Olumlu: S + can + V1 | Olumsuz: S + cannot/can't + V1 | Soru: Can + S + V1?",
        "usage": "Şimdiki yetenekler, resmi olmayan izinler ve ricalar.",
        "examples": [
            {
                "positive": "I can write clean JavaScript code.",
                "positiveTr": "Temiz JavaScript kodu yazabilirim.",
                "negative": "I cannot write complex Assembly code.",
                "negativeTr": "Karmaşık Assembly kodu yazamam.",
                "question": "Can you write JavaScript code?",
                "questionTr": "JavaScript kodu yazabilir misin?"
            },
            {
                "positive": "You can use my laptop for your homework.",
                "positiveTr": "Ödevin için benim dizüstü bilgisayarımı kullanabilirsin.",
                "negative": "You cannot play games on it during work.",
                "negativeTr": "Çalısma saatlerinde onun üzerinde oyun oynayamazsın.",
                "question": "Can I use your laptop?",
                "questionTr": "Bilgisayarını kullanabilir miyim?"
            },
            {
                "positive": "She can speak English and Turkish fluently.",
                "positiveTr": "Akıcı bir şekilde İngilizce ve Türkçe konuşabilir.",
                "negative": "She cannot speak German very well.",
                "negativeTr": "Çok iyi Almanca konuşamaz.",
                "question": "Can she speak English?",
                "questionTr": "İngilizce konuşabiliyor mu?"
            },
            {
                "positive": "We can meet at the office tomorrow morning.",
                "positiveTr": "Yarın sabah ofiste buluşabiliriz.",
                "negative": "We cannot meet on Sunday.",
                "negativeTr": "Pazar günü buluşamayız.",
                "question": "Can we meet tomorrow?",
                "questionTr": "Yarın buluşabilir miyiz?"
            },
            {
                "positive": "He can play the acoustic guitar beautifully.",
                "positiveTr": "Akustik gitarı harika bir şekilde çalabilir.",
                "negative": "He cannot play the violin at all.",
                "negativeTr": "Kemanı hiç çalamaz.",
                "question": "Can he play the guitar?",
                "questionTr": "Gitar çalabiliyor mu?"
            }
        ]
    },
    {
        "id": "m_2",
        "title": "Could (Modal)",
        "trTitle": "Geçmiş Yetenek / Kibar İstek",
        "category": "Modal",
        "formula": "Olumlu: S + could + V1 | Olumsuz: S + could not/couldn't + V1 | Soru: Could + S + V1?",
        "usage": "Geçmişteki genel yetenekler, kibar ricalar ve olasılıklar.",
        "examples": [
            {
                "positive": "He could speak English when he was only five.",
                "positiveTr": "Daha beş yaşındayken İngilizce konuşabiliyordu.",
                "negative": "He couldn't write complex essays at that age.",
                "negativeTr": "O yaşta karmaşık makaleler yazamıyordu.",
                "question": "Could he speak English as a child?",
                "questionTr": "Çocukken İngilizce konuşabiliyor muydu?"
            },
            {
                "positive": "You could open the window to get some fresh air.",
                "positiveTr": "Biraz temiz hava almak için pencereyi açabilirsin (tavsiye/olasılık).",
                "negative": "You couldn't find a better place to rest.",
                "negativeTr": "Dinlenmek için daha iyi bir yer bulamazdın.",
                "question": "Could you open the window, please?",
                "questionTr": "Pencereyi açabilir misiniz, lütfen? (kibar rica)"
            },
            {
                "positive": "They could arrive early if the traffic is light.",
                "positiveTr": "Trafik hafif olursa erken varabilirler (olasılık).",
                "negative": "They couldn't catch the bus because of the delay.",
                "negativeTr": "Gecikmeden dolayı otobüsü yakalayamadılar.",
                "question": "Could they arrive before noon?",
                "questionTr": "Öğleden önce varabilirler mi?"
            },
            {
                "positive": "I could swim across the river when I was young.",
                "positiveTr": "Gençken nehrin karşı kıyısına yüzebiliyordum.",
                "negative": "I couldn't run very fast due to a knee injury.",
                "negativeTr": "Diz sakatlığı nedeniyle çok hızlı koşamıyordum.",
                "question": "Could you swim when you were ten?",
                "questionTr": "On yaşındayken yüzebiliyor muydun?"
            },
            {
                "positive": "She could play the piano when she lived in Rome.",
                "positiveTr": "Roma'da yaşarken piyano çalabiliyordu.",
                "negative": "She couldn't practice daily due to work.",
                "negativeTr": "İş yüzünden her gün pratik yapamıyordu.",
                "question": "Could she play the piano well?",
                "questionTr": "Piyanoyu iyi çalabiliyor muydun?"
            }
        ]
    },
    {
        "id": "m_3",
        "title": "May (Modal)",
        "trTitle": "Resmi İzin / Güçlü Olasılık",
        "category": "Modal",
        "formula": "Olumlu: S + may + V1 | Olumsuz: S + may not + V1 | Soru: May + S + V1?",
        "usage": "Resmi izin isteme/verme durumları ve güçlü olasılıklar.",
        "examples": [
            {
                "positive": "It may rain tonight, look at the dark clouds.",
                "positiveTr": "Bu gece yağmur yağabilir, kara bulutlara bak (güçlü olasılık).",
                "negative": "It may not rain tonight if the wind changes.",
                "negativeTr": "Rüzgar yön değiştirirse bu gece yağmur yağmayabilir.",
                "question": "May I leave the room now, sir?",
                "questionTr": "Şimdi odadan çıkabilir miyim, efendim? (resmi izin)"
            },
            {
                "positive": "She may attend the meeting online.",
                "positiveTr": "Toplantıya çevrimiçi katılabilir (izin/olasılık).",
                "negative": "She may not have enough time for the presentation.",
                "negativeTr": "Sunum için yeterli zamanı olmayabilir.",
                "question": "May she join our study group?",
                "questionTr": "Çalışma grubumuza katılabilir mi?"
            },
            {
                "positive": "They may sign the contract tomorrow morning.",
                "positiveTr": "Yarın sabah sözleşmeyi imzalayabilirler.",
                "negative": "They may not agree to all our terms.",
                "negativeTr": "Tüm şartlarımızı kabul etmeyebilirler.",
                "question": "May we start the negotiation?",
                "questionTr": "Müzakereyi başlatabilir miyiz?"
            },
            {
                "positive": "We may travel to Germany if we get our visa.",
                "positiveTr": "Vizemizi alırsak Almanya'ya seyahat edebiliriz.",
                "negative": "We may not visit Paris during this trip.",
                "negativeTr": "Bu seyahatte Paris'i ziyaret etmeyebiliriz.",
                "question": "May I ask you a question in private?",
                "questionTr": "Size özel olarak bir soru sorabilir miyim?"
            },
            {
                "positive": "He may know the solution to this problem.",
                "positiveTr": "Bu sorunun çözümünü biliyor olabilir.",
                "negative": "He may not be in his office right now.",
                "negativeTr": "Şu anda ofisinde olmayabilir.",
                "question": "May we use your printer for a moment?",
                "questionTr": "Yazıcınızı bir anlığına kullanabilir miyiz?"
            }
        ]
    },
    {
        "id": "m_4",
        "title": "Might (Modal)",
        "trTitle": "Zayıf Olasılık",
        "category": "Modal",
        "formula": "Olumlu: S + might + V1 | Olumsuz: S + might not + V1 | Soru: Might + S + V1?",
        "usage": "Çok güçlü olmayan olasılıkları ifade etmek için kullanılır.",
        "examples": [
            {
                "positive": "They might join our dinner party later tonight.",
                "positiveTr": "Bu gece daha geç saatte akşam yemeğimize katılabilirler (zayıf olasılık).",
                "negative": "They might not come because of the heavy workload.",
                "negativeTr": "Yoğun iş yükünden dolayı gelmeyebilirler.",
                "question": "Might we contact them directly?",
                "questionTr": "Onlarla doğrudan iletişime geçebilir miyiz? (çok resmi)"
            },
            {
                "positive": "He might buy that expensive camera eventually.",
                "positiveTr": "Eninde sonunda o pahalı kamerayı alabilir (belli değil).",
                "negative": "He might not spend so much money on hobby gear.",
                "negativeTr": "Hobi ekipmanlarına bu kadar para harcamayabilir.",
                "question": "Might she change her opinion later?",
                "questionTr": "Daha sonra fikrini değiştirebilir mi?"
            },
            {
                "positive": "It might snow in the evening, dress warmly.",
                "positiveTr": "Akşama doğru kar yağabilir, sıkı giyin.",
                "negative": "It might not be cold enough for snow.",
                "negativeTr": "Kar yağacak kadar soğuk olmayabilir.",
                "question": "Might this issue cause a delay?",
                "questionTr": "Bu sorun bir gecikmeye yol açabilir mi?"
            },
            {
                "positive": "We might see them at the airport tomorrow.",
                "positiveTr": "Yarın onları havalimanında görebiliriz.",
                "negative": "We might not have enough time to talk before their flight.",
                "negativeTr": "Uçuşlarından önce konuşmak için yeterli zamanımız olmayabilir.",
                "question": "Might I borrow your dictionary for a day?",
                "questionTr": "Sözlüğünüzü bir günlüğüne ödünç alabilir miyim?"
            },
            {
                "positive": "She might agree to help us with translation.",
                "positiveTr": "Çeviri konusunda bize yardım etmeyi kabul edebilir.",
                "negative": "She might not want to work during the weekend.",
                "negativeTr": "Hafta sonu çalışmak istemeyebilir.",
                "question": "Might they cancel the flight due to storm?",
                "questionTr": "Fırtına nedeniyle uçuşu iptal edebilirler mi?"
            }
        ]
    },
    {
        "id": "m_5",
        "title": "Must (Modal)",
        "trTitle": "Zorunluluk / Güçlü Tahmin",
        "category": "Modal",
        "formula": "Zorunluluk: S+must+V1 / Yasak: S+mustnot(mustn't)+V1 | Tahmin: S+must+V1 / S+can't+V1",
        "usage": "Kişisel zorunluluklar, güçlü tavsiyeler, yasaklar ve kesin tahminler.",
        "examples": [
            {
                "positive": "You must wear a helmet while riding a bicycle.",
                "positiveTr": "Bisiklet sürerken kask takmalısın (güçlü kural/tavsiye).",
                "negative": "You mustn't park your car in front of the gate.",
                "negativeTr": "Arabanızı kapının önüne park etmemelisiniz (yasak).",
                "question": "Must I fill out this form right now?",
                "questionTr": "Bu formu hemen şimdi mi doldurmalıyım?"
            },
            {
                "positive": "He has worked all day; he must be very tired.",
                "positiveTr": "Tüm gün çalıştı; çok yorgun olmalı (tahmin/çıkarım).",
                "negative": "He can't be hungry after eating that huge meal.",
                "negativeTr": "O devasa yemeği yedikten sonra aç olamaz.",
                "question": "Must they work on the weekend?",
                "questionTr": "Hafta sonu çalışmak zorundalar mı?"
            },
            {
                "positive": "We must save some water for emergencies.",
                "positiveTr": "Acil durumlar için biraz su biriktirmeliyiz.",
                "negative": "We mustn't waste resource on useless things.",
                "negativeTr": "Yararsız şeyler için kaynakları israf etmemeliyiz.",
                "question": "Must we present our passport at check-in?",
                "questionTr": "Check-in sırasında pasaportumuzu göstermek zorunda mıyız?"
            },
            {
                "positive": "She must practice English every day to improve.",
                "positiveTr": "Gelişmek için her gün İngilizce pratik yapmalı.",
                "negative": "She mustn't skip her revision lessons.",
                "negativeTr": "Tekrar derslerini atlamamalı.",
                "question": "Must she take the exam tomorrow?",
                "questionTr": "Yarın sınava girmek zorunda mı?"
            },
            {
                "positive": "They must sign this document immediately.",
                "positiveTr": "Bu belgeyi derhal imzalamalılar.",
                "negative": "They mustn't share the contents with anyone.",
                "negativeTr": "İçeriği hiç kimseyle paylaşmamalılar.",
                "question": "Must we pay the fee in cash?",
                "questionTr": "Ücreti nakit ödemek zorunda mıyız?"
            }
        ]
    },
    {
        "id": "m_6",
        "title": "Should (Modal)",
        "trTitle": "Tavsiye / Gereklilik",
        "category": "Modal",
        "formula": "Olumlu: S + should + V1 | Olumsuz: S + should not/shouldn't + V1 | Soru: Should + S + V1?",
        "usage": "Birine tavsiye verirken veya olması gereken durumları belirtirken.",
        "examples": [
            {
                "positive": "You should drink at least two litres of water daily.",
                "positiveTr": "Günde en az iki litre su içmelisin.",
                "negative": "You shouldn't sleep late before an important test.",
                "negativeTr": "Önemli bir sınavdan önce geç uyumamalısın.",
                "question": "Should I call him now?",
                "questionTr": "Onu şimdi aramalı mıyım?"
            },
            {
                "positive": "He should study harder to pass the English course.",
                "positiveTr": "İngilizce dersini geçmek için daha çok çalışmalı.",
                "negative": "He shouldn't spend too much time playing online games.",
                "negativeTr": "Çevrimiçi oyunlar oynayarak çok fazla zaman harcamamalı.",
                "question": "Should he look for a new job?",
                "questionTr": "Yeni bir iş aramalı mı?"
            },
            {
                "positive": "We should protect historical structures in our city.",
                "positiveTr": "Şehrimizdeki tarihi yapıları korumalıyız.",
                "negative": "We shouldn't throw litter around in public parks.",
                "negativeTr": "Halka açık parklarda çevreye çöp atmamalıyız.",
                "question": "Should we start the project today?",
                "questionTr": "Projeye bugün başlamalı mıyız?"
            },
            {
                "positive": "She should eat more green vegetables.",
                "positiveTr": "Daha fazla yeşil sebze yemeli.",
                "negative": "She shouldn't consume too much refined sugar.",
                "negativeTr": "Çok fazla rafine şeker tüketmemeli.",
                "question": "Should she visit a doctor for her cough?",
                "questionTr": "Öksürüğü için doktora görünmeli mi?"
            },
            {
                "positive": "They should read the user manual before starting.",
                "positiveTr": "Başlamadan önce kullanım kılavuzunu okumalılar.",
                "negative": "They shouldn't click any suspicious links in emails.",
                "negativeTr": "E-postalardaki şüpheli bağlantılara tıklamamalılar.",
                "question": "Should they update the server firmware?",
                "questionTr": "Sunucu donanım yazılımını güncellemeli mi?"
            }
        ]
    },
    {
        "id": "m_7",
        "title": "Have to / Has to (Semi-Modal)",
        "trTitle": "Zorunluluk (Kurallar / Dış Etkenler)",
        "category": "Semi-Modal",
        "formula": "Olumlu: S + have/has to + V1 | Olumsuz: S + don't/doesn't have to + V1 | Soru: Do/Does + S + have to + V1?",
        "usage": "Kanunlar, kurallar veya başkaları tarafından belirlenen zorunluluklar.",
        "examples": [
            {
                "positive": "I have to pay my apartment rent by the first day of the month.",
                "positiveTr": "Ayın ilk gününe kadar daire kiramı ödemek zorundayım.",
                "negative": "I don't have to cook dinner tonight; we have leftovers.",
                "negativeTr": "Bu gece yemek pişirmek zorunda değilim; kalan yemeğimiz var (zorunluluk yok).",
                "question": "Do you have to wear a uniform at school?",
                "questionTr": "Okulda üniforma giymek zorunda mısın?"
            },
            {
                "positive": "She has to complete the report by tomorrow noon.",
                "positiveTr": "Yarın öğlene kadar raporu tamamlamak zorunda.",
                "negative": "She doesn't have to attend the informal meeting.",
                "negativeTr": "Resmi olmayan toplantıya katılmak zorunda değil.",
                "question": "Does she have to travel for work often?",
                "questionTr": "İş için sık sık seyahat etmek zorunda mı?"
            },
            {
                "positive": "We have to show our boarding pass at the boarding gate.",
                "positiveTr": "Biniş kapısında biniş kartımızı göstermek zorundayız.",
                "negative": "We don't have to print the tickets; digital passes are okay.",
                "negativeTr": "Biletleri yazdırmak zorunda değiliz; dijital kartlar yeterli.",
                "question": "Do we have to arrive three hours before the flight?",
                "questionTr": "Uçuştan üç saat önce varmak zorunda mıyız?"
            },
            {
                "positive": "He has to get a visa before traveling to London.",
                "positiveTr": "Londra'ya seyahat etmeden önce vize almak zorunda.",
                "negative": "He doesn't have to learn a new alphabet for English.",
                "negativeTr": "İngilizce için yeni bir alfabe öğrenmek zorunda değil.",
                "question": "Does he have to work overtime today?",
                "questionTr": "Bugün fazla mesai yapmak zorunda mı?"
            },
            {
                "positive": "They have to follow the instructions carefully.",
                "positiveTr": "Talimatları dikkatlice takip etmek zorundalar.",
                "negative": "They don't have to finish the whole book in one day.",
                "negativeTr": "Kitabın tamamını bir günde bitirmek zorunda değiller.",
                "question": "Do they have to register before the seminar?",
                "questionTr": "Seminerden önce kayıt yaptırmak zorundalar mı?"
            }
        ]
    },
    {
        "id": "m_8",
        "title": "Used to (Semi-Modal)",
        "trTitle": "Geçmişteki Alışkanlıklar",
        "category": "Semi-Modal",
        "formula": "Olumlu: S + used to + V1 | Olumsuz: S + did not use to + V1 | Soru: Did + S + use to + V1?",
        "usage": "Geçmişte düzenli yapılıp artık tamamen bırakılmış eylemler/durumlar.",
        "examples": [
            {
                "positive": "I used to drink coffee with sugar, but now I drink it black.",
                "positiveTr": "Eskiden şekerli kahve içerdim ama artık sade içiyorum.",
                "negative": "I did not use to like bitter chocolate as a kid.",
                "negativeTr": "Çocukken bitter çikolata sevmezdim.",
                "question": "Did you use to play video games in high school?",
                "questionTr": "Lisedeyken video oyunları oynar mıydın?"
            },
            {
                "positive": "He used to live in London, but he moved to Istanbul.",
                "positiveTr": "Eskiden Londra'da yaşardı ama İstanbul'a taşındı.",
                "negative": "He did not use to drive a car when he was in London.",
                "negativeTr": "Londra'dayken araba kullanmazdı.",
                "question": "Did he use to live near the river?",
                "questionTr": "Eskiden nehir yakınında mı yaşardı?"
            },
            {
                "positive": "She used to play the violin in a local orchestra.",
                "positiveTr": "Eskiden yerel birorkestrada keman çalardı.",
                "negative": "She did not use to practice in public areas.",
                "negativeTr": "Topluma açık alanlarda pratik yapmazdı.",
                "question": "Did she use to practice every day?",
                "questionTr": "Eskiden her gün pratik yapar mıydı?"
            },
            {
                "positive": "We used to go camping every summer vacation.",
                "positiveTr": "Eskiden her yaz tatilinde kamp yapmaya giderdik.",
                "negative": "We did not use to stay in luxury hotels back then.",
                "negativeTr": "O zamanlar lüks otellerde kalmazdık.",
                "question": "Did you use to go camping often?",
                "questionTr": "Eskiden sık sık kampa gider miydiniz?"
            },
            {
                "positive": "They used to have a big dog in their garden.",
                "positiveTr": "Eskiden bahçelerinde büyük bir köpekleri vardı.",
                "negative": "They did not use to lock the garden gate at night.",
                "negativeTr": "Geceleri bahçe kapısını kilitlemezlerdi.",
                "question": "Did they use to have pets?",
                "questionTr": "Eskiden evcil hayvanları var mıydı?"
            }
        ]
    },
    {
        "id": "pm_1",
        "title": "Should Have V3 (Perfect Modal)",
        "trTitle": "Geçmişe Yönelik Pişmanlık (Yapmalıydı ama Yapmadı)",
        "category": "Perfect Modal",
        "formula": "Olumlu: S + should have + V3 | Olumsuz: S + should not (shouldn't) have + V3 | Soru: Should + S + have + V3?",
        "usage": "Geçmişte yapılması gerekip de yapılmayan eylemler ve pişmanlıklar.",
        "examples": [
            {
                "positive": "I should have studied harder for the English test.",
                "positiveTr": "İngilizce sınavına daha çok çalışmalıydım (ama çalışmadım).",
                "negative": "I shouldn't have wasted my time playing games yesterday.",
                "negativeTr": "Dün oyun oynayarak zamanımı boşa harcamamalıydım (ama harcadım).",
                "question": "Should I have told him the truth before?",
                "questionTr": "Ona gerçeği daha önce söylemeli miydim?"
            },
            {
                "positive": "You should have called me when the car broke down.",
                "positiveTr": "Araba bozulduğunda beni aramalıydın (ama aramadın).",
                "negative": "You shouldn't have tried to fix the engine yourself.",
                "negativeTr": "Motoru kendi başına tamir etmeye çalışmamalıydın.",
                "question": "Should they have locked the gate after leaving?",
                "questionTr": "Ayrıldıktan sonra kapıyı kilitlemeleri gerekir miydi?"
            },
            {
                "positive": "She should have accepted the job offer in Sancaktepe.",
                "positiveTr": "Sancaktepe'deki iş teklifini kabul etmeliydi.",
                "negative": "She shouldn't have rejected it without thinking.",
                "negativeTr": "Düşünmeden onu reddetmemeliydi.",
                "question": "Should she have checked the hotel details?",
                "questionTr": "Otel detaylarını kontrol etmesi gerekir miydi?"
            },
            {
                "positive": "They should have invited Yeliz to their party.",
                "positiveTr": "Yeliz'i partilerine davet etmeliydiler.",
                "negative": "They shouldn't have kept the location secret.",
                "negativeTr": "Konumu gizli tutmamalıydılar.",
                "question": "Should we have bought the tickets earlier?",
                "questionTr": "Biletleri daha önce satın almalı mıydık?"
            },
            {
                "positive": "We should have brought an umbrella with us.",
                "positiveTr": "Yanımıza bir şemsiye almalıydık.",
                "negative": "We shouldn't have worn our lightweight jackets.",
                "negativeTr": "Hafif ceketlerimizi giymemeliydik.",
                "question": "Should he have signed the contract yesterday?",
                "questionTr": "Sözleşmeyi dün imzalaması gerekir miydi?"
            }
        ]
    },
    {
        "id": "pm_2",
        "title": "Must Have V3 (Perfect Modal)",
        "trTitle": "Geçmişe Yönelik Kesin Tahmin (Yapmış Olmalı)",
        "category": "Perfect Modal",
        "formula": "Olumlu: S + must have + V3 | Olumsuz: S + can't/couldn't have + V3 (Olamaz) | Soru: Must + S + have + V3?",
        "usage": "Geçmişe yönelik çok güçlü, neredeyse kesin çıkarımlar veya tahminler.",
        "examples": [
            {
                "positive": "The ground is completely wet. It must have rained last night.",
                "positiveTr": "Yer tamamen ıslak. Dün gece yağmur yağmış olmalı.",
                "negative": "It can't have been hot last night with this wet ground.",
                "negativeTr": "Bu ıslak zeminle dün gece sıcak olmuş olamaz.",
                "question": "Must it have rained for hours to get this wet?",
                "questionTr": "Bu kadar ıslanması için saatlerce yağmur yağmış olmalı mı?"
            },
            {
                "positive": "He passed the test with full score. He must have studied very hard.",
                "positiveTr": "Sınavdan tam puan aldı. Çok sıkı çalışmış olmalı.",
                "negative": "He couldn't have cheated; he was sitting alone.",
                "negativeTr": "Kopya çekmiş olamaz; yalnız oturuyordu.",
                "question": "Must he have practiced every day to achieve this?",
                "questionTr": "Bunu başarmak için her gün pratik yapmış olmalı mı?"
            },
            {
                "positive": "She did not answer. She must have fallen asleep.",
                "positiveTr": "Cevap vermedi. Uyuya kalmış olmalı.",
                "negative": "She can't have heard the phone call.",
                "negativeTr": "Telefon aramasını duymuş olamaz.",
                "question": "Must she have kept her phone on silent?",
                "questionTr": "Telefonunu sessizde tutmuş olmalı mı?"
            },
            {
                "positive": "They bought a luxury car. They must have won the lottery.",
                "positiveTr": "Lüks bir araba aldılar. Piyangoyu kazanmış olmalılar.",
                "negative": "They couldn't have saved that much money in a month.",
                "negativeTr": "Bir ayda o kadar parayı biriktirmiş olamazlar.",
                "question": "Must they have received inheritance money?",
                "questionTr": "Miras parası almış olmalılar mı?"
            },
            {
                "positive": "The window is broken. The stone must have hit it hard.",
                "positiveTr": "Pencere kırık. Taş oraya sert çarpmış olmalı.",
                "negative": "The bird couldn't have broken this thick glass.",
                "negativeTr": "Kuş bu kalın camı kırmış olamaz.",
                "question": "Must it have happened during the windstorm?",
                "questionTr": "Rüzgar fırtınası sırasında mı gerçekleşmiş olmalı?"
            }
        ]
    }
];
