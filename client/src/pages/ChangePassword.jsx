// ChangePassword.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import { 
  HiArrowLeft,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiCheckCircle,
  HiShieldCheck
} from 'react-icons/hi2';
import Logo from "../assets/crbologo.png"; 
import bgdImage from '../assets/bgd.png';
import { useUser } from '../contexts/UserContext';
import PasswordStrengthMeterComponent from '../utils/PasswordStrengthMeter'; 
import { evaluatePasswordStrength } from "../utils/passwordUtils.js";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { updateToken, userProfile } = useUser();
  const token = localStorage.getItem('auth');
  const navigate = useNavigate();

  const verifyCurrentPassword = async (currentPassword) => {
    if (currentPassword === "") {
      toast.info("Please enter your current password!");
      return;
    }
    if (!userProfile) return;
    try {
      await axios.post(
        "http://localhost:3000/api/v1/verifypassword",
        { userId: userProfile._id, password: currentPassword }
      );
      setIsCurrentPasswordVerified(true);
      toast.success("Current password verified. Please enter a new password.");
    } catch (err) {
      console.error(err);
      toast.error("Current password verification failed. Please try again.");
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword === "" || confirmPassword === "") {
      toast.info("Please input all fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const { level } = evaluatePasswordStrength(newPassword);
    if (level !== 'Strong') {
      toast.warn("Please use a stronger password for better security.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/update-password",
        { userId: userProfile._id, newPassword: newPassword },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.data.message === "New Password should not be same as old password!") {
        toast.info("New Password should not be same as old password!");
        return;
      }
      axios.post('http://localhost:3000/api/v1/clear-cache', null, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(() => {
      }).catch(error => {
        console.error("Cache clearing error:", error);
      });
      updateToken(token);
      toast.success("Password changed successfully");
      navigate("/settings");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleVerifyCurrentPassword = (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    verifyCurrentPassword(currentPassword);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
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
                  src={Logo} 
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
              <HiLockClosed className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
                  Change Password
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                  {!isCurrentPasswordVerified 
                    ? "Verify your identity to continue"
                    : "Create a strong new password"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          {isCurrentPasswordVerified && (
            <div className="glass-card mb-6 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <HiCheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Current Password Verified
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    You can now set a new password
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            {!isCurrentPasswordVerified ? (
              <form onSubmit={handleVerifyCurrentPassword} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <HiShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Please verify your current password to proceed
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                      name="currentPassword"
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <HiEyeSlash className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Verify Current Password
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-4 top-4 w-5 h-5 text-gray-500 z-10" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors z-10"
                    >
                      {showNewPassword ? (
                        <HiEyeSlash className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <PasswordStrengthMeterComponent password={newPassword} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      name="confirmPassword"
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <HiEyeSlash className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Change Password
                </button>
              </form>
            )}

            {/* Security Tips */}
            <div className="mt-6 p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                <HiShieldCheck className="w-4 h-4" />
                Password Security Tips
              </h4>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Use at least 8 characters with mixed case letters</li>
                <li>• Include numbers and special characters</li>
                <li>• Avoid common words or personal information</li>
                <li>• Don't reuse passwords from other accounts</li>
              </ul>
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

export default ChangePassword;