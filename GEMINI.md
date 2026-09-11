# LexiGoo - Proje Geliştirme ve Mimari Kuralları (GEMINI.md)

Bu dosya, LexiGoo projesinde çalışırken yapay zeka asistanının ve geliştiricilerin uyması gereken temel mimari prensipleri, kodlama standartlarını ve iş akışlarını tanımlar.

---

## 📌 Proje Özeti ve Vizyonu
**LexiGoo**, kullanıcıların yabancı dil (İngilizce ve Almanca) kelime dağarcığını ve gramer yapılarını interaktif kartlar, sınavlar (quiz), detaylı sözlük ve sesli telaffuz (TTS) desteğiyle geliştirmesini sağlayan, tamamen istemci taraflı (client-side) çalışan modern bir Progresif Web Uygulamasıdır (PWA).

- **Tasarım Dili:** Modern Koyu Cam Teması (Dark Glassmorphism), neon mavi ve mor vurgular, mikro etkileşimler.
- **Platform:** Masaüstü ve mobil uyumlu (responsive), mobil cihazlarda alt dock gezinme çubuğu.

---

## 🧱 Teknoloji Yığını ve Kısıtlamalar

1. **Framework Bağımsızlığı:**
   - Proje **saf (vanilla) JavaScript, HTML5 ve CSS3** ile yazılmıştır.
   - React, Vue, jQuery, Tailwind gibi harici derleme adımı (build step) gerektiren veya ağır kütüphaneler **eklenmemelidir**.
2. **Kütüphaneler ve CDN:**
   - İkonlar: FontAwesome 6 (CDN)
   - Fontlar: Google Fonts ('Inter', sans-serif)
   - Telaffuz: Tarayıcı yerel Web Speech API (`speechSynthesis`)
3. **PWA & Çevrimdışı Çalışma:**
   - Uygulama internetsiz ortamda da tüm temel fonksiyonlarıyla çalışabilmelidir.
   - Yeni bir CSS, JS veya statik dosya eklendiğinde/güncellendiğinde `service-worker.js` içerisindeki önbellek listesi (`STATIC_FILES`) ve `CACHE_NAME` sürümü güncellenmelidir.

---

## 📁 Dosya Yapısı ve Sorumluluklar

| Dosya / Dizin | Sorumluluk |
| :--- | :--- |
| `index.html` | Ana HTML yapısı, modal pencereler, drawer menü ve sekmeler (`tabs`). |
| `style.css` | Değişkenler tabanlı CSS, glassmorphism stilleri, mobil responsive düzenlemeler. |
| `script.js` | Uygulama iş mantığı, durum yönetimi (state), arayüz çevirileri (i18n), ses sentezi. |
| `words_db.js` | İngilizce 3800+ temel/ileri seviye kelime veritabanı (`WORDS_DATABASE`). |
| `tenses_db.js` | İngilizce zamanlar ve modalların yapısal şablonları (`TENSES_DATABASE`). |
| `words_de_db.js` | Almanca A1-B2 kelime, artikel ve örnek cümle veritabanı (`WORDS_DE_DATABASE`). |
| `tenses_de_db.js` | Almanca zamanlar ve cümle yapıları veritabanı (`TENSES_DE_DATABASE`). |
| `service-worker.js`| PWA önbellekleme ve çevrimdışı çalışma motoru. |
| `manifest.json` | PWA kurulum ayarları ve ikon tanımlamaları. |

---

## ⚙️ Kodlama Standartları ve İlkeler

### 1. Durum (State) ve Veritabanı Yönetimi
- **Aktif Hedef Dil:** Kullanıcının çalıştığı dil `currentLearningLang` değişkeninde tutulur (`'en'` veya `'de'`).
- **Arayüz Dili:** `currentInterfaceLang` değişkeninde tutulur (`'tr'`, `'en'` veya `'de'`).
- **Veri Kaynağı:** Kelime listeleri varsayılan veritabanı ile kullanıcının eklediği özel kelimelerin (`localStorage`) birleşiminden dinamik olarak oluşturulur:
  - İngilizce özel kelimeler: `custom_words_en`
  - Almanca özel kelimeler: `custom_words_de`

### 2. İki Dilli Yapı (EN / DE) Uyumluluğu
- Yeni bir kelime/kart/sözlük özelliği eklendiğinde **hem İngilizce hem de Almanca** modunda eksiksiz çalıştığı test edilmelidir.
- Almanca isimlerde artikeller (`der`, `die`, `das`) ve isim tipi (`Nomen (m./f./n.)`) titizlikle korunmalıdır.
- Cümle ve kelime seslendirmelerinde ilgili dile uygun ses kodu kullanılmalıdır:
  - İngilizce: `en-US` veya `en-GB`
  - Almanca: `de-DE`

### 3. Arayüz ve Çoklu Dil Desteği (i18n)
- HTML içinde metinler doğrudan sabit bırakılmamalı; `data-i18n` özniteliği atanmalı ve `script.js` içerisindeki `i18n[lang]` sözlüğüne eklenmelidir.
- Arayüz dili değiştirildiğinde `applyTranslations()` fonksiyonu tüm `[data-i18n]` elemanlarını günceller.

### 4. DOM ve Stil İlkeleri
- Stil tanımları inline yapılmamalı, `style.css` içerisindeki CSS sınıfları ve CSS değişkenleri (`var(--accent-cyan)`, `var(--bg-glass)` vb.) kullanılmalıdır.
- Mobil uyumlulukta alt dock (`bottom-nav`) ile çakışmaları önlemek için alt boşluklara (`padding-bottom: 90px`) dikkat edilmelidir.

---

## 🚀 Git ve Sürüm Kontrol Kuralları
- Commit mesajları **Conventional Commits** standartlarına uygun yazılmalıdır (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`).
- `agy-hud`, `.DS_Store`, `Thumbs.db` ve geçici geliştirici araçları depoya dahil edilmemeli, `.gitignore` güncel tutulmalıdır.
- Uzak depo: `origin/main` (`https://github.com/AidenVanya/english-app.git`).
