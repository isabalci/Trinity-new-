export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Trinity Platform</h1>
        <p className="text-xl mb-8 text-center">
          TradingView ile birebir benzer yapıda tasarlanmış kapsamlı bir web tabanlı ticaret platformu
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="border rounded-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Piyasa Verileri</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Çeşitli finansal enstrümanlar için gerçek zamanlı piyasa verileri
            </p>
            <button className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Piyasaları İncele
            </button>
          </div>
          <div className="border rounded-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Grafikler</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Gelişmiş grafik araçları ve teknik göstergeler
            </p>
            <button className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Grafiklere Git
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 