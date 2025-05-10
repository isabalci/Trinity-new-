import React from 'react';

export default function TradePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Ticaret</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Grafik Alanı */}
        <div className="lg:col-span-3 border rounded-lg bg-white dark:bg-tradingview-dark p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">BTC/USDT</h2>
              <span className="ml-2 text-2xl font-bold">46,235.75</span>
              <span className="ml-2 text-tradingview-green">+2.34%</span>
            </div>
            <div className="flex items-center space-x-2">
              <select className="border rounded p-1 text-sm">
                <option>1 Dakika</option>
                <option>5 Dakika</option>
                <option>15 Dakika</option>
                <option>1 Saat</option>
                <option>1 Gün</option>
              </select>
              <button className="p-1 border rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="h-96 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
            <p className="text-center text-gray-500">Grafik gösterimi burada olacak</p>
          </div>
        </div>
        
        {/* Ticaret Formu */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg bg-white dark:bg-tradingview-dark p-4 mb-4">
            <div className="flex mb-4">
              <button className="flex-1 py-2 px-4 bg-tradingview-green text-white rounded-l font-medium">
                AL
              </button>
              <button className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r font-medium">
                SAT
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">İşlem Türü</label>
                <select className="w-full border rounded p-2 bg-white dark:bg-gray-800">
                  <option>Limit</option>
                  <option>Piyasa</option>
                  <option>Stop Limit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Fiyat (USDT)</label>
                <input type="text" className="w-full border rounded p-2" value="46,235.75" />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Miktar (BTC)</label>
                <input type="text" className="w-full border rounded p-2" placeholder="0.00" />
              </div>
              
              <div className="flex justify-between">
                <button className="py-1 px-2 text-xs border rounded">25%</button>
                <button className="py-1 px-2 text-xs border rounded">50%</button>
                <button className="py-1 px-2 text-xs border rounded">75%</button>
                <button className="py-1 px-2 text-xs border rounded">Max</button>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam (USDT)</label>
                <input type="text" className="w-full border rounded p-2" placeholder="0.00" />
              </div>
            </div>
            
            <button className="w-full py-3 bg-tradingview-green text-white rounded font-medium">
              AL BTC
            </button>
          </div>
          
          <div className="border rounded-lg bg-white dark:bg-tradingview-dark p-4">
            <h3 className="font-medium mb-3">Bakiye</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">BTC</span>
                <span className="text-sm font-medium">0.0542</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">USDT</span>
                <span className="text-sm font-medium">5,201.32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">EUR</span>
                <span className="text-sm font-medium">2,120.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emir Defteri ve İşlem Geçmişi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Emir Defteri */}
        <div className="lg:col-span-1 border rounded-lg bg-white dark:bg-tradingview-dark p-4">
          <h3 className="font-medium mb-3">Emir Defteri</h3>
          <div className="overflow-auto max-h-64">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="pb-2">Fiyat (USDT)</th>
                  <th className="pb-2">Miktar (BTC)</th>
                  <th className="pb-2 text-right">Toplam</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 text-tradingview-red">46,352.12</td>
                  <td className="py-1">0.0236</td>
                  <td className="py-1 text-right">1,093.91</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,345.50</td>
                  <td className="py-1">0.0412</td>
                  <td className="py-1 text-right">1,909.43</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,320.25</td>
                  <td className="py-1">0.1253</td>
                  <td className="py-1 text-right">5,803.93</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,300.00</td>
                  <td className="py-1">0.2000</td>
                  <td className="py-1 text-right">9,260.00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1 text-tradingview-red">46,285.47</td>
                  <td className="py-1">0.0518</td>
                  <td className="py-1 text-right">2,397.59</td>
                </tr>
                
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-2 font-medium" colSpan={3}>46,235.75</td>
                </tr>
                
                <tr>
                  <td className="py-1 text-tradingview-green">46,200.10</td>
                  <td className="py-1">0.0328</td>
                  <td className="py-1 text-right">1,515.36</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">46,185.25</td>
                  <td className="py-1">0.0752</td>
                  <td className="py-1 text-right">3,473.13</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">46,150.00</td>
                  <td className="py-1">0.1846</td>
                  <td className="py-1 text-right">8,519.29</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">46,125.80</td>
                  <td className="py-1">0.0629</td>
                  <td className="py-1 text-right">2,901.31</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Son İşlemler */}
        <div className="lg:col-span-1 border rounded-lg bg-white dark:bg-tradingview-dark p-4">
          <h3 className="font-medium mb-3">Son İşlemler</h3>
          <div className="overflow-auto max-h-64">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="pb-2">Fiyat (USDT)</th>
                  <th className="pb-2">Miktar (BTC)</th>
                  <th className="pb-2 text-right">Zaman</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 text-tradingview-green">46,235.75</td>
                  <td className="py-1">0.0215</td>
                  <td className="py-1 text-right text-xs">14:32:45</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,230.15</td>
                  <td className="py-1">0.0046</td>
                  <td className="py-1 text-right text-xs">14:32:38</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">46,235.75</td>
                  <td className="py-1">0.0318</td>
                  <td className="py-1 text-right text-xs">14:32:30</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">46,240.25</td>
                  <td className="py-1">0.0152</td>
                  <td className="py-1 text-right text-xs">14:32:28</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,238.60</td>
                  <td className="py-1">0.0025</td>
                  <td className="py-1 text-right text-xs">14:32:20</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">46,242.30</td>
                  <td className="py-1">0.0112</td>
                  <td className="py-1 text-right text-xs">14:32:15</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,240.00</td>
                  <td className="py-1">0.0078</td>
                  <td className="py-1 text-right text-xs">14:32:10</td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">46,235.10</td>
                  <td className="py-1">0.0065</td>
                  <td className="py-1 text-right text-xs">14:32:05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Açık Emirler */}
        <div className="lg:col-span-1 border rounded-lg bg-white dark:bg-tradingview-dark p-4">
          <h3 className="font-medium mb-3">Açık Emirlerim</h3>
          <div className="overflow-auto max-h-64">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="pb-2">Tür</th>
                  <th className="pb-2">Fiyat</th>
                  <th className="pb-2">Miktar</th>
                  <th className="pb-2 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 text-tradingview-green">Alış</td>
                  <td className="py-1">45,800.00</td>
                  <td className="py-1">0.0500</td>
                  <td className="py-1 text-right">
                    <button className="text-xs text-tradingview-red">İptal</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-red">Satış</td>
                  <td className="py-1">47,000.00</td>
                  <td className="py-1">0.0325</td>
                  <td className="py-1 text-right">
                    <button className="text-xs text-tradingview-red">İptal</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1 text-tradingview-green">Stop Alış</td>
                  <td className="py-1">46,500.00</td>
                  <td className="py-1">0.0200</td>
                  <td className="py-1 text-right">
                    <button className="text-xs text-tradingview-red">İptal</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-center">
            <button className="text-sm text-tradingview-blue">Tüm Emirleri Görüntüle</button>
          </div>
        </div>
      </div>
    </div>
  );
} 