# Trinity Platform - Ürün Gereksinimleri Dokümanı (PRD)

## 1. Genel Bakış
Öncelikle yanıtlarını türkçe ver.
Site açılırken hata ekranı gelmesin.
Tüm hataları düzeltmeden projeyi başlatmasın.
Trinity, TradingView ile birebir benzer yapıda tasarlanmış kapsamlı bir web tabanlı ticaret platformudur. Kullanıcılara finansal piyasa analizi, ticaret ve haber takibi için güçlü araçlar sunan bu platform, TradingView'in sayfa yapılarının aynısını içerecek şekilde tasarlanacaktır. Platform, profesyonel düzeyde bir deneyim sunmayı amaçlarken, her deneyim seviyesindeki yatırımcılar için sezgisel ve kullanıcı dostu bir arayüz sağlamayı hedeflemektedir.

## 2. Proje Hedefleri

- TradingView'in arayüz yapısı ve düzenini birebir takip eden, modern ve duyarlı bir ticaret platformu oluşturmak
- Tüm sayfa yapılarının düzgün ve hizalı olmasını sağlamak
- Çeşitli finansal enstrümanlar için gerçek zamanlı piyasa verileri, grafikler ve analiz araçları sağlamak
- Çoklu emir türleri ve portföy yönetimi ile sağlam ticaret işlevselliği uygulamak
- Entegre finansal haberler ve piyasa görüşleri sunmak
- Daha geniş bir kullanıcı tabanına hizmet vermek için hem İngilizce hem de Türkçe dil desteği sağlamak
- Güvenilir bir veritabanı arka planıyla ölçeklenebilir bir sistem oluşturmak
- Proje geliştirme sürecinde, farklı oturumlar arasında kaldığı yerden devam edebilecek bir yapı sağlamak

## 3. Hedef Kitle

- Aktif yatırımcılar (gün içi ve salınım yatırımcıları)
- Uzun vadeli yatırımcılar
- Finansal analistler ve araştırmacılar
- Finansal eğitim öğrencileri
- Ticaret hakkında bilgi edinmek isteyen piyasa meraklıları
- TradingView kullanıcıları ve bu arayüze alışkın olan yatırımcılar

## 4. Temel Özellikler

### 4.1 Kimlik Doğrulama ve Kullanıcı Yönetimi

- Güvenli kimlik doğrulama ile kullanıcı kaydı ve girişi
- Profil yönetimi ve özelleştirme
- Tercihler, bildirimler ve hesap güvenliği için ayarlar
- Uygun erişim izinleriyle kullanıcı rolleri
- Oturum yönetimi ve projeye kaldığı yerden devam edebilme

### 4.2 Gösterge Paneli (Dashboard)

- TradingView'in ana sayfa düzenine birebir benzer, sürüklenebilir widget'larla özelleştirilebilir düzen
- Piyasa koşullarına hızlı genel bakış
- Favori enstrümanlar için izleme listesi
- Portföy özeti ve performans metrikleri
- Piyasa haberleri öne çıkanlar
- Ekonomik takvim etkinlikleri
- Watchlist, haber akışı ve grafik panelleri için TradingView benzeri yerleşim

### 4.3 Piyasa Verileri ve Grafikler

- TradingView ile birebir aynı görünüm ve hisse sağlayan grafik arayüzü
- Çoklu zaman dilimleriyle (1d, 5d, 15d, 1s, 4s, 1G, 1H) gelişmiş grafik oluşturma
- Çeşitli grafik türleri desteği (mum, çizgi, alan vb.)
- Teknik göstergeler (Hareketli Ortalamalar, RSI, MACD, Bollinger Bantları vb.)
- Trend çizgileri, Fibonacci geri çekilmeleri vb. için çizim araçları
- Çoklu enstrüman karşılaştırması
- Özelleştirilebilir grafik temaları ve düzenleri
- Gerçek zamanlı veri güncellemeleri
- TradingView'deki gibi tam ekran grafik görünümü ve düzeni

### 4.4 Ticaret Arayüzü

- TradingView'in ticaret paneline benzer yapıda emir girişi arayüzü
- Çoklu emir türleri desteğiyle (piyasa, limit, stop) emir girişi
- Emir defteri görselleştirmesi
- Son işlemler gösterimi
- Pozisyon yönetimi
- Risk yönetimi araçları
- Ticaret geçmişi ve analitiği

### 4.5 Piyasalar Genel Bakış

- TradingView'in piyasa tarayıcı sayfasına benzer düzen
- Kapsamlı piyasa tarayıcı
- Sıralanabilir ve filtrelenebilir piyasa veri tabloları
- Sektör ve endüstri performansı
- Piyasa ısı haritaları
- Yükselenler/düşenler listeleri
- Hacim liderleri
- Kaydedilmiş filtreler ve görünümler

### 4.6 Finansal Haberler

- TradingView'in haber akışı düzenine benzer sayfa yapısı
- Finansal haber kaynaklarıyla entegrasyon
- Kategorize edilmiş haber akışı (kripto, forex, hisse senetleri, ekonomi, teknoloji)
- Haber arama ve filtreleme
- Makale okuma görünümü
- İlgililik sıralaması ve trend olan konular
- Tarihsel haber arşivi

### 4.7 Hesap ve Portföy

- TradingView'in portföy sayfasına benzer düzen
- Portföy takibi ve analizi
- Performans metrikleri ve görselleştirmeleri
- Ticaret günlüğü yeteneği
- Vergi raporlama araçları
- Para yatırma ve çekme yönetimi

### 4.8 Uyarılar ve Bildirimler

- TradingView'in uyarı arayüzüne benzer tasarım
- Fiyat uyarıları
- Teknik gösterge uyarıları
- Haber uyarıları
- Ekonomik takvim etkinlik hatırlatıcıları
- Sistem bildirimleri

### 4.9 Eğitim Kaynakları

- Ticaret kılavuzları ve öğreticileri
- Piyasa analiz metodolojisi
- Enstrümana özel bilgiler
- Finansal terimler sözlüğü
- SSS ve yardım merkezi

## 5. Teknik Gereksinimler

### 5.1 Ön Uç (Frontend)

- React tabanlı tek sayfalık uygulama
- TradingView'in arayüz tasarımı ve düzenini birebir taklit eden yapı
- Masaüstü, tablet ve mobil için duyarlı tasarım
- Modern UI çerçeveleri ve bileşen kütüphaneleri
- Context veya Redux kullanarak durum yönetimi
- Gerçek zamanlı veri işleme ve görselleştirme
- Çoklu dil desteği (İngilizce ve Türkçe)
- Erişilebilirlik uyumluluğu
- Grafik oluşturma için optimize edilmiş performans
- Oturum yönetimi ve projeye kaldığı yerden devam etme özelliği

### 5.2 Arka Uç (Backend)

- Express çerçevesi ile Node.js sunucusu
- RESTful API mimarisi
- WebSocket desteği ile gerçek zamanlı veri
- Kimlik doğrulama ara yazılımı ve güvenlik özellikleri
- Hız sınırlama ve istek doğrulama
- Loglama ve izleme
- Kullanıcı oturumları ve proje ilerlemesini takip edebilme

### 5.3 Veritabanı

- SQL veritabanı (PostgreSQL, MySQL veya SQLite)
- Finansal veriler için verimli şema tasarımı
- Optimal performans için veri normalleştirme
- Yedekleme ve kurtarma prosedürleri
- Migrasyon stratejileri
- Kullanıcı tercihlerini ve kaldığı yeri saklamak için verimli veri yapısı

### 5.4 Harici Entegrasyonlar

- Piyasa veri sağlayıcıları
- Haber API servisleri
- Ticaret yürütme servisleri
- Ödeme işleme (geçerli ise)
- Analitik ve izleme

### 5.5 DevOps

- Sürekli entegrasyon ve dağıtım
- Docker ile konteynerleştirme
- Ortam yapılandırma yönetimi
- İzleme ve uyarı
- Yedekleme prosedürleri
- Felaket kurtarma planlaması

## 6. İşlevsel Olmayan Gereksinimler

### 6.1 Performans

- TradingView'deki gibi hızlı yükleme süreleri
- Grafik oluşturma 60fps'de akıcı olmalı
- API yanıt süreleri 200ms altında
- WebSocket gecikmesi 100ms altında
- Büyük veri kümelerini verimli bir şekilde işleme desteği
- İlk sayfa yükleme süreleri için optimize edilmiş

### 6.2 Güvenlik

- Tüm bağlantılar için HTTPS
- JWT ile güvenli kimlik doğrulama
- Girdi doğrulama ve sanitizasyon
- Yaygın güvenlik açıklarına karşı koruma (XSS, CSRF vb.)
- Düzenli güvenlik denetimleri
- Finansal veri düzenlemelerine uygunluk

### 6.3 Güvenilirlik

- %99,9 sistem çalışma süresi hedefi
- Zarif hata işleme
- Veri kaynakları için yedek mekanizmalar
- Sorun giderme için kapsamlı loglama
- Otomatik izleme ve uyarı
- Oturum yönetimi ve kullanıcı ilerlemesini koruma

### 6.4 Ölçeklenebilirlik

- Yatay ölçekleme yeteneği
- Büyüyen veri kümeleri için veritabanı optimizasyonu
- Verimli kaynak kullanımı
- Önbellek stratejileri

### 6.5 Yerelleştirme

- İngilizce ve Türkçe diller için tam destek
- Yerelleştirilmiş tarih, saat ve sayı biçimleri
- Kültürel açıdan uygun tasarım öğeleri
- Gelecekte daha fazla dil ekleme için genişletilebilir çerçeve

## 7. Kullanıcı Arayüzü Gereksinimleri

### 7.1 Tasarım İlkeleri

- TradingView'in arayüz yapısını birebir takip eden temiz, profesyonel estetik
- Tutarlı markalaşma
- TradingView'deki gibi karanlık ve aydınlık tema seçenekleri
- İyi okunabilirlikle yüksek bilgi yoğunluğu
- Bağlamsal yardım ve araç ipuçları
- Tüm elemanların düzgün ve hizalı yerleşimi

### 7.2 Düzen

- TradingView sayfalarının birebir yerleşim düzenine sahip olma
- Duyarlı ızgara sistemi
- Özelleştirilebilir widget tabanlı gösterge paneli
- Kalıcı gezinme menüsü
- Ticaret için optimize edilmiş çalışma alanı
- Erişilebilirlik düşünceleri
- Sayfa geçişlerinde kullanıcı ilerlemesini koruma

### 7.3 Bileşenler

- TradingView'deki grafik bileşenine birebir benzer, kapsamlı özelleştirme ile grafik bileşeni
- Sıralama ve filtreleme ile piyasa veri tabloları
- Doğrulama ile sipariş giriş formları
- Önizleme ve tam okuma moduyla haber akışı
- Uyarılar ve bildirimler sistemi
- Kullanıcı durumunu koruyan oturum yönetimi bileşenleri

## 8. Geliştirme Yol Haritası ve İlerleme Durumu

### Aşama 1: Temel (TAMAMLANDI)
- ✅ Proje kurulumu ve mimarisi
- ✅ Kimlik doğrulama sistemi
- ✅ Temel UI çerçevesi ve gezinme
- ✅ Veritabanı şema tasarımı
- ✅ API yapısı ve temel uç noktaları
- ✅ Oturum yönetimi temel yapısı

### Aşama 2: Temel Ticaret Özellikleri (TAMAMLANDI)
- ✅ Piyasa verisi entegrasyonu
- ✅ Temel grafik işlevselliği
- ✅ İzleme listesi uygulaması
- ✅ Basit emir girişi
- ✅ İlk gösterge paneli
- ✅ Farklı oturumlar arası ilerleme koruması

### Aşama 3: Gelişmiş Özellikler (DEVAM EDİYOR)
- ✅ Gelişmiş grafik türleri ve temel göstergeler
- ✅ Emir defteri temel görünümü
- ✅ Piyasalar genel bakış sayfası
- ✅ TradingView benzeri sidebar eklenmesi
- ✅ Tam ekran modunda çalışma iyileştirmesi
- ⏳ Gelişmiş gösterge paneli özelleştirme
- ✅ Portföy takibi
- ⏳ Tüm grafik göstergeleri ekleme
- ⏳ Ticaret geçmişi

### Aşama 4: Haberler ve Analiz (DEVAM EDİYOR)
- ✅ Finansal haber entegrasyonu temel yapısı
- ✅ Haber kategorilendirme ve filtreleme
- ⏳ Piyasa görüşleri
- ⏳ Gelişmiş arama yetenekleri
- ⏳ Kaydedilmiş aramalar ve tercihler

### Aşama 5: İyileştirme ve Optimizasyon (PLANLANMIŞ)
- ✅ TypeScript hata düzeltmeleri
- ✅ TradingView benzeri daha modern arayüz uygulaması
- ⏳ Performans optimizasyonu
- ⏳ UI/UX iyileştirmeleri
- ⏳ Ek yerelleştirme
- ⏳ Hata düzeltmeleri ve sistem kararlılığı
- ⏳ Kullanıcı geri bildirimi uygulaması
- ⏳ Kullanıcı oturum yönetimi ve kaldığı yerden devam etme özelliğinin iyileştirilmesi

### Aşama 6: Ek Özellikler (PLANLANMIŞ)
- ⏳ Mobil duyarlılık geliştirmeleri
- ⏳ Ek varlık sınıfları
- ⏳ Gelişmiş uyarı sistemi
- ⏳ Eğitim içeriği
- ⏳ Gelişmiş analitik
- ⏳ sistemi
- ⏳Haberler kısmı güncel haberler çekilecek.
- ⏳Sitenin kendi içinde forum kısmı olacak.Bu forum kısmına botlar yorum yazabilecek.
- ⏳Tıpkı tradingviewdeki gibi yapay zeka ile güçlendirilmiş almalımı satmalımı öneride bulunacak matematiksel formül.


## 9. Başarı Metrikleri

- Kullanıcı katılımı (platformda geçirilen süre, kullanılan özellikler)
- TradingView'den Trinity'ye geçiş yapan kullanıcı sayısı
- Kullanıcı büyümesi ve tutma
- Sistem performans metrikleri
- Hata oranları ve çözüm süreleri
- Kullanıcı memnuniyet puanları
- Piyasa verilerinin doğruluğu ve zamanında olması
- Özellik benimseme oranları
- Kullanıcıların kaldıkları yerden devam etme başarı oranı

## 10. Varsayımlar ve Kısıtlamalar

### Varsayımlar

- Kullanıcıların finansal piyasalar hakkında temel anlayışı vardır
- JavaScript etkin modern tarayıcılar
- Güvenilir internet bağlantısı
- Piyasa veri kaynaklarına erişim
- Kullanıcıların TradingView arayüzüne aşinalığı

### Kısıtlamalar

- Piyasa verisi lisanslama maliyetleri ve sınırlamaları
- Düzenleyici uyumluluk gereksinimleri
- Tarayıcı uyumluluk düşünceleri
- Geliştirme ekibi büyüklüğü ve uzmanlığı

## 11. Proje Sürekliliği ve İlerleme Yönetimi

- Kullanıcıların projeye her girişte kaldıkları yerden devam edebilmesi
- Kullanıcı tercihlerinin, grafik ayarlarının ve izleme listelerinin kaydedilmesi
- Oturumlar arası veri sürekliliğinin sağlanması
- Proje geliştirme aşamalarında tutarlı ilerleme
- Geliştirme ekibinin projeye kaldığı yerden devam edebilmesi için gerekli dokümentasyon
- Kod tabanında düzenli ilerleyişi sağlayan git işlem stratejisi
- Kullanıcı geri bildirimleri doğrultusunda sürekli iyileştirme

## 12. Gelecek Düşünceleri

- Mobil uygulamalar (iOS, Android)
- Sosyal ticaret özellikleri
- Yapay zeka destekli piyasa görüşleri
- Gelişmiş geriye dönük test araçları
- Kağıt ticaret modu
- Üçüncü taraf entegrasyonları için API erişimi
- Ticaret stratejileri için pazar yeri

## 13. Yapılacak İşler Listesi ve Öncelikler (Güncel)

### Yüksek Öncelikli
- ✅ Sidebar eklenmesi ile TradingView benzeri arayüz geliştirmesi
- ✅ Tam ekran ve tam sayfa deneyimi iyileştirmeleri
- ✅ Proje başlangıç scriptinin oluşturulması
- ✅ TypeScript hatalarının düzeltilmesi
- TradingView'deki eksik grafik göstergelerinin eklenmesi
- Uygulama çalıştırma sürecini daha güvenilir hale getirmek
- Grafik arayüzündeki hizalama sorunlarının düzeltilmesi
- Responsive tasarımın iyileştirilmesi (mobil, tablet ve masaüstü)

### Orta Öncelikli
- Emir defteri arayüzünün geliştirilmesi
- Haber bileşeninin tamamlanması
- Türkçe dil desteğinin genişletilmesi
- Grafikler için ek çizim araçlarının eklenmesi
- Piyasa veri tablolarının filtreleme işlevlerinin geliştirilmesi
- Daha fazla kripto/forex/hisse senedi veri kaynağı eklenmesi

### Düşük Öncelikli
- Sosyal medya paylaşım özellikleri
- Gelişmiş portföy analizi araçları
- Ek finansal enstrüman desteği
- Gelişmiş mobil uyumluluk
- Gelişmiş API entegrasyonları

## 15. Son Geliştirme Oturumu Notu (Tarih: Güncel)

Son oturumda:
- Grafik bileşenini önemli ölçüde geliştirdik, daha temiz ve anlaşılır hale getirdik
- TypeScript hatalarını düzelttik ve kodu daha kararlı hale getirdik
- Portföy takibi özelliğini ekledik, kullanıcılar artık yatırımlarını izleyebilir
- Portföy performans grafiği ve varlık dağılımı görselleştirmesi ekledik
- İşlem geçmişi takibi için altyapı oluşturduk

Bir sonraki oturumda:
- Responsive tasarımın iyileştirilmesi
- Portföy için pozisyon ve işlem ekleme formlarının tamamlanması
- Grafik arayüzünün geliştirilmesi ve göstergelerin arttırılması
- Emir defteri ve ticaret geçmişi fonksiyonlarının tamamlanması
- Haber modülünün genişletilmesi

## 14. TradingView Referans Görselleri ve Linkleri

### Ana Arayüz Referansları

TradingView'in ana arayüzü, Trinity'nin temel alacağı tasarım kaynağıdır:

![TradingView Ana Arayüz](https://s3.tradingview.com/snapshots/n/n0BqG62j.png)

### Grafik Bileşeni Referansı

TradingView'in gelişmiş grafik bileşeni:

![TradingView Grafik Bileşeni](https://s3.tradingview.com/snapshots/q/QBsqZESo.png)

### Piyasa Genel Bakış Referansı

TradingView'in piyasa tarayıcı bölümü:

![TradingView Piyasa Genel Bakış](https://s3.tradingview.com/snapshots/m/mEXAc7XT.png)

### Önemli Referans Linkleri

1. [TradingView Ana Sayfa](https://www.tradingview.com/)
2. [TradingView Grafik Özellikleri](https://www.tradingview.com/chart/)
3. [TradingView Piyasa Genel Bakış](https://www.tradingview.com/markets/)
4. [TradingView Tarayıcı API Dokümantasyonu](https://www.tradingview.com/rest-api-spec/)
5. [TradingView Charting Library Dokümantasyonu](https://www.tradingview.com/charting-library-docs/)

### Arayüz Bileşenleri Karşılaştırmaları

| Bileşen | TradingView Özelliği | Trinity Hedefi |
|---------|----------------------|---------------|
| Grafik | Birden çok zaman dilimi, 100+ teknik gösterge | Birebir aynı görünüm ve işlevsellik |
| Emir Defteri | Gerçek zamanlı veriler, derinlik haritası | Aynı yerleşim ve özellikler |
| İzleme Listesi | Sürükle bırak, özelleştirilebilir sütunlar | Aynı kullanıcı deneyimi |
| Haberler | Kategorili akış, arama işlevi | Birebir arayüz kopyası |
| Tema | Koyu/Açık, özelleştirilebilir | Aynı tema seçenekleri |

---

Bu belge proje ilerledikçe gelişecektir. Düzenli incelemeler ve güncellemeler, iş hedefleri ve kullanıcı ihtiyaçlarıyla uyumu sağlayacaktır. Her yeni geliştirme oturumunda, kaldığımız yerden devam etmek için son ilerleme durumu incelenecek ve güncellenerek belgeye eklenecektir. 