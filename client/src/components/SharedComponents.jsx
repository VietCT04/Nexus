// SharedComponents.jsx - Reusable design system components for NexusNTU
import React from 'react';
import { HiArrowRight } from 'react-icons/hi2';

/**
 * Shared Design System for NexusNTU
 * - Glassmorphism cards
 * - Geometric gradient backgrounds
 * - Consistent buttons and inputs
 * - Theme variants (warmOrange, coolIndigo, minimal)
 */

// Theme variants
export const THEMES = {
  warmOrange: {
    background: 'from-amber-400 via-orange-400 to-rose-500 dark:from-slate-900 dark:via-orange-900 dark:to-slate-900',
    primary: 'bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600',
    accent: 'text-orange-600 dark:text-orange-400',
    card: 'bg-white/90 dark:bg-slate-900/85'
  },
  coolIndigo: {
    background: 'from-indigo-400 via-purple-500 to-teal-400 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900',
    primary: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
    accent: 'text-indigo-600 dark:text-indigo-400',
    card: 'bg-white/90 dark:bg-slate-900/85'
  },
  minimal: {
    background: 'from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
    primary: 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900',
    accent: 'text-gray-700 dark:text-gray-300',
    card: 'bg-white/95 dark:bg-slate-900/90'
  }
};

// Geometric Background Component
export const GeometricBackground = ({ theme = 'warmOrange' }) => (
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

// Glassmorphism Card Container
export const GlassCard = ({ children, className = '', theme = 'warmOrange', maxWidth = 'max-w-[560px] md:max-w-[640px] xl:max-w-[720px]' }) => (
  <div className={`relative backdrop-blur-2xl ${THEMES[theme].card} rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 ${className}`}>
    {children}
  </div>
);

// Page Container with Animation
export const PageContainer = ({ children, className = '', maxWidth = 'max-w-[560px] md:max-w-[640px] xl:max-w-[720px]' }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div 
        className={`
          w-full mx-auto ${maxWidth} transition-all duration-1000 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
};

// Primary Button
export const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  icon: Icon = HiArrowRight,
  loading = false,
  theme = 'warmOrange',
  className = "",
  ...props 
}) => {
  const baseStyles = "group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: `${THEMES[theme].primary} text-white shadow-lg hover:shadow-xl focus:ring-orange-500/50 dark:focus:ring-orange-400/50`,
    secondary: "bg-white/20 dark:bg-slate-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-slate-700 hover:bg-white/30 dark:hover:bg-slate-800/70 focus:ring-gray-500/20",
    ghost: `${THEMES[theme].accent} hover:bg-white/10 dark:hover:bg-slate-800/30 focus:ring-orange-500/20`
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
          <span>Loading...</span>
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

// Page Header with Logo
export const PageHeader = ({ logo, title, subtitle, theme = 'warmOrange' }) => (
  <div className="flex flex-col items-center space-y-4 text-center mb-8">
    {logo && (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-2xl opacity-20 dark:opacity-30 animate-pulse" />
        <img 
          src={logo} 
          alt="Logo" 
          className="relative w-24 sm:w-32 h-auto drop-shadow-xl transition-transform hover:scale-105 duration-300"
        />
      </div>
    )}
    
    <div className="space-y-2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

// Custom Animations (to be added to each page)
export const customAnimations = `
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
`;
