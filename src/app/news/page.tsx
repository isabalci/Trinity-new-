import React from 'react';

export default function NewsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Piyasa Haberleri</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0 mb-4">
          <button className="px-4 py-2 bg-tradingview-blue text-white rounded">Tüm Haberler</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Kripto</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Forex</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Hisse Senetleri</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Ekonomi</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Emtialar</button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <input 
              type="text" 
              placeholder="Haber ara..." 
              className="w-full px-4 py-2 border rounded" 
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="border rounded p-2">
              <option>En Son</option>
              <option>Popüler</option>
              <option>En Çok Okunan</option>
              <option>Etkisi Yüksek</option>
            </select>
            <button className="p-2 border rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Öne Çıkan Haberler */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Öne Çıkan Haberler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg overflow-hidden bg-white dark:bg-tradingview-dark">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500">Haber görseli</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Ekonomi</span>
                <span className="text-xs text-gray-500">15 dakika önce</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Fed Başkanı Powell: Faiz indirimleri için acele etmeyeceğiz</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                Federal Rezerv Başkanı Jerome Powell, enflasyonun hedeflenen seviyeye gelmeden faiz indirimine gitmek istemediklerini belirtti. Ekonomistler, bu açıklamanın piyasaları nasıl etkileyeceğini değerlendiriyor.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Kaynak: Bloomberg</span>
                <button className="text-tradingview-blue">Daha Fazla</button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-white dark:bg-tradingview-dark">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500">Haber görseli</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Kripto</span>
                <span className="text-xs text-gray-500">1 saat önce</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Bitcoin 47.000 doları aştı, yükseliş devam ediyor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                Bitcoin, kurumsal yatırımcıların ilgisinin artmasıyla birlikte 47.000 dolar seviyesini aştı. Analistler, bu yükselişin arkasındaki sebepleri ve gelecek tahminlerini paylaşıyor.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Kaynak: CoinDesk</span>
                <button className="text-tradingview-blue">Daha Fazla</button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-white dark:bg-tradingview-dark">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500">Haber görseli</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Teknoloji</span>
                <span className="text-xs text-gray-500">3 saat önce</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Apple'ın yeni AI girişimleri hisse değerini yükseltti</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                Apple, yapay zeka alanındaki yeni yatırımlarını duyurdu. Şirketin bu hamleleri sonrası hisseleri %3 değer kazandı. Piyasa uzmanları bu gelişmenin uzun vadeli etkilerini değerlendiriyor.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Kaynak: CNBC</span>
                <button className="text-tradingview-blue">Daha Fazla</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Son Haberler */}
      <div>
        <h2 className="text-xl font-bold mb-4">Son Haberler</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4 lg:w-1/5 bg-gray-200 dark:bg-gray-700 rounded h-32 flex items-center justify-center">
                <p className="text-gray-500">Haber görseli</p>
              </div>
              <div className="md:w-3/4 lg:w-4/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">Hisse Senetleri</span>
                    <span className="text-xs text-gray-500">20 dakika önce</span>
                  </div>
                  <span className="text-sm text-gray-500">Kaynak: Reuters</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Tesla, yeni fabrika yatırımı için Asya'da görüşmeler yapıyor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Tesla, Asya'daki üretim kapasitesini artırmak için yeni fabrika yatırımı konusunda çeşitli ülkelerle görüşmeler yapıyor. Bu gelişme, şirketin küresel genişleme stratejisinin bir parçası olarak değerlendiriliyor.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-xs border px-2 py-1 rounded">TSLA</button>
                    <span className="text-xs text-tradingview-red">-1.4%</span>
                  </div>
                  <button className="text-tradingview-blue">Daha Fazla</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4 lg:w-1/5 bg-gray-200 dark:bg-gray-700 rounded h-32 flex items-center justify-center">
                <p className="text-gray-500">Haber görseli</p>
              </div>
              <div className="md:w-3/4 lg:w-4/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">Emtia</span>
                    <span className="text-xs text-gray-500">45 dakika önce</span>
                  </div>
                  <span className="text-sm text-gray-500">Kaynak: Financial Times</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Altın fiyatları rekor seviyelere ulaştı, yatırımcılar güvenli limana koşuyor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Küresel ekonomik belirsizlikler ve jeopolitik gerilimler, altın fiyatlarını rekor seviyelere taşıdı. Uzmanlar, değerli metale olan talebin önümüzdeki dönemde de güçlü kalmasını bekliyor.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-xs border px-2 py-1 rounded">XAU/USD</button>
                    <span className="text-xs text-tradingview-green">+0.8%</span>
                  </div>
                  <button className="text-tradingview-blue">Daha Fazla</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4 lg:w-1/5 bg-gray-200 dark:bg-gray-700 rounded h-32 flex items-center justify-center">
                <p className="text-gray-500">Haber görseli</p>
              </div>
              <div className="md:w-3/4 lg:w-4/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Forex</span>
                    <span className="text-xs text-gray-500">1.5 saat önce</span>
                  </div>
                  <span className="text-sm text-gray-500">Kaynak: Bloomberg</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Dolar, Euro karşısında değer kaybediyor, merkez bankalarının kararları bekleniyor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Dolar, Euro karşısında değer kaybetmeye devam ediyor. Piyasalar, bu hafta açıklanacak olan FED ve ECB'nin faiz kararlarına odaklanmış durumda. Analistler, bu kararların döviz kurları üzerindeki potansiyel etkilerini değerlendiriyor.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-xs border px-2 py-1 rounded">EUR/USD</button>
                    <span className="text-xs text-tradingview-green">+0.3%</span>
                  </div>
                  <button className="text-tradingview-blue">Daha Fazla</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4 lg:w-1/5 bg-gray-200 dark:bg-gray-700 rounded h-32 flex items-center justify-center">
                <p className="text-gray-500">Haber görseli</p>
              </div>
              <div className="md:w-3/4 lg:w-4/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Kripto</span>
                    <span className="text-xs text-gray-500">2 saat önce</span>
                  </div>
                  <span className="text-sm text-gray-500">Kaynak: Decrypt</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Ethereum 2.0'a geçiş süreci hızlanıyor, ETH fiyatı yükselişte</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Ethereum geliştiricileri, Ethereum 2.0'a geçiş sürecinin hızlandığını duyurdu. Bu gelişme sonrası ETH fiyatı %5'in üzerinde değer kazandı. Kripto para uzmanları, bu geçişin sektör üzerindeki etkilerini değerlendiriyor.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-xs border px-2 py-1 rounded">ETH/USD</button>
                    <span className="text-xs text-tradingview-green">+5.2%</span>
                  </div>
                  <button className="text-tradingview-blue">Daha Fazla</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="bg-tradingview-blue text-white px-6 py-3 rounded-lg">Daha Fazla Haber Yükle</button>
        </div>
      </div>
    </div>
  );
} 