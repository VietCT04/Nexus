//Login.jsx
import React, { useState, useContext } from "react";
import Logo from "../assets/crbologo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { HiArrowRight, HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../contexts/UserContext';
import { toast } from "react-toastify";

/**
 * Modern Login component with glassmorphism design, floating labels,
 * password strength meter, and full accessibility support.
 * 
 * Features:
 * - Warm orange gradient background (Variant A)
 * - Glassmorphism card with backdrop blur
 * - Floating labels with smooth transitions
 * - Real-time password strength indicator
 * - WCAG AA compliant (contrast ≥4.5:1)
 * - Keyboard navigation with visible focus rings
 * - Dark mode support
 * - Mobile-first responsive (390px → xl)
 * - Gentle fade-in animation on mount
 */

// Theme variants
const THEMES = {
  warmOrange: {
    background: 'from-amber-400 via-orange-400 to-rose-500 dark:from-slate-900 dark:via-orange-900 dark:to-slate-900',
    primary: 'bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600',
    accent: 'text-orange-600 dark:text-orange-400'
  },
  coolIndigo: {
    background: 'from-indigo-400 via-purple-500 to-teal-400 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900',
    primary: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
    accent: 'text-indigo-600 dark:text-indigo-400'
  },
  minimal: {
    background: 'from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
    primary: 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900',
    accent: 'text-gray-700 dark:text-gray-300'
  }
};

// Geometric Background Component (CSS-only)
const GeometricBackground = ({ theme = 'warmOrange' }) => (
  <div className={`fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br ${THEMES[theme].background}`}>
    {/* Animated geometric shapes */}
    <div className="absolute inset-0 opacity-10 dark:opacity-5">
      <svg className="absolute -top-20 -left-20 w-96 h-96 animate-spin-slow" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
      </svg>
      <svg className="absolute -bottom-20 -right-20 w-96 h-96 animate-spin-reverse" viewBox="0 0 200 200">
        <rect x="30" y="30" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" transform="rotate(45 100 100)" />
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" transform="rotate(45 100 100)" />
      </svg>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/40" />
  </div>
);

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
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const levels = [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'Weak', color: 'bg-red-500' },
      { level: 2, label: 'Fair', color: 'bg-orange-500' },
      { level: 3, label: 'Good', color: 'bg-yellow-500' },
      { level: 4, label: 'Strong', color: 'bg-green-500' },
      { level: 5, label: 'Very Strong', color: 'bg-emerald-600' }
    ];
    
    return levels[strength];
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

// Primary Button Component
const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  icon: Icon,
  loading = false,
  theme = 'warmOrange',
  className = "",
  ...props 
}) => {
  const baseStyles = "group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: `${THEMES[theme].primary} text-white shadow-lg hover:shadow-xl focus:ring-orange-500/50 dark:focus:ring-orange-400/50`,
    secondary: "bg-white/20 dark:bg-slate-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-slate-700 hover:bg-white/30 dark:hover:bg-slate-800/70 focus:ring-gray-500/20"
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Logging in...</span>
        </>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          {Icon && <Icon className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
        </>
      )}
    </button>
  );
};

/**
 * Main Login Component
 */
const Login = ({ theme = 'warmOrange' }) => {
  const { updateToken } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!username || username.length === 0) {
      newErrors.username = "Username is required";
    }
    if (!password || password.length === 0) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    const formData = { username, password };
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        formData
      );
      updateToken(response.data.token); 
      toast.success("Login successful. Please verify your phone number to complete the sign-in process");
      navigate("/dashboard", { state: { username: username, comingFrom: "login" } });
    } catch (err) {
      console.log(err);
      toast.error("Invalid login credentials. Please try again.");
      setErrors({ general: "Invalid credentials" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <GeometricBackground theme={theme} />
      
      {/* Main Card with fade-in animation */}
      <div 
        className={`
          w-full mx-auto max-w-[560px] md:max-w-[640px] xl:max-w-[720px] transition-all duration-1000 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Glassmorphism Card */}
        <div className="relative backdrop-blur-2xl bg-white/90 dark:bg-slate-900/85 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-7 sm:p-9 space-y-6">
          
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* Logo with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-2xl opacity-20 dark:opacity-30 animate-pulse" />
              <img 
                src={Logo} 
                alt="NexusNTU Logo" 
                className="relative w-32 h-auto drop-shadow-xl transition-transform hover:scale-105 duration-300"
              />
            </div>
            
            {/* Text Hierarchy */}
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-widest uppercase text-gray-600 dark:text-gray-400">
                Welcome to
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                NexusNTU
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please enter your credentials to continue
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
            {/* Username Input */}
            <FloatingInput
              id="username"
              name="username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
              autoComplete="username"
            />

            {/* Password Input with show/hide */}
            <div className="space-y-0">
              <FloatingInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
                autoComplete="current-password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <FaEye className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                }
              />
              
              {/* Password Strength Meter */}
              <PasswordStrengthMeter password={password} />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to={{
                  pathname: "/phonenumotp",
                  state: { username: "", comingFrom: "forgot" }
                }}
                className={`text-sm font-medium ${THEMES[theme].accent} hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded px-1 py-0.5`}
              >
                Forgot password?
              </Link>
            </div>

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
              aria-label="Log in to your account"
            >
              Log In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 dark:bg-slate-900/85 px-3 text-gray-500 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className={`font-semibold ${THEMES[theme].accent} hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded px-1 py-0.5`}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-4">
            Terms of Service
          </a>
          <span>•</span>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-4">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-4">
            Help
          </a>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;