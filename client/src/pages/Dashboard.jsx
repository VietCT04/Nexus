//Dashboard.jsx
// Modern glassmorphism dashboard with feature grid - Redesigned by aish-1509
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { 
  HiCurrencyDollar, 
  HiMapPin, 
  HiBuildingStorefront, 
  HiNewspaper, 
  HiChatBubbleBottomCenter, 
  HiLink, 
  HiCog6Tooth,
  HiUser
} from 'react-icons/hi2';
import Logo from '../assets/landscapelogo.png'; 
import defaultAvatarUrl from "../assets/defaultpfp.png";
import { 
  GeometricBackground, 
  customAnimations,
  THEMES 
} from '../components/SharedComponents';

/**
 * Dashboard component with glassmorphism design
 * Main interface after login with feature cards and profile access
 */

const Dashboard = ({ theme = 'warmOrange' }) => {
  const { userProfile } = useUser();
  const [avatar, setAvatar] = useState({ url: defaultAvatarUrl, name: 'Default Avatar' }); 
  const [isLoading, setIsLoading] = useState(false); 
  const [token] = useState(localStorage.getItem("auth") || "");
  const navigate = useNavigate();

  // Fetch user avatar
  const fetchAvatar = async () => {
    setIsLoading(true); 
    const userProfileId = userProfile._id; 
    if (userProfileId) {
      try {
        const response = await axios.post(`http://localhost:3000/api/v1/avatar`, {
          userId: userProfileId,
        });
        setAvatar({ url: response.data.url, name: 'User Avatar' });
      } catch (error) {
        console.error("Error fetching avatar:", error);
        setAvatar({ url: defaultAvatarUrl, name: 'Default Avatar' });
      }
    }
    setIsLoading(false); 
  };

  useEffect(() => {
    if (!userProfile) return;
    fetchAvatar();
  }, [userProfile]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (token === "null") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);

  // Feature cards configuration
  const features = [
    {
      icon: HiCurrencyDollar,
      label: "Currency Converter",
      path: "/currency",
      color: "from-orange-500 to-amber-500",
      hoverColor: "hover:from-orange-600 hover:to-amber-600"
    },
    {
      icon: HiMapPin,
      label: "Navigation",
      path: "/navigate",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600"
    },
    {
      icon: HiBuildingStorefront,
      label: "Nearest Amenities",
      path: "/amenities",
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600"
    },
    {
      icon: HiNewspaper,
      label: "News Viewer",
      path: "/news",
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:from-green-600 hover:to-emerald-600"
    },
    {
      icon: HiChatBubbleBottomCenter,
      label: "ChatBot",
      path: "http://localhost:8501/",
      external: true,
      color: "from-indigo-500 to-purple-500",
      hoverColor: "hover:from-indigo-600 hover:to-purple-600"
    },
    {
      icon: HiLink,
      label: "Quick Links",
      path: "/quicklinks",
      color: "from-rose-500 to-orange-500",
      hoverColor: "hover:from-rose-600 hover:to-orange-600"
    },
    {
      icon: HiCog6Tooth,
      label: "Settings",
      path: "/settings",
      color: "from-gray-500 to-slate-500",
      hoverColor: "hover:from-gray-600 hover:to-slate-600"
    }
  ];

  const handleFeatureClick = (feature) => {
    if (feature.external) {
      window.location.href = feature.path;
    } else {
      navigate(feature.path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
      <GeometricBackground theme={theme} />
      
      {/* Dashboard Container */}
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="glass-card mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={Logo} 
                alt="NexusNTU Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  NexusNTU
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Welcome back, {userProfile?.username || 'User'}!
                </p>
              </div>
            </div>

            {/* Profile Picture */}
            <button
              onClick={() => navigate("/edit")}
              className="group relative"
              aria-label="View profile"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 border-white dark:border-slate-700 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500 dark:group-hover:border-orange-400">
                <img 
                  src={avatar.url} 
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
          </div>
        </div>

        {/* Welcome Message Mobile */}
        <div className="sm:hidden glass-card mb-6 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Welcome back, {userProfile?.username || 'User'}!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            What would you like to do today?
          </p>
        </div>

        {/* Feature Grid - Centered and Evenly Spaced */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => handleFeatureClick(feature)}
                className="group relative overflow-hidden glass-card p-8 sm:p-10 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-orange-500/50 aspect-square flex flex-col items-center justify-center"
                style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                {/* Label */}
                <h3 className="relative text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors text-center">
                  {feature.label}
                </h3>

                {/* External Link Indicator */}
                {feature.external && (
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-lg" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-6 pb-2 text-center">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Need help? Visit <button onClick={() => navigate("/settings")} className="text-orange-600 dark:text-orange-400 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded px-1">Settings</button> for support
          </p>
        </div>
      </div>

      <style>{`
        ${customAnimations}
        
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
}

export default Dashboard;