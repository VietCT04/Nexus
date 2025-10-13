//Landing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import logoImage from '../assets/crbologo.png';

/**
 * Modern Landing page for NexusNTU with glassmorphism design, 
 * accessibility features, and responsive layout.
 * 
 * Features:
 * - Mobile-first responsive design (390×844 → desktop)
 * - Glassmorphism card with backdrop blur
 * - Geometric gradient background (CSS-only, no images)
 * - WCAG AA compliant contrast ratios
 * - Keyboard navigation with visible focus rings
 * - Smooth fade-in animation on mount
 * - Dark mode support via Tailwind dark: variants
 */

// Geometric background component (pure CSS/SVG)
const GeometricBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
    {/* Animated geometric shapes */}
    <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10">
      <svg className="absolute top-10 left-10 w-64 h-64 animate-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgba(255,255,255,0.3)" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.6,76.8C27.4,84.6,13.7,87.6,-0.5,88.4C-14.7,89.2,-29.4,87.8,-43.3,80.8C-57.2,73.8,-70.3,61.2,-78.1,46.1C-85.9,31,-88.4,13.4,-86.7,-3.4C-85,-20.2,-79.1,-36.2,-70.1,-50.8C-61.1,-65.4,-49,-78.6,-34.8,-85.6C-20.6,-92.6,-10.3,-93.4,2.1,-96.8C14.5,-100.2,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute bottom-20 right-10 w-80 h-80 animate-float-delayed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgba(255,255,255,0.2)" d="M39.5,-65.5C51.4,-58.5,61.5,-48.3,68.4,-36.2C75.3,-24.1,79,-10.1,78.8,4C78.6,18.1,74.5,32.3,66.8,44.3C59.1,56.3,47.8,66.1,34.9,71.8C22,77.5,7.5,79.1,-6.5,78.1C-20.5,77.1,-34,73.5,-46.3,66.8C-58.6,60.1,-69.7,50.3,-76.5,38.1C-83.3,25.9,-85.8,11.3,-84.2,-2.8C-82.6,-16.9,-76.9,-30.5,-68.5,-42.3C-60.1,-54.1,-49,-64.1,-36.3,-70.6C-23.6,-77.1,-9.4,-80.1,3.2,-85.3C15.8,-90.5,27.6,-72.5,39.5,-65.5Z" transform="translate(100 100)" />
      </svg>
    </div>
    
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/40" />
  </div>
);

// Reusable Button component
const Button = ({ 
  children, 
  variant = 'primary', 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/50 focus:ring-slate-900/50 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 dark:focus:ring-white/50",
    secondary: "bg-white/10 text-slate-900 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:border-white/30 focus:ring-white/50 dark:text-white dark:hover:bg-white/20"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {Icon && <Icon className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
    </button>
  );
};

// Main Landing Component
const Landing = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <GeometricBackground />
      
      {/* Main content card with fade-in animation */}
      <div 
        className={`
          w-full max-w-md transition-all duration-1000 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Glassmorphism card */}
        <div className="relative backdrop-blur-2xl bg-white/90 dark:bg-slate-900/80 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 sm:p-10 lg:p-12 space-y-8">
          
          {/* Logo section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              {/* Decorative glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
              
              <img 
                src={logoImage} 
                alt="NexusNTU Logo" 
                className="relative w-40 sm:w-48 h-auto drop-shadow-2xl transition-transform hover:scale-105 duration-300"
              />
            </div>
            
            {/* Text content with proper hierarchy */}
            <div className="text-center space-y-3">
              <p 
                className="text-xs sm:text-sm font-medium tracking-widest uppercase text-slate-600 dark:text-slate-400"
                aria-label="Welcome message"
              >
                Welcome to
              </p>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                NexusNTU
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xs mx-auto text-balance leading-relaxed">
                Your gateway to seamless cross-border experiences
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="space-y-4">
            {/* Primary CTA */}
            <Link 
              to="/login" 
              className="block"
              aria-label="Get started with NexusNTU"
            >
              <Button variant="primary" icon={HiArrowRight} className="w-full">
                Get Started
              </Button>
            </Link>

            {/* Secondary action */}
            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:ring-offset-2 rounded-lg px-3 py-2"
                aria-label="Sign in to existing account"
              >
                Already have an account? 
                <span className="underline underline-offset-4 decoration-2 decoration-slate-400 hover:decoration-slate-900 dark:hover:decoration-white transition-colors">
                  Sign in
                </span>
              </Link>
            </div>
          </div>

          {/* Optional: OAuth/SSO section */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-300 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 dark:bg-slate-900/80 px-3 text-slate-500 dark:text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth buttons (placeholder - implement actual OAuth) */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-900/20 dark:focus:ring-white/20 group"
              aria-label="Continue with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Google</span>
            </button>
            
            <button 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-900/20 dark:focus:ring-white/20 group"
              aria-label="Continue with NTU SSO"
            >
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 18c-4 0-7-3-7-7V8.3l7-3.9 7 3.9V13c0 4-3 7-7 7z"/>
              </svg>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">NTU</span>
            </button>
          </div>
        </div>
        
        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-slate-900 dark:hover:text-white transition-colors">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="underline hover:text-slate-900 dark:hover:text-white transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-120deg); }
          66% { transform: translate(20px, -20px) rotate(-240deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;