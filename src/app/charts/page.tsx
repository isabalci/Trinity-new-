export default function ChartPage() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Grafikler</h1>
        <div className="flex items-center space-x-2">
          <select className="border rounded p-1 text-sm">
            <option>BTC/USD</option>
            <option>ETH/USD</option>
            <option>XRP/USD</option>
            <option>AAPL</option>
            <option>MSFT</option>
          </select>
          <select className="border rounded p-1 text-sm">
            <option>1 Dakika</option>
            <option>5 Dakika</option>
            <option>15 Dakika</option>
            <option>1 Saat</option>
            <option>1 Gün</option>
          </select>
        </div>
      </div>
      
      <div className="flex-1 border rounded-lg bg-white dark:bg-tradingview-dark flex items-center justify-center">
        <p className="text-center">Grafik bileşeni burada yüklenecek.</p>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium mb-1">Teknik Göstergeler</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs">RSI (14)</span>
              <span className="text-xs font-medium">65.42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">MACD (12,26,9)</span>
              <span className="text-xs font-medium">0.0023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Bollinger Bands</span>
              <span className="text-xs font-medium">Orta</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium mb-1">Önemli Seviyeler</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs">Destek 1</span>
              <span className="text-xs font-medium">45,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Destek 2</span>
              <span className="text-xs font-medium">44,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Direnç 1</span>
              <span className="text-xs font-medium">47,500</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium mb-1">İşlem Hacmi</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs">24s Hacim</span>
              <span className="text-xs font-medium">1.2B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Ort. Hacim (30g)</span>
              <span className="text-xs font-medium">1.5B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Hacim Oranı</span>
              <span className="text-xs font-medium">0.8</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium mb-1">Son İşlemler</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs">46,320</span>
              <span className="text-xs text-tradingview-green">+0.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">46,280</span>
              <span className="text-xs text-tradingview-red">-0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">46,305</span>
              <span className="text-xs text-tradingview-green">+0.05%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 