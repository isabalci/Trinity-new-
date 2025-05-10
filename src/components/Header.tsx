import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-white dark:bg-tradingview-dark border-b px-4">
      <div className="flex items-center">
        <Link href="/" className="font-bold text-xl text-tradingview-blue">
          Trinity
        </Link>
        <nav className="ml-6">
          <ul className="flex space-x-4">
            <li>
              <Link href="/charts" className="hover:text-tradingview-blue">
                Grafikler
              </Link>
            </li>
            <li>
              <Link href="/markets" className="hover:text-tradingview-blue">
                Piyasalar
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-tradingview-blue">
                Haberler
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-tradingview-blue">
                Portföy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-1.5 text-sm bg-tradingview-blue text-white rounded hover:bg-blue-700">
          Giriş Yap
        </button>
        <button className="px-4 py-1.5 text-sm border border-tradingview-blue text-tradingview-blue rounded hover:bg-blue-50 dark:hover:bg-gray-800">
          Kaydol
        </button>
      </div>
    </header>
  );
};

export default Header; 