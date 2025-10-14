//ChangePhNum.jsx
import React, { useState, useEffect } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  HiArrowLeft,
  HiPhone,
  HiCheckCircle,
  HiInformationCircle
} from 'react-icons/hi2';
import { useUser } from '../contexts/UserContext'; 
import logoImage from '../assets/landscapelogo.png';
import bgdImage from '../assets/bgd.png';

const ChangePhoneNumber = () => { 
  const [ph, setPh] = useState('');
  const [originalPh, setOriginalPh] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('auth'); 
  const { updateToken, userProfile } = useUser(); 

  useEffect(() => {
    if (userProfile && userProfile.ph) {
      setPh(userProfile.ph);
      setOriginalPh(userProfile.ph);
    }
  }, [userProfile]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ph === originalPh) {
      toast.error("Please enter a new phone number.");
      return;
    }

    const regexChina = /^(\+86)?1[3-9]\d{9}$/; 
    const regexIndia = /^(\+91)?[6789]\d{9}$/; 
    const regexMalaysia = /^(\+60)?1\d{8,9}$/; 
    const regexSingapore = /^(\+65)?[689]\d{7}$/; 

    if (regexChina.test(ph)) {
    } else if (regexIndia.test(ph)) {
    } else if (regexMalaysia.test(ph)) {
    } else if (regexSingapore.test(ph)) {
    } else {
      toast.error("Please enter a valid phone number!");
      return;
    }

    try {
      if (ph === "") {
        toast.error("Please enter a valid phone number!");
        return;
      }

      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/phoneauth", { ph: ph });
     
      if (response.data.msg === "This phone number is already linked to an existing account. Please sign in.") {
        toast.info("This phone number is already linked to an existing account.");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:3000/api/v1/changeph", { ph: ph }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      await axios.post('http://localhost:3000/api/v1/clear-cache', null, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      updateToken(token);
      toast.success("Phone number updated successfully");
      setOriginalPh(ph);
      setLoading(false);
    } catch (err) {
      console.error("Failed to update phone number:", err);
      toast.error("This phone number is already linked to an existing account.");
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-2xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
          
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
                  alt="Logo" 
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
              <HiPhone className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
                  Change Phone Number
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                  Update your registered contact number
                </p>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="glass-card mb-6 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <HiInformationCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Important Information
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Enter a new phone number that is different from your current one. The phone number must not be linked to another account.
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <HiPhone className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Registered Phone Number
                </label>
                <div className="phone-input-wrapper">
                  <PhoneInput
                    country={"sg"}
                    value={ph}
                    onChange={setPh}
                    id="phone"
                    inputClass="phone-custom-input"
                    buttonClass="phone-custom-button"
                    containerClass="phone-custom-container"
                    dropdownClass="phone-custom-dropdown"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <HiCheckCircle className="w-6 h-6" />
                    Save Phone Number
                  </>
                )}
              </button>
            </form>

            {/* Supported Regions */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
              <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Supported Regions
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-purple-800 dark:text-purple-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇸🇬</span>
                  <span>Singapore</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇮🇳</span>
                  <span>India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇨🇳</span>
                  <span>China</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇲🇾</span>
                  <span>Malaysia</span>
                </div>
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

        .phone-input-wrapper {
          position: relative;
        }

        .phone-custom-container {
          width: 100%;
        }

        .phone-custom-input {
          width: 100% !important;
          height: 56px !important;
          padding-left: 56px !important;
          border-radius: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          font-size: 16px !important;
          color: #111827 !important;
          transition: all 0.3s ease !important;
        }

        .dark .phone-custom-input {
          background: rgba(30, 41, 59, 0.5) !important;
          border: 1px solid rgba(71, 85, 105, 0.5) !important;
          color: #ffffff !important;
        }

        .phone-custom-input:focus {
          outline: none !important;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.5) !important;
        }

        .phone-custom-input::placeholder {
          color: #6b7280 !important;
        }

        .dark .phone-custom-input::placeholder {
          color: #9ca3af !important;
        }

        .phone-custom-button {
          background: rgba(255, 255, 255, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 12px 0 0 12px !important;
          height: 56px !important;
        }

        .dark .phone-custom-button {
          background: rgba(30, 41, 59, 0.5) !important;
          border: 1px solid rgba(71, 85, 105, 0.5) !important;
        }

        .phone-custom-button:hover {
          background: rgba(255, 255, 255, 0.7) !important;
        }

        .dark .phone-custom-button:hover {
          background: rgba(30, 41, 59, 0.7) !important;
        }

        .phone-custom-dropdown {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 12px !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .dark .phone-custom-dropdown {
          background: rgba(30, 41, 59, 0.95) !important;
          border: 1px solid rgba(71, 85, 105, 0.5) !important;
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

export default ChangePhoneNumber;