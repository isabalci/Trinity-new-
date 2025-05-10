import React from 'react';

export default function WatchlistPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">İzleme Listeleri</h1>
        <div className="flex items-center gap-2">
          <button className="bg-tradingview-blue text-white px-4 py-2 rounded flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Liste
          </button>
          <button className="border px-4 py-2 rounded flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ekle
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* İzleme Listeleri Menüsü */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-tradingview-dark border rounded-lg p-4 mb-4">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Listelerde Ara..." 
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <ul className="space-y-1">
              <li className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-tradingview-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="font-medium">Ana İzleme Listesi</span>
                </div>
                <span className="text-xs text-gray-500">12</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Kripto</span>
                </div>
                <span className="text-xs text-gray-500">8</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Teknoloji Hisseleri</span>
                </div>
                <span className="text-xs text-gray-500">15</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Forex</span>
                </div>
                <span className="text-xs text-gray-500">6</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>BIST-100</span>
                </div>
                <span className="text-xs text-gray-500">20</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-tradingview-dark border rounded-lg p-4">
            <h3 className="font-bold mb-2">Popüler İzleme Listeleri</h3>
            <ul className="space-y-1">
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Trendde Olanlar</span>
                </div>
                <span className="text-xs text-gray-500">30+</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Yükselenler</span>
                </div>
                <span className="text-xs text-gray-500">25+</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  <span>Düşenler</span>
                </div>
                <span className="text-xs text-gray-500">25+</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* İzleme Listesi İçeriği */}
        <div className="lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Ana İzleme Listesi</h2>
              <span className="ml-2 text-sm text-gray-500">(12 sembol)</span>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Listede Ara..." 
                className="border rounded px-3 py-2"
              />
              <button className="border p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
              <select className="border rounded p-2">
                <option>Tüm Türler</option>
                <option>Hisse Senetleri</option>
                <option>Kripto</option>
                <option>Forex</option>
                <option>Emtia</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="py-2 px-4 border text-left">Sembol</th>
                  <th className="py-2 px-4 border text-left">İsim</th>
                  <th className="py-2 px-4 border text-right">Son Fiyat</th>
                  <th className="py-2 px-4 border text-right">Değişim %</th>
                  <th className="py-2 px-4 border text-right">Değişim</th>
                  <th className="py-2 px-4 border text-right">Hacim</th>
                  <th className="py-2 px-4 border text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">AAPL</td>
                  <td className="py-2 px-4 border">Apple Inc.</td>
                  <td className="py-2 px-4 border text-right">187.32</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+1.23%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+2.28</td>
                  <td className="py-2 px-4 border text-right">52.3M</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">MSFT</td>
                  <td className="py-2 px-4 border">Microsoft Corporation</td>
                  <td className="py-2 px-4 border text-right">412.65</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+0.87%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+3.56</td>
                  <td className="py-2 px-4 border text-right">22.1M</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">BTC/USD</td>
                  <td className="py-2 px-4 border">Bitcoin / USD</td>
                  <td className="py-2 px-4 border text-right">46,512.75</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+2.26%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+1,027.45</td>
                  <td className="py-2 px-4 border text-right">28.5B</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">GOOGL</td>
                  <td className="py-2 px-4 border">Alphabet Inc.</td>
                  <td className="py-2 px-4 border text-right">141.82</td>
                  <td className="py-2 px-4 border text-right text-tradingview-red">-0.42%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-red">-0.60</td>
                  <td className="py-2 px-4 border text-right">18.9M</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">ETH/USD</td>
                  <td className="py-2 px-4 border">Ethereum / USD</td>
                  <td className="py-2 px-4 border text-right">2,465.32</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+1.87%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+45.28</td>
                  <td className="py-2 px-4 border text-right">12.7B</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">AMZN</td>
                  <td className="py-2 px-4 border">Amazon.com, Inc.</td>
                  <td className="py-2 px-4 border text-right">178.12</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+1.05%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-green">+1.86</td>
                  <td className="py-2 px-4 border text-right">31.2M</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border">TSLA</td>
                  <td className="py-2 px-4 border">Tesla, Inc.</td>
                  <td className="py-2 px-4 border text-right">242.64</td>
                  <td className="py-2 px-4 border text-right text-tradingview-red">-2.18%</td>
                  <td className="py-2 px-4 border text-right text-tradingview-red">-5.41</td>
                  <td className="py-2 px-4 border text-right">104.8M</td>
                  <td className="py-2 px-4 border text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafik</button>
                      <button className="text-xs bg-green-600 text-white px-2 py-1 rounded">Al</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Mini Grafikler */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold">AAPL</h3>
                  <p className="text-sm text-gray-500">Apple Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$187.32</p>
                  <p className="text-sm text-tradingview-green">+1.23%</p>
                </div>
              </div>
              <div className="h-32 border-t pt-2">
                <div className="text-center text-gray-500 h-full flex items-center justify-center">
                  <p>Mini grafik burada gösterilecek</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold">BTC/USD</h3>
                  <p className="text-sm text-gray-500">Bitcoin / USD</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$46,512.75</p>
                  <p className="text-sm text-tradingview-green">+2.26%</p>
                </div>
              </div>
              <div className="h-32 border-t pt-2">
                <div className="text-center text-gray-500 h-full flex items-center justify-center">
                  <p>Mini grafik burada gösterilecek</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-white dark:bg-tradingview-dark">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold">TSLA</h3>
                  <p className="text-sm text-gray-500">Tesla, Inc.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$242.64</p>
                  <p className="text-sm text-tradingview-red">-2.18%</p>
                </div>
              </div>
              <div className="h-32 border-t pt-2">
                <div className="text-center text-gray-500 h-full flex items-center justify-center">
                  <p>Mini grafik burada gösterilecek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 