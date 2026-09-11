// LexiGoo - German Grammar, Tenses & Modals Database
const TENSES_DE_DATABASE = [
    {
        "id": "de_t_1",
        "title": "Präsens",
        "trTitle": "Geniş ve Şimdiki Zaman",
        "category": "Zamanlar (Zeiten)",
        "formula": "Olumlu: S + V (Kök + -e/-st/-t/-en/-t/-en) | Olumsuz: S + V + nicht/kein | Soru: V + S + O?",
        "usage": "Şu anda yapılan eylemler, genel doğrular, alışkanlıklar ve gelecekte kesinleşmiş planlar için kullanılır. Almancada şimdiki ve geniş zaman aynıdır.",
        "examples": [
            {
                "positive": "Wasser kocht bei 100 Grad Celsius.",
                "positiveTr": "Su 100 santigrat derecede kaynar.",
                "negative": "Wasser kocht nicht bei 50 Grad Celsius.",
                "negativeTr": "Su 50 santigrat derecede kaynamaz.",
                "question": "Kocht Wasser bei 100 Grad Celsius?",
                "questionTr": "Su 100 santigrat derecede mi kaynar?"
            },
            {
                "positive": "Er spielt jeden Sonntag Tennis.",
                "positiveTr": "O her pazar günü tenis oynar.",
                "negative": "Er spielt unter der Woche kein Tennis.",
                "negativeTr": "O hafta içi tenis oynamaz.",
                "question": "Spielt er jeden Sonntag Tennis?",
                "questionTr": "O her pazar tenis oynar mı?"
            },
            {
                "positive": "Wir lernen jeden Tag fleißig Deutsch.",
                "positiveTr": "Biz her gün gayretle Almanca öğreniyoruz.",
                "negative": "Wir lernen heute leider kein Deutsch.",
                "negativeTr": "Biz bugün maalesef Almanca çalışmıyoruz.",
                "question": "Lernt ihr jeden Tag fleißig Deutsch?",
                "questionTr": "Siz her gün gayretle Almanca öğreniyor musunuz?"
            },
            {
                "positive": "Der Zug fährt um genau 09:00 Uhr ab.",
                "positiveTr": "Tren tam olarak saat 09:00'da hareket ediyor.",
                "negative": "Der Zug fährt heute nicht pünktlich ab.",
                "negativeTr": "Tren bugün zamanında hareket etmiyor.",
                "question": "Fährt der Zug um 09:00 Uhr ab?",
                "questionTr": "Tren saat 09:00'da mı hareket ediyor?"
            },
            {
                "positive": "Sie wohnt in einer schönen Wohnung in Berlin.",
                "positiveTr": "O Berlin'de güzel bir dairede yaşıyor.",
                "negative": "Sie wohnt nicht mehr im Stadtzentrum.",
                "negativeTr": "O artık şehir merkezinde yaşamıyor.",
                "question": "Wohnt sie in Berlin?",
                "questionTr": "O Berlin'de mi yaşıyor?"
            }
        ]
    },
    {
        "id": "de_t_2",
        "title": "Präteritum (Imperfekt)",
        "trTitle": "Geçmiş Zaman (Yazılı Dil / Hikaye)",
        "category": "Zamanlar (Zeiten)",
        "formula": "Düzenli: S + V-Kök + -te/-test/-te/-ten/-tet/-ten | Düzensiz: S + V2 + Takı | Olumsuz: S + V(Prät) + nicht/kein | Soru: V(Prät) + S ...?",
        "usage": "Geçmişte tamamlanmış olayları anlatırken özellikle yazılı dilde (roman, masal, gazete) ve haben, sein ve modal fiillerin kullanımında tercih edilir.",
        "examples": [
            {
                "positive": "Gestern war das Wetter den ganzen Tag wunderschön.",
                "positiveTr": "Dün bütün gün hava çok güzeldi.",
                "negative": "Gestern war das Wetter überhaupt nicht gut.",
                "negativeTr": "Dün hava hiç iyi değildi.",
                "question": "War das Wetter gestern schön?",
                "questionTr": "Dün hava güzel miydi?"
            },
            {
                "positive": "Er hatte früher ein schnelles rotes Auto.",
                "positiveTr": "Onun eskiden hızlı kırmızı bir arabası vardı.",
                "negative": "Er hatte damals leider kein eigenes Auto.",
                "negativeTr": "Onun o zamanlar maalesef kendi arabası yoktu.",
                "question": "Hatte er früher ein rotes Auto?",
                "questionTr": "Onun eskiden kırmızı bir arabası var mıydı?"
            },
            {
                "positive": "Sie lebte viele Jahre lang in München.",
                "positiveTr": "O uzun yıllar Münih'te yaşadı.",
                "negative": "Sie lebte nicht gerne in der Großstadt.",
                "negativeTr": "O büyük şehirde yaşamayı sevmiyordu.",
                "question": "Lebte sie früher in München?",
                "questionTr": "O eskiden Münih'te mi yaşadı?"
            },
            {
                "positive": "Der berühmte Schriftsteller schrieb einen packenden Roman.",
                "positiveTr": "Ünlü yazar sürükleyici bir roman yazdı.",
                "negative": "Er schrieb in diesem Jahr kein neues Buch.",
                "negativeTr": "O bu yıl yeni bir kitap yazmadı.",
                "question": "Schrieb der Autor diesen bekannten Roman?",
                "questionTr": "Yazar bu tanınmış romanı mı yazdı?"
            },
            {
                "positive": "Wir machten im Sommer einen langen Spaziergang.",
                "positiveTr": "Yazın uzun bir yürüyüş yaptık.",
                "negative": "Wir machten gestern keinen Spaziergang wegen des Regens.",
                "negativeTr": "Dün yağmur yüzünden yürüyüş yapmadık.",
                "question": "Machtet ihr damals oft Spaziergänge?",
                "questionTr": "O zamanlar sık sık yürüyüş yapar mıydınız?"
            }
        ]
    },
    {
        "id": "de_t_3",
        "title": "Perfekt",
        "trTitle": "Di'li Geçmiş Zaman (Konuşma Dili)",
        "category": "Zamanlar (Zeiten)",
        "formula": "Olumlu: S + haben/sein (çekimli) + ... + Partizip II (ge-...-t / ge-...-en) | Olumsuz: S + haben/sein + ... + nicht + Partizip II | Soru: Haben/Sein + S + ... + Partizip II?",
        "usage": "Günlük konuşma dilinde geçmişi anlatırken en çok kullanılan zamandır. Hareket veya durum değişikliği bildiren fiillerde 'sein', diğer tüm fiillerde 'haben' yardımcı fiili kullanılır.",
        "examples": [
            {
                "positive": "Ich habe gestern meine Hausaufgaben gemacht.",
                "positiveTr": "Dün ödevlerimi yaptım.",
                "negative": "Ich habe meine Hausaufgaben noch nicht gemacht.",
                "negativeTr": "Ödevlerimi henüz yapmadım.",
                "question": "Hast du deine Hausaufgaben schon gemacht?",
                "questionTr": "Ödevlerini yaptın mı?"
            },
            {
                "positive": "Wir sind am Wochenende nach Frankfurt gefahren.",
                "positiveTr": "Hafta sonu Frankfurt'a gittik (araçla).",
                "negative": "Wir sind am Wochenende nicht nach Frankfurt gefahren.",
                "negativeTr": "Hafta sonu Frankfurt'a gitmedik.",
                "question": "Seid ihr mit dem Zug nach Frankfurt gefahren?",
                "questionTr": "Frankfurt'a trenle mi gittiniz?"
            },
            {
                "positive": "Er ist heute Morgen sehr früh aufgestanden.",
                "positiveTr": "O bu sabah çok erken kalktı.",
                "negative": "Er ist heute leider nicht früh aufgestanden.",
                "negativeTr": "O bugün maalesef erken kalkmadı.",
                "question": "Bist du heute auch so früh aufgestanden?",
                "questionTr": "Sen de bugün öyle erken mi kalktın?"
            },
            {
                "positive": "Sie hat die Prüfung mit großem Erfolg bestanden.",
                "positiveTr": "O sınavı büyük bir başarıyla geçti.",
                "negative": "Sie hat die schwierige Prüfung leider nicht bestanden.",
                "negativeTr": "O zorlu sınavı maalesef geçemedi.",
                "question": "Hat sie die Deutschprüfung bestanden?",
                "questionTr": "Almanca sınavını geçti mi?"
            },
            {
                "positive": "Die Kinder haben den ganzen Nachmittag im Garten gespielt.",
                "positiveTr": "Çocuklar bütün öğleden sonra bahçede oynadılar.",
                "negative": "Die Kinder haben heute nicht draußen gespielt.",
                "negativeTr": "Çocuklar bugün dışarıda oynamadılar.",
                "question": "Haben die Kinder im Garten gespielt?",
                "questionTr": "Çocuklar bahçede mi oynadılar?"
            }
        ]
    },
    {
        "id": "de_t_4",
        "title": "Plusquamperfekt",
        "trTitle": "Miş'li / Öncelikli Geçmiş Zaman",
        "category": "Zamanlar (Zeiten)",
        "formula": "Olumlu: S + hatte/war (Präteritum) + ... + Partizip II | Olumsuz: S + hatte/war + ... + nicht + Partizip II | Soru: Hatte/War + S + ... + Partizip II?",
        "usage": "Geçmişte yaşanmış iki olaydan daha önce gerçekleşmiş olanı belirtmek için kullanılır (Past Perfect dengi).",
        "examples": [
            {
                "positive": "Nachdem er gefrühstückt hatte, ging er zur Arbeit.",
                "positiveTr": "Kahvaltı yaptıktan sonra işe gitti.",
                "negative": "Er hatte noch nicht gefrühstückt, als der Bus ankam.",
                "negativeTr": "Otobüs geldiğinde o henüz kahvaltı yapmamıştı.",
                "question": "Hattest du schon gegessen, bevor der Film begann?",
                "questionTr": "Film başlamadan önce yemek yemiş miydin?"
            },
            {
                "positive": "Sie war bereits eingeschlafen, als das Telefon klingelte.",
                "positiveTr": "Telefon çaldığında o çoktan uyuyakalmıştı.",
                "negative": "Sie war noch nicht eingeschlafen, als ich nach Hause kam.",
                "negativeTr": "Eve geldiğimde o henüz uyumamıştı.",
                "question": "War der Zug schon abgefahren, als ihr am Bahnhof ankamt?",
                "questionTr": "İstasyona vardığınızda tren çoktan hareket etmiş miydi?"
            },
            {
                "positive": "Ich hatte den Schlüssel verloren, deshalb konnte ich nicht hinein.",
                "positiveTr": "Anahtarı kaybetmiştim, bu yüzden içeri giremedim.",
                "negative": "Ich hatte den Schlüssel zum Glück nicht verloren.",
                "negativeTr": "Neyse ki anahtarı kaybetmemiştim.",
                "question": "Hattest du den Vertrag vor der Unterschrift gründlich gelesen?",
                "questionTr": "İmzalamadan önce sözleşmeyi iyice okumuş muydun?"
            },
            {
                "positive": "Wir hatten das Hotelzimmer schon Wochen im Voraus gebucht.",
                "positiveTr": "Otel odasını haftalar öncesinden ayırtmıştık.",
                "negative": "Wir hatten vorher keine Reservierung vorgenommen.",
                "negativeTr": "Öncesinde hiçbir rezervasyon yapmamıştık.",
                "question": "Hattet ihr die Plätze rechtzeitig reserviert?",
                "questionTr": "Yerinizi zamanında ayırtmış mıydınız?"
            },
            {
                "positive": "Er hatte jahrelang Deutsch gelernt, bevor er nach Wien zog.",
                "positiveTr": "Viyana'ya taşınmadan önce yıllarca Almanca öğrenmişti.",
                "negative": "Er hatte vorher kein einziges deutsches Wort gelernt.",
                "negativeTr": "Öncesinde tek bir kelime bile Almanca öğrenmemişti.",
                "question": "Hatte sie die Stadt vor dieser Reise schon einmal besucht?",
                "questionTr": "Bu seyahatten önce şehri daha önce ziyaret etmiş miydi?"
            }
        ]
    },
    {
        "id": "de_t_5",
        "title": "Futur I",
        "trTitle": "Gelecek Zaman (werden + Mastar)",
        "category": "Zamanlar (Zeiten)",
        "formula": "Olumlu: S + werden (werde, wirst, wird, werden, werdet, werden) + ... + Infinitiv | Olumsuz: S + werden + ... + nicht + Infinitiv",
        "usage": "Gelecekte yapılacak planları, tahminleri, niyetleri ve vaatleri bildirmek için kullanılır.",
        "examples": [
            {
                "positive": "Ich werde morgen pünktlich im Büro sein.",
                "positiveTr": "Yarın zamanında ofiste olacağım.",
                "negative": "Ich werde morgen leider nicht an der Konferenz teilnehmen können.",
                "negativeTr": "Yarın maalesef konferansa katılamayacağım.",
                "question": "Wirst du morgen zur Besprechung kommen?",
                "questionTr": "Yarın toplantıya gelecek misin?"
            },
            {
                "positive": "Nächstes Jahr werden wir Urlaub in Deutschland machen.",
                "positiveTr": "Gelecek yıl Almanya'da tatil yapacağız.",
                "negative": "Wir werden dieses Jahr keine weite Reise unternehmen.",
                "negativeTr": "Bu yıl uzak bir seyahate çıkmayacağız.",
                "question": "Werdet ihr im Sommer nach Spanien reisen?",
                "questionTr": "Yazın İspanya'ya seyahat edecek misiniz?"
            },
            {
                "positive": "Das Wetter wird morgen wieder sonnig und warm sein.",
                "positiveTr": "Yarın hava yine güneşli ve sıcak olacak.",
                "negative": "Morgen wird es voraussichtlich nicht regnen.",
                "negativeTr": "Yarın muhtemelen yağmur yağmayacak.",
                "question": "Wird es am Wochenende schneien?",
                "questionTr": "Hafta sonu kar yağacak mı?"
            },
            {
                "positive": "Er wird die schwierige Aufgabe sicher meistern.",
                "positiveTr": "O bu zorlu görevin üstesinden kesinlikle gelecektir.",
                "negative": "Er wird diesen Fehler bestimmt nicht noch einmal machen.",
                "negativeTr": "O bu hatayı kesinlikle bir daha yapmayacaktır.",
                "question": "Wird sie bald eine neue Stelle finden?",
                "questionTr": "O yakında yeni bir iş bulacak mı?"
            },
            {
                "positive": "Die Preise werden in den kommenden Monaten steigen.",
                "positiveTr": "Önümüzdeki aylarda fiyatlar yükselecek.",
                "negative": "Die Mieten werden voraussichtlich nicht sinken.",
                "negativeTr": "Kiralarda muhtemelen düşüş olmayacak.",
                "question": "Werden die Zinsen weiter ansteigen?",
                "questionTr": "Faizler artmaya devam edecek mi?"
            }
        ]
    },
    {
        "id": "de_t_6",
        "title": "Futur II",
        "trTitle": "Gelecekte Tamamlanmış Zaman",
        "category": "Zamanlar (Zeiten)",
        "formula": "Olumlu: S + werden + ... + Partizip II + haben/sein | Olumsuz: S + werden + ... + nicht + Partizip II + haben/sein",
        "usage": "Gelecekte belirli bir zamanda tamamlanmış olacak eylemleri veya geçmişe dair güçlü tahminleri ifade eder.",
        "examples": [
            {
                "positive": "Bis morgen Abend werde ich den Bericht fertiggestellt haben.",
                "positiveTr": "Yarın akşama kadar raporu tamamlamış olacağım.",
                "negative": "Bis Freitag werde ich das Projekt noch nicht ganz beendet haben.",
                "negativeTr": "Cuma gününe kadar projeyi henüz tamamen bitirememiş olacağım.",
                "question": "Wirst du das Buch bis Montag gelesen haben?",
                "questionTr": "Pazartesiye kadar kitabı okumuş olacak mısın?"
            },
            {
                "positive": "Er wird den Zug wohl verpasst haben.",
                "positiveTr": "Treni kaçırmış olmalı (geçmişe tahmin).",
                "negative": "Sie wird die Nachricht wahrscheinlich noch nicht gesehen haben.",
                "negativeTr": "O mesajı muhtemelen henüz görmemiştir.",
                "question": "Wird der Flieger pünktlich gelandet sein?",
                "questionTr": "Uçak vaktinde inmiş olacak mı?"
            },
            {
                "positive": "Bis zum nächsten Jahr werden wir das Haus gebaut haben.",
                "positiveTr": "Gelecek yıla kadar evi inşa etmiş olacağız.",
                "negative": "Vor Ablauf des Monats werden wir die Genehmigung noch nicht erhalten haben.",
                "negativeTr": "Ay sonundan önce izni henüz almış olmayacağız.",
                "question": "Wird sie bis dahin ihr Studium abgeschlossen haben?",
                "questionTr": "O zamana kadar üniversite eğitimini tamamlamış olacak mı?"
            },
            {
                "positive": "Er wird die Prüfung bestanden haben, er hat fleißig gelernt.",
                "positiveTr": "Sınavı geçmiş olmalı, çok gayretli çalıştı.",
                "negative": "Sie werden das Ziel ohne Karte kaum erreicht haben.",
                "negativeTr": "Harita olmadan hedefe pek ulaşmış olamazlar.",
                "question": "Wird er bis 18 Uhr zu Hause angekommen sein?",
                "questionTr": "Saat 18'e kadar eve varmış olacak mı?"
            },
            {
                "positive": "In zehn Jahren wird sich die Technologie komplett verändert haben.",
                "positiveTr": "On yıl içinde teknoloji tamamen değişmiş olacaktır.",
                "negative": "Die Probleme werden sich bis dahin nicht von selbst gelöst haben.",
                "negativeTr": "Sorunlar o zamana kadar kendiliğinden çözülmüş olmayacaktır.",
                "question": "Werden wir bis dahin eine nachhaltige Lösung gefunden haben?",
                "questionTr": "O zamana kadar sürdürülebilir bir çözüm bulmuş olacak mıyız?"
            }
        ]
    },
    {
        "id": "de_m_1",
        "title": "Können (Modalverb)",
        "trTitle": "Yetenek / Olasılık / İzin (-ebilmek)",
        "category": "Kipler (Modalverben)",
        "formula": "Çekim: ich kann, du kannst, er kann, wir können, ihr könnt, sie können | S + können + ... + Infinitiv",
        "usage": "Fiziksel veya zihinsel yetenek, yapabilirlik, izin isteme ve olasılık durumlarında kullanılır.",
        "examples": [
            {
                "positive": "Er kann vier verschiedene Sprachen fließend sprechen.",
                "positiveTr": "O dört farklı dili akıcı bir şekilde konuşabiliyor.",
                "negative": "Ich kann leider nicht schwimmen.",
                "negativeTr": "Ben maalesef yüzemiyorum.",
                "question": "Kannst du mir bitte bei dieser Aufgabe helfen?",
                "questionTr": "Lütfen bana bu görevde yardımcı olabilir misin?"
            },
            {
                "positive": "Wir können das Problem gemeinsam lösen.",
                "positiveTr": "Sorunu birlikte çözebiliriz.",
                "negative": "Ohne Passwort können Sie sich nicht einloggen.",
                "negativeTr": "Şifre olmadan giriş yapamazsınız.",
                "question": "Können wir hier mit Kreditkarte bezahlen?",
                "questionTr": "Burada kredi kartıyla ödeme yapabilir miyiz?"
            },
            {
                "positive": "Sie kann wunderschön Klavier spielen.",
                "positiveTr": "O harika piyano çalabiliyor.",
                "negative": "Er kann heute wegen Krankheit nicht zur Arbeit kommen.",
                "negativeTr": "O bugün hastalık sebebiyle işe gelemiyor.",
                "question": "Könnt ihr morgen Abend zu unserer Party kommen?",
                "questionTr": "Yarın akşam partimize gelebilir misiniz?"
            },
            {
                "positive": "Man kann von hier aus die Berge sehen.",
                "positiveTr": "Buradan dağlar görülebiliyor.",
                "negative": "Man kann die Zeit leider nicht zurückdrehen.",
                "negativeTr": "Zamanı maalesef geriye alamazsınız.",
                "question": "Kann man diesen Tisch reservieren?",
                "questionTr": "Bu masayı rezerve edebilir miyiz?"
            },
            {
                "positive": "Du kannst dein Auto auf unserem Parkplatz abstellen.",
                "positiveTr": "Arabanı bizim otoparkımıza bırakabilirsin.",
                "negative": "Hier kann man sonntags keine Lebensmittel einkaufen.",
                "negativeTr": "Pazar günleri buradan gıda alışverişi yapılamaz.",
                "question": "Können Sie mir den Weg zum Hauptbahnhof erklären?",
                "questionTr": "Bana ana gara giden yolu tarif edebilir misiniz?"
            }
        ]
    },
    {
        "id": "de_m_2",
        "title": "Müssen (Modalverb)",
        "trTitle": "Zorunluluk / Mecburiyet (Zorunda Olmak)",
        "category": "Kipler (Modalverben)",
        "formula": "Çekim: ich muss, du musst, er muss, wir müssen, ihr müsst, sie müssen | S + müssen + ... + Infinitiv",
        "usage": "Kaçınılmaz zorunlulukları ifade eder. DİKKAT: 'nicht müssen' zorunda olmamak (isteğe bağlılık) demektir.",
        "examples": [
            {
                "positive": "Ich muss heute pünktlich beim Arzt sein.",
                "positiveTr": "Bugün tam vaktinde doktorda olmalıyım.",
                "negative": "Du musst morgen nicht früh aufstehen, es ist Sonntag.",
                "negativeTr": "Yarın erken kalkmak zorunda değilsin, günlerden pazar.",
                "question": "Musst du heute Abend noch arbeiten?",
                "questionTr": "Bu akşam daha çalışmak zorunda mısın?"
            },
            {
                "positive": "Alle Passagiere müssen ihren Reisepass vorzeigen.",
                "positiveTr": "Tüm yolcular pasaportlarını göstermek zorundadır.",
                "negative": "Sie müssen das Formular nicht sofort ausfüllen.",
                "negativeTr": "Formu hemen doldurmak zorunda değilsiniz.",
                "question": "Müssen wir hier umsteigen?",
                "questionTr": "Burada aktarma yapmak zorunda mıyız?"
            },
            {
                "positive": "Er muss täglich seine Medikamente einnehmen.",
                "positiveTr": "O her gün ilaçlarını almak zorunda.",
                "negative": "Wir müssen keine zusätzliche Gebühr bezahlen.",
                "negativeTr": "Ekstra bir ücret ödemek zorunda değiliz.",
                "question": "Musst du den gesamten Text übersetzen?",
                "questionTr": "Bütün metni çevirmek zorunda mısın?"
            },
            {
                "positive": "Die Studenten müssen bis Freitag ihre Arbeiten abgeben.",
                "positiveTr": "Öğrenciler ödevlerini cuma gününe kadar teslim etmek zorundalar.",
                "negative": "Man muss nicht reich sein, um glücklich zu leben.",
                "negativeTr": "Mutlu yaşamak için zengin olmak zorunda değilsiniz.",
                "question": "Muss ich eine Maske tragen?",
                "questionTr": "Maske takmak zorunda mıyım?"
            },
            {
                "positive": "Wir müssen jetzt eine wichtige Entscheidung treffen.",
                "positiveTr": "Şimdi önemli bir karar vermek zorundayız.",
                "negative": "Er muss sich wegen der Verspätung keine Sorgen machen.",
                "negativeTr": "Gecikme yüzünden endişelenmek zorunda değil.",
                "question": "Müsst ihr wirklich schon nach Hause gehen?",
                "questionTr": "Gerçekten şimdiden eve gitmek zorunda mısınız?"
            }
        ]
    },
    {
        "id": "de_m_3",
        "title": "Dürfen (Modalverb)",
        "trTitle": "İzin / Yasak (İzni Olmak / -e bilmek)",
        "category": "Kipler (Modalverben)",
        "formula": "Çekim: ich darf, du darfst, er darf, wir dürfen, ihr dürft, sie dürfen | S + dürfen + ... + Infinitiv | Yasak: nicht dürfen",
        "usage": "Kurallara bağlı izinleri veya 'nicht dürfen' ile kesin yasakları ifade etmek için kullanılır.",
        "examples": [
            {
                "positive": "Hier darf man kostenlos parken.",
                "positiveTr": "Buraya ücretsiz park edilebilir (izin var).",
                "negative": "Hier darf man auf keinen Fall rauchen.",
                "negativeTr": "Burada kesinlikle sigara içilemez (yasaktır).",
                "question": "Darf ich Ihnen eine kurze Frage stellen?",
                "questionTr": "Size kısa bir soru sorabilir miyim?"
            },
            {
                "positive": "Kinder unter 6 Jahren dürfen hier umsonst mitfahren.",
                "positiveTr": "6 yaş altı çocuklar burada ücretsiz seyahat edebilir.",
                "negative": "Man darf im Museum keine Fotos mit Blitz machen.",
                "negativeTr": "Müzede flaşla fotoğraf çekmek yasaktır.",
                "question": "Dürfen wir diesen Raum betreten?",
                "questionTr": "Bu odaya girebilir miyiz?"
            },
            {
                "positive": "Mit diesem Ausweis dürfen Sie den VIP-Bereich nutzen.",
                "positiveTr": "Bu kimlikle VIP alanını kullanabilirsiniz.",
                "negative": "Du darfst ohne Führerschein kein Auto fahren.",
                "negativeTr": "Ehliyetsiz araba kullanamazsın (yasak).",
                "question": "Darf ich das Fenster kurz öffnen?",
                "questionTr": "Pencereyi kısa bir süre açabilir miyim?"
            },
            {
                "positive": "Nach der Operation darf der Patient wieder spazieren gehen.",
                "positiveTr": "Ameliyattan sonra hasta tekrar yürüyüşe çıkabilir.",
                "negative": "Hunde dürfen nicht in den Supermarkt mitgebracht werden.",
                "negativeTr": "Köpeklerin süpermarkete sokulması yasaktır.",
                "question": "Dürfen Besucher nach 20 Uhr im Krankenhaus bleiben?",
                "questionTr": "Ziyaretçiler saat 20'den sonra hastanede kalabilir mi?"
            },
            {
                "positive": "Sie dürfen während des Fluges Ihr Smartphone im Flugmodus benutzen.",
                "positiveTr": "Uçuş sırasında akıllı telefonunuzu uçak modunda kullanabilirsiniz.",
                "negative": "Man darf bei roter Ampel die Straße nicht überqueren.",
                "negativeTr": "Kırmızı ışıkta karşıdan karşıya geçilemez.",
                "question": "Darf ich mir diesen Stuhl nehmen?",
                "questionTr": "Bu sandalyeyi alabilir miyim?"
            }
        ]
    },
    {
        "id": "de_m_4",
        "title": "Sollen (Modalverb)",
        "trTitle": "Gereklilik / Tavsiye / Başkasının İsteği (-malı)",
        "category": "Kipler (Modalverben)",
        "formula": "Çekim: ich soll, du sollst, er soll, wir sollen, ihr sollt, sie sollen | S + sollen + ... + Infinitiv",
        "usage": "Bir başkasının verdiği görevi, doktor tavsiyesini veya genel önerileri ifade eder.",
        "examples": [
            {
                "positive": "Der Arzt sagt, ich soll viel Wasser trinken und mich ausruhen.",
                "positiveTr": "Doktor çok su içmem ve dinlenmem gerektiğini söylüyor.",
                "negative": "Du sollst vor dem Schlafengehen keinen Kaffee trinken.",
                "negativeTr": "Yatmadan önce kahve içmemelisin.",
                "question": "Soll ich das Fenster schließen?",
                "questionTr": "Pencereyi kapatayım mı?"
            },
            {
                "positive": "Wir sollen laut Vertrag pünktlich die Miete überweisen.",
                "positiveTr": "Sözleşmeye göre kirayı zamanında havale etmeliyiz.",
                "negative": "Man soll andere Menschen nicht nach ihrem Äußeren beurteilen.",
                "negativeTr": "İnsanları dış görünüşlerine göre yargılamamalıyız.",
                "question": "Was soll ich jetzt tun?",
                "questionTr": "Şimdi ne yapmalıyım?"
            },
            {
                "positive": "Sie soll sich sofort beim Chef melden.",
                "positiveTr": "Onun hemen müdüre görünmesi gerekiyor.",
                "negative": "Du sollst keine Geheimnisse verraten.",
                "negativeTr": "Sırları açığa vurmamalısın.",
                "question": "Sollen wir ein Taxi rufen?",
                "questionTr": "Taksi çağıralım mı?"
            },
            {
                "positive": "Kinder sollen täglich an der frischen Luft spielen.",
                "positiveTr": "Çocuklar her gün temiz havada oynamalı.",
                "negative": "Man soll bei Glatteis nicht zu schnell fahren.",
                "negativeTr": "Buzlanma varken çok hızlı sürülmemeli.",
                "question": "Um wie viel Uhr soll ich morgen da sein?",
                "questionTr": "Yarın saat kaçta orada olmalıyım?"
            },
            {
                "positive": "Es soll laut Wetterbericht heute noch regnen.",
                "positiveTr": "Hava durumuna göre bugün daha yağmur yağacakmış.",
                "negative": "Du sollst dich von ungesunden Snacks fernhalten.",
                "negativeTr": "Sağlıksız atıştırmalıklardan uzak durmalısın.",
                "question": "Sollen wir das Treffen auf nächste Woche verschieben?",
                "questionTr": "Toplantıyı gelecek haftaya erteleyelim mi?"
            }
        ]
    },
    {
        "id": "de_m_5",
        "title": "Wollen (Modalverb)",
        "trTitle": "İstek / Kesin Niyet / İrade (İstemek)",
        "category": "Kipler (Modalverben)",
        "formula": "Çekim: ich will, du willst, er will, wir wollen, ihr wollt, sie wollen | S + wollen + ... + Infinitiv",
        "usage": "Kişinin kendi güçlü iradesini, kesin niyetini veya planladığı hedefini belirtir.",
        "examples": [
            {
                "positive": "Ich will im Sommer meine Deutschkenntnisse perfektionieren.",
                "positiveTr": "Yazın Almanca bilgimi mükemmelleştirmek istiyorum.",
                "negative": "Er will seinen alten Job nicht mehr weiter ausüben.",
                "negativeTr": "O eski mesleğini artık sürdürmek istemiyor.",
                "question": "Willst du heute Abend mit ins Kino kommen?",
                "questionTr": "Bu akşam bizimle sinemaya gelmek istiyor musun?"
            },
            {
                "positive": "Wir wollen nächstes Jahr eine neue Wohnung kaufen.",
                "positiveTr": "Gelecek yıl yeni bir daire satın almak istiyoruz.",
                "negative": "Sie will über dieses private Thema nicht sprechen.",
                "negativeTr": "O bu özel konu hakkında konuşmak istemiyor.",
                "question": "Was wollt ihr am Wochenende unternehmen?",
                "questionTr": "Hafta sonu ne yapmak istiyorsunuz?"
            },
            {
                "positive": "Der Student will nach dem Abschluss im Ausland arbeiten.",
                "positiveTr": "Öğrenci mezuniyetten sonra yurt dışında çalışmak istiyor.",
                "negative": "Ich will keine Zeit mit unwichtigen Dingen verschwenden.",
                "negativeTr": "Önemsiz şeylerle zaman kaybetmek istemiyorum.",
                "question": "Wollt ihr wirklich den ganzen Weg zu Fuß gehen?",
                "questionTr": "Gerçekten bütün yolu yürüyerek mi gitmek istiyorsunuz?"
            },
            {
                "positive": "Sie will ihrer Familie eine große Freude machen.",
                "positiveTr": "Ailesine büyük bir sevinç yaşatmak istiyor.",
                "negative": "Er will die Wahrheit einfach nicht akzeptieren.",
                "negativeTr": "O gerçeği bir türlü kabul etmek istemiyor.",
                "question": "Will der Kunde das Produkt zurückgeben?",
                "questionTr": "Müşteri ürünü iade etmek mi istiyor?"
            },
            {
                "positive": "Wir wollen unsere Umwelt aktiv vor Verschmutzung schützen.",
                "positiveTr": "Çevremizi kirliliğe karşı aktif bir şekilde korumak istiyoruz.",
                "negative": "Sie wollen keine Kompromisse eingehen.",
                "negativeTr": "Uzlaşmaya varmak istemiyorlar.",
                "question": "Willst du ein Glas Wasser trinken?",
                "questionTr": "Bir bardak su içmek ister misin?"
            }
        ]
    },
    {
        "id": "de_m_6",
        "title": "Möchten (Konjunktiv II)",
        "trTitle": "Kibar İstek / Arzu (Rica Etmek / İstemek)",
        "category": "Kipler (Modalverben)",
        "formula": "Çekim: ich möchte, du möchtest, er möchte, wir möchten, ihr möchtet, sie möchten | S + möchten + ... + Infinitiv",
        "usage": "Restoranda, alışverişte ve günlük diyaloglarda 'wollen' fiilinin kibar halidir.",
        "examples": [
            {
                "positive": "Ich möchte bitte einen Kaffee mit Milch bestellen.",
                "positiveTr": "Lütfen sütlü bir kahve sipariş etmek istiyorum.",
                "negative": "Ich möchte im Moment keinen Zucker in meinem Tee.",
                "negativeTr": "Şu anda çayımda şeker istemiyorum.",
                "question": "Möchten Sie lieber Tee oder Kaffee trinken?",
                "questionTr": "Çay mı yoksa kahve mi içmeyi tercih edersiniz?"
            },
            {
                "positive": "Wir möchten gerne einen Tisch für vier Personen reservieren.",
                "positiveTr": "Dört kişilik bir masa ayırtmak istiyoruz.",
                "negative": "Er möchte heute Abend lieber nicht ausgehen.",
                "negativeTr": "O bu akşam dışarı çıkmamayı tercih ediyor.",
                "question": "Was möchten Sie zur Hauptspeise essen?",
                "questionTr": "Ana yemek olarak ne yemek istersiniz?"
            },
            {
                "positive": "Sie möchte sich für das interessante Stipendium bewerben.",
                "positiveTr": "O bu ilgi çekici bursa başvurmak istiyor.",
                "negative": "Wir möchten Sie bei der Arbeit nicht stören.",
                "negativeTr": "Sizi çalışırken rahatsız etmek istemeyiz.",
                "question": "Möchtest du ein Stück von diesem leckeren Kuchen probieren?",
                "questionTr": "Bu lezzetli pastadan bir parça denemek ister misin?"
            },
            {
                "positive": "Der Gast möchte bitte mit dem Geschäftsführer sprechen.",
                "positiveTr": "Misafir lütfen genel müdürle görüşmek istiyor.",
                "negative": "Ich möchte heute keine Überstunden machen.",
                "negativeTr": "Bugün fazla mesai yapmak istemiyorum.",
                "question": "Möchten Sie die Rechnung zusammen oder getrennt bezahlen?",
                "questionTr": "Hesabı birlikte mi yoksa ayrı ayrı mı ödemek istersiniz?"
            },
            {
                "positive": "Ich möchte mich ganz herzlich bei Ihnen bedanken.",
                "positiveTr": "Size yürekten teşekkür etmek istiyorum.",
                "negative": "Sie möchte ihre Entscheidung nicht bereuen.",
                "negativeTr": "Kararından pişman olmak istemiyor.",
                "question": "Möchtet ihr noch etwas Nachtisch?",
                "questionTr": "Tatlı bir şeyler daha ister misiniz?"
            }
        ]
    },
    {
        "id": "de_str_1",
        "title": "Passiv (Vorgangspassiv)",
        "trTitle": "Edilgen Çatı (Yapılmak / Edilmek)",
        "category": "Yapılar (Strukturen)",
        "formula": "Präsens: S + werden + ... + Partizip II | Präteritum: S + wurden + ... + Partizip II",
        "usage": "Eylemi yapanın değil yapılan işin veya etkilenen nesnenin önemli olduğu durumlarda kullanılır.",
        "examples": [
            {
                "positive": "Das neue Schulgebäude wird von den Bauarbeitern renoviert.",
                "positiveTr": "Yeni okul binası inşaat işçileri tarafından yenileniyor.",
                "negative": "Diese alte Brücke wird im Winter nicht repariert.",
                "negativeTr": "Bu eski köprü kışın onarılmıyor.",
                "question": "Wird die Tür nachts immer abgeschlossen?",
                "questionTr": "Kapı geceleri her zaman kilitlenir mi?"
            },
            {
                "positive": "Der spannende Brief wurde gestern Abend verschickt.",
                "positiveTr": "Heyecan verici mektup dün akşam gönderildi.",
                "negative": "Die Rechnung wurde leider noch nicht bezahlt.",
                "negativeTr": "Fatura maalesef henüz ödenmedi.",
                "question": "Wurde das Paket schon zugestellt?",
                "questionTr": "Paket teslim edildi mi?"
            },
            {
                "positive": "Das Auto ist in der Werkstatt repariert worden.",
                "positiveTr": "Araba tamirhanede tamir edildi.",
                "negative": "Die Dokumente sind bisher nicht gefunden worden.",
                "negativeTr": "Belgeler şu ana kadar bulunamadı.",
                "question": "Ist das Zimmer für den neuen Gast vorbereitet worden?",
                "questionTr": "Oda yeni misafir için hazırlandı mı?"
            },
            {
                "positive": "In Deutschland wird viel Brot gegessen.",
                "positiveTr": "Almanya'da çok ekmek yenir.",
                "negative": "Hier wird kein Alkohol ausgeschenkt.",
                "negativeTr": "Burada alkol servisi yapılmaz.",
                "question": "Wird Deutsch an Ihrer Schule unterrichtet?",
                "questionTr": "Okulunuzda Almanca dersi veriliyor mu?"
            },
            {
                "positive": "Alle Fehler wurden vom Lehrer sorgfältig korrigiert.",
                "positiveTr": "Tüm hatalar öğretmen tarafından dikkatle düzeltildi.",
                "negative": "Die Informationen wurden den Mitarbeitern nicht mitgeteilt.",
                "negativeTr": "Bilgiler çalışanlara bildirilmedi.",
                "question": "Wurden die Gäste pünktlich am Flughafen abgeholt?",
                "questionTr": "Misafirler havalimanından vaktinde karşılandı mı?"
            }
        ]
    },
    {
        "id": "de_str_2",
        "title": "Konjunktiv II",
        "trTitle": "Dilek / Şart / Hayali Durumlar (Keşke / Olsa)",
        "category": "Yapılar (Strukturen)",
        "formula": "würde + Infinitiv | wäre (sein) | hätte (haben) | könnte / müsste",
        "usage": "Hayali durumları, kibar ricaları ve gerçekleşmemiş şartları anlatır.",
        "examples": [
            {
                "positive": "Wenn ich viel Zeit hätte, würde ich eine Weltreise machen.",
                "positiveTr": "Çok zamanım olsaydı, dünya turuna çıkardım.",
                "negative": "Wenn es nicht so kalt wäre, würden wir spazieren gehen.",
                "negativeTr": "Hava bu kadar soğuk olmasaydı, yürüyüşe çıkardık.",
                "question": "Würdest du mir bitte das Salz reichen?",
                "questionTr": "Lütfen bana tuzu uzatır mıydın?"
            },
            {
                "positive": "An deiner Stelle würde ich das verlockende Angebot annehmen.",
                "positiveTr": "Senin yerinde olsaydım bu cazip teklifi kabul ederdim.",
                "negative": "Ohne deine Hilfe wäre ich nicht so schnell fertig geworden.",
                "negativeTr": "Senin yardımın olmasaydı bu kadar çabuk bitiremezdim.",
                "question": "Hättest du morgen Zeit für ein kurzes Gespräch?",
                "questionTr": "Yarın kısa bir görüşme için vaktin olur muydu?"
            },
            {
                "positive": "Ich wäre jetzt so gerne am sonnigen Strand.",
                "positiveTr": "Şu an güneşli sahilde olmayı ne kadar çok isterdim.",
                "negative": "Er würde so ein unhöfliches Verhalten niemals tolerieren.",
                "negativeTr": "O böyle kaba bir davranışı asla hoş görmezdi.",
                "question": "Könnten Sie mir bitte den Weg zeigen?",
                "questionTr": "Lütfen bana yolu gösterebilir miydiniz?"
            },
            {
                "positive": "Wenn wir mehr Geld hätten, würden wir ein größeres Haus kaufen.",
                "positiveTr": "Daha çok paramız olsaydı daha büyük bir ev alırdık.",
                "negative": "Sie wäre nicht traurig, wenn du ehrlich gewesen wärst.",
                "negativeTr": "Dürüst olsaydın o üzülmezdi.",
                "question": "Was würdest du tun, wenn du eine Million Euro gewinnen würdest?",
                "questionTr": "Bir milyon avro kazansaydın ne yapardın?"
            },
            {
                "positive": "Es wäre fantastisch, wenn alle Menschen in Frieden leben könnten.",
                "positiveTr": "Tüm insanların barış içinde yaşayabilmesi harika olurdu.",
                "negative": "Ich würde nicht dorthin gehen, wenn es zu gefährlich ist.",
                "negativeTr": "Çok tehlikeliyse oraya gitmezdim.",
                "question": "Wäre es möglich, den Termin um eine Stunde zu verschieben?",
                "questionTr": "Randevuyu bir saat ertelemek mümkün olur muydu?"
            }
        ]
    },
    {
        "id": "de_str_3",
        "title": "Trennbare Verben",
        "trTitle": "Ayrılabilen Fiiller (aufstehen, mitkommen...)",
        "category": "Yapılar (Strukturen)",
        "formula": "Präsens: S + Fiil Kökü + ... + Önek (Cümle Sonu) | Perfekt: auf-ge-standen",
        "usage": "ab-, an-, auf-, aus-, ein-, mit-, vor-, zu- gibi önekler alan fiiller ana cümlede ayrılarak önek cümlenin en sonuna gider.",
        "examples": [
            {
                "positive": "Ich stehe jeden Morgen um sechs Uhr auf.",
                "positiveTr": "Her sabah saat altıda kalkarım (aufstehen).",
                "negative": "Er schläft am Wochenende nicht gerne früh ein.",
                "negativeTr": "Hafta sonu erken uykuya dalmayı sevmez (einschlafen).",
                "question": "Kommst du heute Abend zur Feier mit?",
                "questionTr": "Bu akşam kutlamaya birlikte geliyor musun? (mitkommen)"
            },
            {
                "positive": "Der Zug kommt pünktlich am Berliner Hauptbahnhof an.",
                "positiveTr": "Tren Berlin Ana Garı'na vaktinde varıyor (ankommen).",
                "negative": "Sie macht das Licht im Zimmer nicht aus.",
                "negativeTr": "O odadaki ışığı kapatmıyor (ausmachen).",
                "question": "Rufst du deine Großmutter heute noch an?",
                "questionTr": "Büyükanneni bugün arayacak mısın? (anrufen)"
            },
            {
                "positive": "Wir kaufen samstags immer im großen Supermarkt ein.",
                "positiveTr": "Cumartesi günleri hep büyük süpermarketten alışveriş yaparız (einkaufen).",
                "negative": "Er hört dem Vortragenden überhaupt nicht zu.",
                "negativeTr": "O konuşmacıyı hiç dinlemiyor (zuhören).",
                "question": "Bereitet ihr die Präsentation gemeinsam vor?",
                "questionTr": "Sunumu birlikte mi hazırlıyorsunuz? (vorbereiten)"
            },
            {
                "positive": "Sie lädt alle ihre Freunde zu ihrer Geburtstagsfeier ein.",
                "positiveTr": "O tüm arkadaşlarını doğum günü partisine davet ediyor (einladen).",
                "negative": "Der Bus fährt an dieser Haltestelle heute nicht ab.",
                "negativeTr": "Otobüs bugün bu duraktan hareket etmiyor (abfahren).",
                "question": "Machst du bitte die Tür zu?",
                "questionTr": "Lütfen kapıyı kapatır mısın? (zumachen)"
            },
            {
                "positive": "Ich ziehe mir eine warme Winterjacke an.",
                "positiveTr": "Üzerime sıcak bir kışlık ceket giyiyorum (anziehen).",
                "negative": "Er gibt sein schwer verdientes Geld nicht unnötig aus.",
                "negativeTr": "Zor kazandığı parasını gereksizce harcamıyor (ausgeben).",
                "question": "Steigst du an der nächsten Haltestelle aus?",
                "questionTr": "Bir sonraki durakta mı iniyorsun? (aussteigen)"
            }
        ]
    },
    {
        "id": "de_str_4",
        "title": "Kasus: Akkusativ & Dativ",
        "trTitle": "İsmin Halleri (-i Hali & -e/-de Hali)",
        "category": "Yapılar (Strukturen)",
        "formula": "Akkusativ: der ➔ den, das ➔ das, die ➔ die | Dativ: der ➔ dem, das ➔ dem, die ➔ der, die (Pl.) ➔ den (+n)",
        "usage": "Akkusativ (belirtme) düz tümleç / eylemin doğrudan nesnesiyken; Dativ (yönelme/bulunma) dolaylı tümleçtir.",
        "examples": [
            {
                "positive": "Ich sehe den freundlichen Mann im Park.",
                "positiveTr": "Parktaki samimi adamı görüyorum (Akkusativ: den Mann).",
                "negative": "Ich kenne diesen neuen Nachbarn leider nicht.",
                "negativeTr": "Bu yeni komşuyu maalesef tanımıyorum.",
                "question": "Hast du den Schlüssel für die Wohnung gefunden?",
                "questionTr": "Dairenin anahtarını buldun mu?"
            },
            {
                "positive": "Ich helfe dem alten Mann beim Überqueren der Straße.",
                "positiveTr": "Yaşlı adama caddeden geçerken yardım ediyorum (Dativ: dem Mann).",
                "negative": "Dieses Buch gehört mir nicht.",
                "negativeTr": "Bu kitap bana ait değil (gehören + Dativ).",
                "question": "Gefällt dir diese schöne Musik?",
                "questionTr": "Bu güzel müzik hoşuna gidiyor mu? (gefallen + Dativ)"
            },
            {
                "positive": "Der Lehrer gibt der fleißigen Schülerin ein nützliches Buch.",
                "positiveTr": "Öğretmen çalışkan kız öğrenciye faydalı bir kitap veriyor (Dativ & Akkusativ).",
                "negative": "Er antwortet seinem Chef heute nicht.",
                "negativeTr": "O bugün müdürüne cevap vermiyor (antworten + Dativ).",
                "question": "Schreibst du deinen Freunden eine Ansichtskarte?",
                "questionTr": "Arkadaşlarına bir kartpostal yazıyor musun?"
            },
            {
                "positive": "Wir danken Ihnen für Ihre wertvolle Unterstützung.",
                "positiveTr": "Değerli desteğiniz için size teşekkür ederiz (danken + Dativ).",
                "negative": "Er hat den langen Brief noch nicht gelesen.",
                "negativeTr": "O uzun mektubu henüz okumadı (Akkusativ).",
                "question": "Kannst du mir den genauen Weg erklären?",
                "questionTr": "Bana tam yolu açıklayabilir misin?"
            },
            {
                "positive": "Sie gratuliert ihrem besten Freund zum Geburtstag.",
                "positiveTr": "O en iyi arkadaşının doğum gününü kutluyor (gratulieren + Dativ).",
                "negative": "Ich kaufe diesen teuren Anzug nicht.",
                "negativeTr": "Bu pahalı takımı satın almıyorum (Akkusativ).",
                "question": "Passt dir der Mantel gut?",
                "questionTr": "Kaban sana iyi uydu mu? (passen + Dativ)"
            }
        ]
    }
];
