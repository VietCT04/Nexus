//Settings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  HiArrowLeft,
  HiCog6Tooth,
  HiLockClosed,
  HiUser,
  HiPhone,
  HiDocumentText,
  HiQuestionMarkCircle,
  HiArrowRightOnRectangle
} from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png'; 
import bgdImage from '../assets/bgd.png';

const Settings = () => {
  const [token] = useState(localStorage.getItem("auth") || "");
  const navigate = useNavigate();

  const handleButtonClickPswd = () => {
    navigate("/changepassword");
  }; 
  
  const handleButtonClickProfile = () => {
    navigate("/edit");
  }; 
  
  const handleButtonClickPhNum = () => {
    navigate("/changephonenum");
  }; 
  
  const handleButtonClickTC = () => {
    navigate("/tandc");
  }; 
  
  const handleButtonClickHelp = () => {
    navigate("/help");
  }; 
  
  const handleButtonClickLogout = () => {
    navigate("/logout");
  }; 

  useEffect(() => {
    if (token === "null") {
      navigate("/login");
      toast.warn("Please login first to access settings");
    }
  }, [token, navigate]);

  const handleBackClick = () => {
    window.history.back();
  };

  const settingsOptions = [
    {
      title: 'Change Password',
      description: 'Update your account password',
      icon: HiLockClosed,
      gradient: 'from-blue-500 to-cyan-500',
      onClick: handleButtonClickPswd
    },
    {
      title: 'Edit Profile',
      description: 'Manage your personal information',
      icon: HiUser,
      gradient: 'from-purple-500 to-pink-500',
      onClick: handleButtonClickProfile
    },
    {
      title: 'Change Phone Number',
      description: 'Update your contact number',
      icon: HiPhone,
      gradient: 'from-green-500 to-emerald-500',
      onClick: handleButtonClickPhNum
    },
    {
      title: 'Terms and Conditions',
      description: 'Review our terms of service',
      icon: HiDocumentText,
      gradient: 'from-orange-500 to-amber-500',
      onClick: handleButtonClickTC
    },
    {
      title: 'App Help Manual',
      description: 'Learn how to use the app',
      icon: HiQuestionMarkCircle,
      gradient: 'from-indigo-500 to-purple-500',
      onClick: handleButtonClickHelp
    },
    {
      title: 'Logout',
      description: 'Sign out of your account',
      icon: HiArrowRightOnRectangle,
      gradient: 'from-red-500 to-rose-500',
      onClick: handleButtonClickLogout
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-6xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
          
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

          {/* Title Card */}
          <div className="glass-card mb-6 p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="flex items-center justify-center gap-3">
              <HiCog6Tooth className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
                  Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                  Manage your account and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {settingsOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.onClick}
                className="group glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-orange-500/50 text-left"
                style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}
              >
                {/* Icon Container */}
                <div className="relative mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Decorative glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-slate-800/50 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                    <HiArrowLeft className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white rotate-180 transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Card */}
          <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl mt-auto">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <HiQuestionMarkCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Need Help?
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you're having trouble with any settings, check out our Help Manual or contact support for assistance.
                </p>
              </div>
            </div>
          </div>
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

export default Settings;