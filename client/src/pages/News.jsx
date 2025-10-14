//News.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import { 
  HiArrowLeft, 
  HiNewspaper,
  HiArrowTopRightOnSquare,
  HiCalendar,
  HiUser
} from 'react-icons/hi2';
import defaultNews from "../assets/defaultnews.png";
import defaultNews2 from "../assets/defaultnews2.png";
import logoImage from '../assets/landscapelogo.png'; 
import bgdImage from '../assets/bgd.png';
import { NEWS_AK } from './API_KEYS.jsx';

const API_KEY = NEWS_AK;
const baseURL = "https://newsapi.org/v2/everything";

const NewsComponent = () => {
  const { userProfile } = useUser();
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("Singaporean");
  const [selection, setSelection] = useState("Singaporean"); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const url = `${baseURL}?q=${query}&sortBy=popularity&apiKey=${API_KEY}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        toast.error("Cannot fetch news right now, please try again after some time! Sorry for the inconvenience!");
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  const handleSelectionChange = (event) => {
    setQuery(event.target.value);
    setSelection(event.target.value); 
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const topArticle = articles[0];
  const otherArticles = articles.slice(1);

  const categories = [
    { value: 'World', label: 'World', icon: '🌍' },
    { value: 'Singaporean', label: 'Singaporean', icon: '🇸🇬' },
  ];

  if (userProfile && userProfile.nationality) {
    const nationalityOption = { 
      value: userProfile.nationality, 
      label: userProfile.nationality,
      icon: '🏠'
    };
    if (!categories.find(cat => cat.value === userProfile.nationality)) {
      categories.push(nationalityOption);
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-7xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="glass-card mb-6 p-4 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={handleBackClick}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                aria-label="Back"
              >
                <HiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Back
                </span>
              </button>

              {/* Logo - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <img 
                  src={logoImage} 
                  alt="NexusNTU Logo" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* Spacer */}
              <div className="w-20 sm:w-24"></div>
            </div>
          </div>

          {/* Title & Category Selection */}
          <div className="glass-card mb-6 p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HiNewspaper className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
                  Latest News
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                  Stay updated with current events
                </p>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                News Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setQuery(category.value);
                      setSelection(category.value);
                    }}
                    className={`p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 ${
                      selection === category.value
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg scale-105'
                        : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <p className={`text-sm font-semibold ${
                      selection === category.value
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {category.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="glass-card p-12 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl text-center">
              <div className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-8 w-8 text-orange-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Loading news...
                </p>
              </div>
            </div>
          )}

          {/* Top Article */}
          {!loading && topArticle && (
            <div 
              className="glass-card mb-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              onClick={() => window.open(topArticle.url, '_blank')}
              style={{ animation: 'fadeIn 0.6s ease-out' }}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-gray-200 dark:bg-slate-700">
                <img 
                  src={topArticle.urlToImage} 
                  alt={topArticle.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultNews; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-white">TOP STORY</span>
                </div>

                {/* External Link Icon */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full">
                  <HiArrowTopRightOnSquare className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {topArticle.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {topArticle.description}
                </p>
              </div>
            </div>
          )}

          {/* Other Articles Grid */}
          {!loading && otherArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {otherArticles.map((article, index) => (
                article.urlToImage && (
                  <div 
                    key={index}
                    className="glass-card rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                    onClick={() => window.open(article.url, '_blank')}
                    style={{ animation: `fadeIn 0.6s ease-out ${index * 0.05}s both` }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-slate-700">
                      <img 
                        src={article.urlToImage}
                        alt={article.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultNews2; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      
                      {/* External Link Icon */}
                      <div className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full">
                        <HiArrowTopRightOnSquare className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3 flex-1">
                        {article.description}
                      </p>
                      
                      {/* Source */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <HiNewspaper className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 truncate">
                          {article.source.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && articles.length === 0 && (
            <div className="glass-card p-12 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl text-center">
              <HiNewspaper className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No news articles available at the moment
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .glass-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.2)
          );
        }
        
        .dark .glass-card {
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.4),
            rgba(15, 23, 42, 0.2)
          );
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsComponent;