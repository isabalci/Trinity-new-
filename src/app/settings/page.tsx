import React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-tradingview-dark border rounded-lg p-4">
            <ul className="space-y-1">
              <li className="py-2 px-3 bg-blue-50 dark:bg-blue-900 rounded font-medium text-tradingview-blue">
                Genel Ayarlar
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Görünüm
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Dil & Bölge
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Bildirimler
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Hesap Güvenliği
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Ticaret Tercihleri
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Grafik Ayarları
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                API Anahtarları
              </li>
              <li className="py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Hesap Bilgileri
              </li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-tradingview-dark border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Genel Ayarlar</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Tema</h3>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="theme" className="mr-2" checked />
                    <span>Karanlık</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="theme" className="mr-2" />
                    <span>Aydınlık</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="theme" className="mr-2" />
                    <span>Sistem Ayarlarını Kullan</span>
                  </label>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Zaman Dilimi</h3>
                <div className="mb-2">
                  <select className="w-full md:w-1/2 border rounded p-2">
                    <option>UTC+03:00 (İstanbul)</option>
                    <option>UTC+00:00 (Londra)</option>
                    <option>UTC-05:00 (New York)</option>
                    <option>UTC-08:00 (Los Angeles)</option>
                    <option>UTC+08:00 (Hong Kong)</option>
                    <option>UTC+09:00 (Tokyo)</option>
                  </select>
                </div>
                <div className="text-sm text-gray-500">
                  Zaman dilimi tüm grafikleri, işlem zamanlarını ve olay takvimlerini etkiler.
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Tarih Formatı</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="dateFormat" className="mr-2" checked />
                    <span>DD/MM/YYYY (31/12/2023)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="dateFormat" className="mr-2" />
                    <span>MM/DD/YYYY (12/31/2023)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="dateFormat" className="mr-2" />
                    <span>YYYY/MM/DD (2023/12/31)</span>
                  </label>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Oturum</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Otomatik Oturum Kapatma</p>
                      <p className="text-sm text-gray-500">Belirli bir süre işlem yapılmadığında otomatik çıkış yap</p>
                    </div>
                    <select className="border rounded p-2">
                      <option>Asla</option>
                      <option>30 dakika</option>
                      <option>1 saat</option>
                      <option>4 saat</option>
                      <option>8 saat</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="rememberMe" className="mr-2" checked />
                    <label htmlFor="rememberMe">Beni hatırla</label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Başlangıç Ekranı</h3>
                <div className="mb-2">
                  <select className="w-full md:w-1/2 border rounded p-2">
                    <option>Ana Sayfa</option>
                    <option>Grafikler</option>
                    <option>Portföy</option>
                    <option>İzleme Listesi</option>
                    <option>Piyasalar</option>
                  </select>
                </div>
                <div className="text-sm text-gray-500">
                  Trinity'yi açtığınızda gösterilecek varsayılan sayfa.
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Arayüz Ayarları</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span>Animasyonları göster</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span>Veri güncelleme bildirimlerini göster</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Yeni özellik ipuçlarını göster</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span>Otomatik sayfa yenileme</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="py-2 px-6 bg-tradingview-blue text-white rounded">Değişiklikleri Kaydet</button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-tradingview-dark border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Veri Ayarları</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Veri Güncellemeleri</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span>Gerçek zamanlı veri güncellemelerini etkinleştir</span>
                  </label>
                  <div className="text-sm text-gray-500 ml-6">
                    Bu özellik kapatıldığında, veriler otomatik olarak yenilenmeyecektir.
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Veri Gösterimi</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ondalık Basamak Sayısı</p>
                      <p className="text-sm text-gray-500">Fiyatlar için gösterilecek ondalık basamak sayısı</p>
                    </div>
                    <select className="border rounded p-2">
                      <option>Otomatik</option>
                      <option>2 basamak</option>
                      <option>4 basamak</option>
                      <option>6 basamak</option>
                      <option>8 basamak</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Baz Para Birimi</p>
                      <p className="text-sm text-gray-500">Varsayılan para birimi</p>
                    </div>
                    <select className="border rounded p-2">
                      <option>TRY (₺)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Önbellek</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kullanılan Önbellek Boyutu</p>
                      <p className="text-sm text-gray-500">Tarayıcınızda saklanan geçici verilerin miktarı</p>
                    </div>
                    <span className="font-medium">24.7 MB</span>
                  </div>
                  
                  <button className="py-2 px-4 border rounded text-sm">Önbelleği Temizle</button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="py-2 px-6 bg-tradingview-blue text-white rounded">Değişiklikleri Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 