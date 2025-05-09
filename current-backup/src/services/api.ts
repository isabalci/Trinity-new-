import axios from 'axios';

// Backend API URL - porta 3003 olarak ayarlayalım, terminalden görüldüğü gibi backend genellikle 3003 portunda çalışıyor
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003/api';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hata durumunda alternatif porta geçiş yapma mekanizması
let isBackendUnreachable = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Eğer bağlantı hatası varsa ve henüz alternatif port denenmediyse
    if (error.message?.includes('Network Error') && !isBackendUnreachable && API_URL.includes('3003')) {
      isBackendUnreachable = true;
      // 3003 portu çalışmıyorsa 3002 portunu dene
      apiClient.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';
      // Başarısız olan isteği yeni port ile tekrar dene
      try {
        return await apiClient(error.config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(error);
  }
); 