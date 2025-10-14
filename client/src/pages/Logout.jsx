import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png';
import bgdImage from '../assets/bgd.png';

/**
 * Modern Logout component with glassmorphism design
 * Handles user logout and redirects to landing page
 */
const Logout = () => {
  const { updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Clear authentication
    localStorage.removeItem("auth");
    updateToken(null);
    console.log(typeof(localStorage.getItem('auth')));
    console.log(typeof(null));

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect after 3 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate, updateToken]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fadeIn">
            <img 
              src={logoImage} 
              alt="NexusNTU Logo" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>

          {/* Main Card */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-2xl animate-slideUp">
            
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 animate-ping opacity-75"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 animate-pulse"></div>
                
                {/* Icon */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <HiCheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">
              Logout Successful!
            </h1>

            {/* Message */}
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Thank you for using NexusNTU. See you again soon!
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Redirecting in
                </span>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400 min-w-[1.5rem] text-center">
                  {countdown}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {countdown === 1 ? 'second' : 'seconds'}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-white/30 dark:bg-slate-800/30 rounded-full overflow-hidden mb-6">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              />
            </div>

            {/* Manual Redirect Button */}
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Go to Home Now
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your session has been securely ended
            </p>
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
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out both;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

export default Logout;