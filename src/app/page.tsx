import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Trinity Trading Platform'a Hoş Geldiniz</h1>
        <p className="text-gray-600 dark:text-gray-400">Profesyonel ticaret deneyimi için geliştirilmiş arayüz</p>
      </div>
      
      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">BTC/USDT</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">46,235.75</span>
            <span className="text-tradingview-green font-medium">+2.34%</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">ETH/USDT</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">2,456.30</span>
            <span className="text-tradingview-green font-medium">+1.67%</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">S&P 500</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">4,836.25</span>
            <span className="text-tradingview-red font-medium">-0.42%</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">BIST 100</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">8,923.15</span>
            <span className="text-tradingview-green font-medium">+0.78%</span>
          </div>
        </div>
      </div>
      
      {/* Ana İçerik Bölümü */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sol Sütun: Hızlı Grafikler */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">BTC/USDT Grafiği</h2>
              <Link href="/charts" className="text-tradingview-blue text-sm">Tam Ekran</Link>
            </div>
            <div className="h-64 border rounded-lg bg-gray-50 dark:bg-gray-800 mb-2 flex items-center justify-center">
              <p className="text-center text-gray-500">Grafik gösterimi burada olacak</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Piyasa İzleme</h2>
              <Link href="/markets" className="text-tradingview-blue text-sm">Tüm Piyasalar</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="py-2 px-4 text-left">Sembol</th>
                    <th className="py-2 px-4 text-right">Son Fiyat</th>
                    <th className="py-2 px-4 text-right">24s Değişim</th>
                    <th className="py-2 px-4 text-right">Hacim</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">BTC/USDT</td>
                    <td className="py-3 px-4 text-right">46,235.75</td>
                    <td className="py-3 px-4 text-right text-tradingview-green">+2.34%</td>
                    <td className="py-3 px-4 text-right">1.4B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">ETH/USDT</td>
                    <td className="py-3 px-4 text-right">2,456.30</td>
                    <td className="py-3 px-4 text-right text-tradingview-green">+1.67%</td>
                    <td className="py-3 px-4 text-right">845.2M</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">BNB/USDT</td>
                    <td className="py-3 px-4 text-right">395.20</td>
                    <td className="py-3 px-4 text-right text-tradingview-red">-0.82%</td>
                    <td className="py-3 px-4 text-right">210.5M</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">XRP/USDT</td>
                    <td className="py-3 px-4 text-right">0.5423</td>
                    <td className="py-3 px-4 text-right text-tradingview-green">+3.15%</td>
                    <td className="py-3 px-4 text-right">124.8M</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">ADA/USDT</td>
                    <td className="py-3 px-4 text-right">0.4825</td>
                    <td className="py-3 px-4 text-right text-tradingview-green">+1.04%</td>
                    <td className="py-3 px-4 text-right">98.3M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Sağ Sütun: Haberler ve İşlem Bölümü */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Hızlı İşlem</h2>
              <Link href="/trade" className="text-tradingview-blue text-sm">Detaylı</Link>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Sembol</label>
                <select className="w-full border rounded p-2 bg-white dark:bg-gray-800">
                  <option>BTC/USDT</option>
                  <option>ETH/USDT</option>
                  <option>BNB/USDT</option>
                  <option>XRP/USDT</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button className="flex-1 py-2 px-4 bg-tradingview-green text-white rounded-l font-medium">
                  AL
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r font-medium">
                  SAT
                </button>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Miktar (BTC)</label>
                <input type="text" className="w-full border rounded p-2" placeholder="0.00" />
              </div>
              <button className="w-full py-2 bg-tradingview-blue text-white rounded font-medium">
                İşleme Başla
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Son Haberler</h2>
              <Link href="/news" className="text-tradingview-blue text-sm">Tümü</Link>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium mb-1">Fed Faizi Sabit Tuttu, Piyasalar Olumlu Tepki Verdi</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                  Federal Rezerv, faizleri %5,25-5,50 aralığında sabit tuttu ve yıl içinde faiz indirimi sinyali verdi...
                </p>
                <span className="text-xs text-gray-500">2 saat önce</span>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium mb-1">Bitcoin ETF'leri İlk Haftada 1 Milyar Dolar Girişi Gördü</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                  ABD'de onaylanan spot Bitcoin ETF'leri ilk işlem haftasında önemli bir ilgi gördü...
                </p>
                <span className="text-xs text-gray-500">5 saat önce</span>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium mb-1">Avrupa Merkez Bankası Dijital Euro Çalışmalarını Hızlandırdı</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                  AMB Başkanı, dijital Euro için hazırlık aşamasının 2023 sonunda tamamlanacağını açıkladı...
                </p>
                <span className="text-xs text-gray-500">8 saat önce</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Büyük Teknoloji Şirketleri Yapay Zeka Yatırımlarını Artırıyor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                  Microsoft, Google ve Meta'nın yapay zeka alanındaki yatırımları hisse değerlerini yükseltti...
                </p>
                <span className="text-xs text-gray-500">12 saat önce</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alt Bölüm */}
      <div className="bg-white dark:bg-tradingview-dark p-4 rounded-lg border">
        <h2 className="text-xl font-bold mb-4">Portföy Durumunuz</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-1">Toplam Değer</h3>
            <p className="text-2xl font-bold">₺124,586.42</p>
            <span className="text-xs text-tradingview-green">+₺2,345.20 (24s)</span>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-1">Açık Pozisyonlar</h3>
            <p className="text-2xl font-bold">8</p>
            <span className="text-xs">5 karda, 3 zararda</span>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-1">Mevcut Bakiye</h3>
            <p className="text-2xl font-bold">₺48,250.00</p>
            <span className="text-xs">Kullanılabilir</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/portfolio" 
            className="py-2 px-6 bg-tradingview-blue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Portföyümü Yönet
          </Link>
        </div>
      </div>
    </div>
  );
} 