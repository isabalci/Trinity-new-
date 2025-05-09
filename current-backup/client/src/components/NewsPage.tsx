import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';
import { API } from '../services/api';
import { FiCalendar, FiSearch, FiFilter, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import '../App.css';
import IconWrapper from './IconWrapper';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  source: string;
  published: string;
  url: string;
}

const NewsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('query') || '');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  
  // Categories
  const categories = [
    { id: 'all', label: i18n.t('news.allCategories') },
    { id: 'crypto', label: i18n.t('news.crypto') },
    { id: 'forex', label: i18n.t('news.forex') },
    { id: 'stocks', label: i18n.t('news.stocks') },
    { id: 'economy', label: i18n.t('news.economy') },
    { id: 'technology', label: i18n.t('news.technology') },
  ];
  
  // Fetch news based on selected category and search query
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        let fetchedNews: NewsItem[] = [];
        
        if (searchQuery) {
          fetchedNews = await API.news.searchNews(searchQuery) as NewsItem[];
        } else if (selectedCategory === 'all') {
          fetchedNews = await API.news.getLatestNews(20) as NewsItem[];
        } else {
          fetchedNews = await API.news.getNewsByCategory(selectedCategory, 20) as NewsItem[];
        }
        
        setNewsItems(fetchedNews);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      }
    };
    
    fetchNews();
    
    // Update URL parameters
    const params: { category?: string; query?: string } = {};
    if (selectedCategory !== 'all') {
      params.category = selectedCategory;
    }
    if (searchQuery) {
      params.query = searchQuery;
    }
    setSearchParams(params);
    
  }, [selectedCategory, searchQuery, setSearchParams]);
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    setSearchQuery(query);
  };
  
  // Format publication date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    // If it's today, show time instead of date
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${i18n.t('news.today')} ${hours}:${minutes}`;
    }
    
    // If it's yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return i18n.t('news.yesterday');
    }
    
    // Otherwise show the full date
    return date.toLocaleDateString();
  };
  
  // Handle reading an article
  const handleReadArticle = (article: NewsItem) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };
  
  // Back to news list from article view
  const handleBackToList = () => {
    setSelectedArticle(null);
  };
  
  return (
    <div className={`news-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="news-header">
        <h1>{i18n.t('news.title')}</h1>
        <p>{i18n.t('news.subtitle')}</p>
      </div>
      
      {!selectedArticle ? (
        <>
          <div className="news-filters">
            <div className="category-tabs">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <form className="news-search" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <IconWrapper icon={FiSearch} size={18} />
                <input
                  type="text"
                  name="search"
                  placeholder={i18n.t('news.searchPlaceholder')}
                  defaultValue={searchQuery}
                />
              </div>
              <button type="submit" className="search-button">
                {i18n.t('news.search')}
              </button>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  type="button"
                  className="reset-button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  {i18n.t('news.reset')}
                </button>
              )}
            </form>
          </div>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>{i18n.t('loading')}</p>
            </div>
          ) : newsItems.length > 0 ? (
            <div className="news-grid">
              {newsItems.map((item) => (
                <div key={item.id} className="news-card" onClick={() => handleReadArticle(item)}>
                  <div className="news-card-image">
                    <img src={`${item.image}`} alt={item.title} />
                    <div className="news-category">{i18n.t(`news.${item.category}`)}</div>
                  </div>
                  <div className="news-card-content">
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-summary">{item.summary}</p>
                    <div className="news-card-footer">
                      <span className="news-card-source">{item.source}</span>
                      <span className="news-card-date">
                        <IconWrapper icon={FiCalendar} size={14} />
                        {formatDate(item.published)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>{i18n.t('news.noResults')}</p>
              <button
                className="reset-button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                {i18n.t('news.resetSearch')}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="article-view">
          <div className="article-actions">
            <button className="back-button" onClick={handleBackToList}>
              &larr; {i18n.t('news.backToList')}
            </button>
            {selectedArticle.url !== '#' && (
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
              >
                {i18n.t('news.viewSource')} <IconWrapper icon={FiExternalLink} size={16} />
              </a>
            )}
          </div>
          
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">{i18n.t(`news.${selectedArticle.category}`)}</span>
              <span className="article-date">
                <IconWrapper icon={FiCalendar} size={14} />
                {formatDate(selectedArticle.published)}
              </span>
              <span className="article-source">{selectedArticle.source}</span>
            </div>
            <h1 className="article-title">{selectedArticle.title}</h1>
            <p className="article-summary">{selectedArticle.summary}</p>
          </div>
          
          <div className="article-featured-image">
            <img src={selectedArticle.image} alt={selectedArticle.title} />
          </div>
          
          <div className="article-content">
            {selectedArticle.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="article-footer">
            <button className="back-button" onClick={handleBackToList}>
              &larr; {i18n.t('news.backToList')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage; 