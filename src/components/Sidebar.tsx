import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <aside className={`h-full bg-white dark:bg-tradingview-dark border-r ${collapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          {!collapsed && <h2 className="font-bold text-lg mb-4">Trinity</h2>}
        </div>
        
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link href="/charts" className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {!collapsed && <span>Grafikler</span>}
              </Link>
            </li>
            <li>
              <Link href="/markets" className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                {!collapsed && <span>Piyasalar</span>}
              </Link>
            </li>
            <li>
              <Link href="/watchlist" className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {!collapsed && <span>İzleme Listesi</span>}
              </Link>
            </li>
            <li>
              <Link href="/news" className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                {!collapsed && <span>Haberler</span>}
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {!collapsed && <span>Portföy</span>}
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 mt-auto">
          <button 
            className="w-full flex items-center justify-center p-2 text-sm bg-tradingview-blue text-white rounded hover:bg-blue-700"
          >
            {collapsed ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            ) : (
              <span>Giriş Yap</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 