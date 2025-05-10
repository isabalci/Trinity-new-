export default function MarketsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Piyasalar</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 bg-tradingview-blue text-white rounded">Hisse Senetleri</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Kripto</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Forex</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Emtialar</button>
          <button className="px-4 py-2 bg-white dark:bg-tradingview-dark text-gray-700 dark:text-gray-300 border rounded">Endeksler</button>
        </div>
        
        <div className="flex items-center mb-4">
          <input 
            type="text" 
            placeholder="Arama yapın..." 
            className="px-4 py-2 border rounded-l w-80" 
          />
          <button className="px-4 py-2 bg-tradingview-blue text-white rounded-r">Ara</button>
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
              <th className="py-2 px-4 border text-right">Piyasa Değeri</th>
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
              <td className="py-2 px-4 border text-right">2.94T</td>
              <td className="py-2 px-4 border text-right">52.3M</td>
              <td className="py-2 px-4 border text-right">
                <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafiği Görüntüle</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">MSFT</td>
              <td className="py-2 px-4 border">Microsoft Corporation</td>
              <td className="py-2 px-4 border text-right">412.65</td>
              <td className="py-2 px-4 border text-right text-tradingview-green">+0.87%</td>
              <td className="py-2 px-4 border text-right">3.07T</td>
              <td className="py-2 px-4 border text-right">22.1M</td>
              <td className="py-2 px-4 border text-right">
                <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafiği Görüntüle</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">GOOGL</td>
              <td className="py-2 px-4 border">Alphabet Inc.</td>
              <td className="py-2 px-4 border text-right">141.82</td>
              <td className="py-2 px-4 border text-right text-tradingview-red">-0.42%</td>
              <td className="py-2 px-4 border text-right">1.79T</td>
              <td className="py-2 px-4 border text-right">18.9M</td>
              <td className="py-2 px-4 border text-right">
                <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafiği Görüntüle</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">AMZN</td>
              <td className="py-2 px-4 border">Amazon.com, Inc.</td>
              <td className="py-2 px-4 border text-right">178.12</td>
              <td className="py-2 px-4 border text-right text-tradingview-green">+1.05%</td>
              <td className="py-2 px-4 border text-right">1.84T</td>
              <td className="py-2 px-4 border text-right">31.2M</td>
              <td className="py-2 px-4 border text-right">
                <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafiği Görüntüle</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border">TSLA</td>
              <td className="py-2 px-4 border">Tesla, Inc.</td>
              <td className="py-2 px-4 border text-right">242.64</td>
              <td className="py-2 px-4 border text-right text-tradingview-red">-2.18%</td>
              <td className="py-2 px-4 border text-right">771.5B</td>
              <td className="py-2 px-4 border text-right">104.8M</td>
              <td className="py-2 px-4 border text-right">
                <button className="text-xs bg-tradingview-blue text-white px-2 py-1 rounded">Grafiği Görüntüle</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm">Gösterilen: 1-5 / 100</span>
        </div>
        <div className="flex">
          <button className="px-3 py-1 border rounded-l">Önceki</button>
          <button className="px-3 py-1 bg-tradingview-blue text-white">1</button>
          <button className="px-3 py-1 border">2</button>
          <button className="px-3 py-1 border">3</button>
          <button className="px-3 py-1 border rounded-r">Sonraki</button>
        </div>
      </div>
    </div>
  );
} 