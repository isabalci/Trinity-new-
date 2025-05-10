import React from 'react';

export default function PortfolioPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Portföy</h1>
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="bg-tradingview-blue text-white px-4 py-2 rounded flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Pozisyon Ekle
          </button>
          <select className="border rounded p-2">
            <option>Ana Portföy</option>
            <option>Kripto Portföyü</option>
            <option>Hisse Senetleri</option>
            <option>Uzun Vadeli Yatırımlar</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Arama yapın..." 
            className="border rounded px-3 py-2"
          />
          <button className="p-2 border rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Portföy Özeti */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Toplam Değer</h3>
          <p className="text-2xl font-bold">₺124,568.45</p>
          <div className="flex items-center text-tradingview-green mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-sm">%3.24 (₺3,915.67)</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bugünkü Değişim</h3>
          <p className="text-2xl font-bold text-tradingview-green">+₺1,245.30</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-tradingview-green">+%1.01</span>
            <span className="mx-2 text-gray-400">|</span>
            <span>Günlük</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Açık Pozisyonlar</h3>
          <p className="text-2xl font-bold">12</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-tradingview-green">8 Kâr</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-tradingview-red">4 Zarar</span>
          </div>
        </div>
      </div>

      {/* Portföy Tablosu */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="py-2 px-4 border text-left">Sembol</th>
              <th className="py-2 px-4 border text-left">İsim</th>
              <th className="py-2 px-4 border text-right">Miktar</th>
              <th className="py-2 px-4 border text-right">Alış Fiyatı</th>
              <th className="py-2 px-4 border text-right">Mevcut Fiyat</th>
              <th className="py-2 px-4 border text-right">Değişim</th>
              <th className="py-2 px-4 border text-right">Toplam Değer</th>
              <th className="py-2 px-4 border text-center">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">AAPL</td>
              <td className="py-2 px-4 border">Apple Inc.</td>
              <td className="py-2 px-4 border text-right">10</td>
              <td className="py-2 px-4 border text-right">175.34</td>
              <td className="py-2 px-4 border text-right">187.32</td>
              <td className="py-2 px-4 border text-right text-tradingview-green">+%6.83</td>
              <td className="py-2 px-4 border text-right">1,873.20</td>
              <td className="py-2 px-4 border text-center">
                <div className="flex justify-center gap-2">
                  <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Düzenle</button>
                  <button className="text-xs bg-tradingview-red text-white px-2 py-1 rounded">Sat</button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">BTC</td>
              <td className="py-2 px-4 border">Bitcoin</td>
              <td className="py-2 px-4 border text-right">0.5</td>
              <td className="py-2 px-4 border text-right">42,300.00</td>
              <td className="py-2 px-4 border text-right">46,512.75</td>
              <td className="py-2 px-4 border text-right text-tradingview-green">+%9.96</td>
              <td className="py-2 px-4 border text-right">23,256.38</td>
              <td className="py-2 px-4 border text-center">
                <div className="flex justify-center gap-2">
                  <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Düzenle</button>
                  <button className="text-xs bg-tradingview-red text-white px-2 py-1 rounded">Sat</button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">MSFT</td>
              <td className="py-2 px-4 border">Microsoft Corporation</td>
              <td className="py-2 px-4 border text-right">15</td>
              <td className="py-2 px-4 border text-right">380.42</td>
              <td className="py-2 px-4 border text-right">412.65</td>
              <td className="py-2 px-4 border text-right text-tradingview-green">+%8.47</td>
              <td className="py-2 px-4 border text-right">6,189.75</td>
              <td className="py-2 px-4 border text-center">
                <div className="flex justify-center gap-2">
                  <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Düzenle</button>
                  <button className="text-xs bg-tradingview-red text-white px-2 py-1 rounded">Sat</button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">TSLA</td>
              <td className="py-2 px-4 border">Tesla, Inc.</td>
              <td className="py-2 px-4 border text-right">8</td>
              <td className="py-2 px-4 border text-right">262.35</td>
              <td className="py-2 px-4 border text-right">242.64</td>
              <td className="py-2 px-4 border text-right text-tradingview-red">-7.51%</td>
              <td className="py-2 px-4 border text-right">1,941.12</td>
              <td className="py-2 px-4 border text-center">
                <div className="flex justify-center gap-2">
                  <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Düzenle</button>
                  <button className="text-xs bg-tradingview-red text-white px-2 py-1 rounded">Sat</button>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 dark:bg-gray-800 font-bold">
              <td className="py-2 px-4 border" colSpan={6}>Toplam</td>
              <td className="py-2 px-4 border text-right">33,260.45</td>
              <td className="py-2 px-4 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Performans Grafiği */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Portföy Performansı</h2>
        <div className="h-72 border rounded-lg bg-white dark:bg-tradingview-dark p-4 flex items-center justify-center">
          <p className="text-center text-gray-500">Portföy performans grafiği burada gösterilecek</p>
        </div>
      </div>

      {/* Varlık Dağılımı */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Varlık Dağılımı</h2>
          <div className="h-64 border rounded-lg bg-white dark:bg-tradingview-dark p-4 flex items-center justify-center">
            <p className="text-center text-gray-500">Varlık dağılımı grafiği burada gösterilecek</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Sektör Dağılımı</h2>
          <div className="h-64 border rounded-lg bg-white dark:bg-tradingview-dark p-4 flex items-center justify-center">
            <p className="text-center text-gray-500">Sektör dağılımı grafiği burada gösterilecek</p>
          </div>
        </div>
      </div>
    </div>
  );
} 