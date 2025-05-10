import React from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tradingview-blue">Trinity</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Şifrenizi sıfırlayın</p>
        </div>
        
        <div className="bg-white dark:bg-tradingview-dark rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Şifremi Unuttum</h2>
          
          <div className="mb-6 text-gray-600 dark:text-gray-400">
            Hesabınıza bağlı e-posta adresinizi girin. Size şifrenizi sıfırlamanız için bir bağlantı göndereceğiz.
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-tradingview-blue focus:border-tradingview-blue dark:bg-gray-800 dark:text-white"
                placeholder="ornek@email.com"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tradingview-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tradingview-blue"
              >
                Sıfırlama Bağlantısı Gönder
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            <Link href="/auth/login" className="text-tradingview-blue hover:text-blue-700 font-medium">
              Giriş sayfasına dön
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 