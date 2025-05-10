import React from 'react';

export default function ProfilePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-white dark:bg-tradingview-dark">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Ahmet Yılmaz</h2>
              <p className="text-gray-500">@ahmetyilmaz</p>
              <p className="text-gray-500 mt-1">Üyelik: Ocak 2023</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Başarı Seviyesi</span>
                <span className="font-medium">Orta Düzey</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                <div className="h-2 bg-tradingview-blue rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <h3 className="font-medium mb-2">Hızlı İstatistikler</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Toplam İşlem</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Başarılı İşlemler</span>
                  <span className="font-medium text-tradingview-green">74 (58%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Portföyler</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">İzleme Listeleri</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 px-4 bg-tradingview-blue text-white rounded">Ayarlar</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 bg-white dark:bg-tradingview-dark mt-4">
            <h3 className="font-medium mb-3">Bağlantılar</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 border rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-posta Doğrula
              </button>
              <button className="w-full py-2 px-4 border rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Telefon Ekle
              </button>
              <button className="w-full py-2 px-4 border rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                2FA Etkinleştir
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="border rounded-lg bg-white dark:bg-tradingview-dark p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Profil Detayları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Ad Soyad</label>
                <input 
                  type="text" 
                  className="w-full border rounded p-2" 
                  value="Ahmet Yılmaz"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Kullanıcı Adı</label>
                <input 
                  type="text" 
                  className="w-full border rounded p-2" 
                  value="ahmetyilmaz"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">E-posta</label>
                <input 
                  type="email" 
                  className="w-full border rounded p-2" 
                  value="ahmet.yilmaz@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Telefon</label>
                <input 
                  type="text" 
                  className="w-full border rounded p-2" 
                  placeholder="Telefon numarası ekleyin"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Hakkımda</label>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows={4}
                  placeholder="Kendiniz hakkında bilgi ekleyin"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="py-2 px-6 bg-tradingview-blue text-white rounded">Değişiklikleri Kaydet</button>
            </div>
          </div>
          
          <div className="border rounded-lg bg-white dark:bg-tradingview-dark p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Performans Özeti</h2>
            
            <div className="h-64 border rounded-lg bg-gray-50 dark:bg-gray-800 mb-4 flex items-center justify-center">
              <p className="text-center text-gray-500">Performans grafiği burada gösterilecek</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm text-gray-500 mb-1">Toplam Kâr/Zarar</h3>
                <p className="text-xl font-bold text-tradingview-green">+₺24,586.42</p>
                <span className="text-xs text-tradingview-green">+18.7% toplam</span>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-sm text-gray-500 mb-1">Ortalama Getiri</h3>
                <p className="text-xl font-bold">%12.3</p>
                <span className="text-xs">Aylık</span>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-sm text-gray-500 mb-1">Başarı Oranı</h3>
                <p className="text-xl font-bold">%58</p>
                <span className="text-xs">74/127 işlem</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg bg-white dark:bg-tradingview-dark p-6">
            <h2 className="text-xl font-bold mb-4">Son İşlemlerim</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="py-2 px-4 text-left">Sembol</th>
                    <th className="py-2 px-4 text-left">Tür</th>
                    <th className="py-2 px-4 text-right">Fiyat</th>
                    <th className="py-2 px-4 text-right">Miktar</th>
                    <th className="py-2 px-4 text-right">Değer</th>
                    <th className="py-2 px-4 text-right">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">BTC/USDT</td>
                    <td className="py-2 px-4 text-tradingview-green">Alış</td>
                    <td className="py-2 px-4 text-right">45,230.50</td>
                    <td className="py-2 px-4 text-right">0.0250</td>
                    <td className="py-2 px-4 text-right">1,130.76</td>
                    <td className="py-2 px-4 text-right text-sm">12 Haz 2023</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">AAPL</td>
                    <td className="py-2 px-4 text-tradingview-red">Satış</td>
                    <td className="py-2 px-4 text-right">185.40</td>
                    <td className="py-2 px-4 text-right">5</td>
                    <td className="py-2 px-4 text-right">927.00</td>
                    <td className="py-2 px-4 text-right text-sm">10 Haz 2023</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">ETH/USDT</td>
                    <td className="py-2 px-4 text-tradingview-green">Alış</td>
                    <td className="py-2 px-4 text-right">2,354.25</td>
                    <td className="py-2 px-4 text-right">0.5</td>
                    <td className="py-2 px-4 text-right">1,177.13</td>
                    <td className="py-2 px-4 text-right text-sm">8 Haz 2023</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">MSFT</td>
                    <td className="py-2 px-4 text-tradingview-green">Alış</td>
                    <td className="py-2 px-4 text-right">395.24</td>
                    <td className="py-2 px-4 text-right">3</td>
                    <td className="py-2 px-4 text-right">1,185.72</td>
                    <td className="py-2 px-4 text-right text-sm">5 Haz 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-tradingview-blue">Tüm İşlemleri Görüntüle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 