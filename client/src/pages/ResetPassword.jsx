import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { HiArrowLeft, HiArrowRight, HiXCircle } from "react-icons/hi2";
import { toast } from "react-toastify";
import axios from "axios";
import Logo from "../assets/crbologo.png";
import { useUser } from "../contexts/UserContext";
import { evaluatePasswordStrength } from "../utils/passwordUtils.js";
import { 
  GeometricBackground, 
  GlassCard, 
  PageContainer, 
  Button, 
  PageHeader,
  THEMES,
  customAnimations 
} from '../components/SharedComponents';

/**
 * Reset Password component with glassmorphism design
 * Allows authenticated users to change their password
 */

// Floating Label Input Component
const FloatingInput = ({ 
  id, 
  name, 
  type = "text", 
  label, 
  value, 
  onChange, 
  required = false,
  error = "",
  rightIcon = null,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          peer w-full px-4 pt-6 pb-2 text-base
          bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
          border-2 rounded-xl
          transition-all duration-200
          focus:outline-none focus:ring-4
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-gray-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500/20'
          }
          ${rightIcon ? 'pr-12' : 'pr-4'}
        `}
        placeholder=" "
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${isFocused || hasValue 
            ? 'top-2 text-xs font-medium text-gray-600 dark:text-gray-400' 
            : 'top-4 text-base text-gray-500 dark:text-gray-400'
          }
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {rightIcon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
      
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
          <HiXCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Password Strength Meter
const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    
    const { level } = evaluatePasswordStrength(password);
    const strengthMap = {
      'Weak': { level: 1, label: 'Weak', color: 'bg-red-500' },
      'Medium': { level: 3, label: 'Good', color: 'bg-yellow-500' },
      'Strong': { level: 5, label: 'Strong', color: 'bg-green-500' }
    };
    
    return strengthMap[level] || { level: 0, label: '', color: '' };
  };
  
  const strength = calculateStrength();
  
  if (!password) return null;
  
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= strength.level ? strength.color : 'bg-gray-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
      {strength.label && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Password strength: <span className="font-medium">{strength.label}</span>
        </p>
      )}
    </div>
  );
};

const ResetPassword = ({ theme = 'warmOrange' }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { updateToken, userProfile } = useUser();
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!newPassword || newPassword.length === 0) {
      newErrors.newPassword = "New password is required";
    }
    if (!confirmPassword || confirmPassword.length === 0) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" });
      toast.error("Passwords don't match!");
      return;
    }

    const { level } = evaluatePasswordStrength(newPassword);
    if (level !== "Strong") {
      setErrors({ newPassword: "Please use a stronger password" });
      toast.warn("Please use a stronger password for better security.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/update-password",
        { userId: userProfile._id, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (
        response.data.message ===
        "New Password should not be same as old password!"
      ) {
        toast.info("New Password should not be same as old password!");
        setErrors({ newPassword: "Cannot use the same password" });
        setIsLoading(false);
        return;
      }

      updateToken(token);
      toast.success("Password changed successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <GeometricBackground theme={theme} />
      
      <PageContainer maxWidth="max-w-[560px] md:max-w-[640px] xl:max-w-[720px]">
        <GlassCard theme={theme}>
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded px-2 py-1"
            aria-label="Go back"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <PageHeader 
            logo={Logo}
            title="Reset Password"
            subtitle="Please enter your new password"
            theme={theme}
          />

          <form onSubmit={handlePasswordChangeSubmit} className="space-y-5" noValidate>
            {/* New Password Input */}
            <div className="space-y-0">
              <FloatingInput
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                required
                autoComplete="new-password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded p-1"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                }
              />
              <PasswordStrengthMeter password={newPassword} />
            </div>

            {/* Confirm Password Input */}
            <FloatingInput
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded p-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              }
            />

            {/* General Error Message */}
            {errors.general && (
              <div 
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-start gap-2">
                  <HiXCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{errors.general}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              icon={HiArrowRight}
              loading={isLoading}
              theme={theme}
              className="w-full"
            >
              Reset Password
            </Button>
          </form>
        </GlassCard>
      </PageContainer>

      <style>{customAnimations}</style>
    </div>
  );
};

export default ResetPassword;
