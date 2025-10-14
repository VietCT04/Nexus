//HelpManual.jsx
import React from 'react';
import { 
  HiArrowLeft,
  HiQuestionMarkCircle,
  HiUserPlus,
  HiShieldCheck,
  HiKey,
  HiComputerDesktop,
  HiCog6Tooth,
  HiSparkles,
  HiNewspaper,
  HiHeart,
  HiChatBubbleLeftRight
} from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png'; 
import bgdImage from '../assets/bgd.png';

const Help = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const helpSections = [
    {
      title: "Login and Registration",
      icon: HiUserPlus,
      gradient: "from-blue-500 to-cyan-500",
      items: [
        {
          subtitle: "Login",
          content: "If you are a returning user, enter your Username and Password. If you forgot your password, click on 'Forgot Password?' to reset."
        },
        {
          subtitle: "Registration",
          content: "New user? Enter your Phone Number and click 'Next' to receive an OTP."
        }
      ]
    },
    {
      title: "Authentication",
      icon: HiShieldCheck,
      gradient: "from-green-500 to-emerald-500",
      content: "An OTP will be sent to your phone. Enter the OTP and select 'Confirm'. If you didn't receive the code, select 'Didn't Receive Code?' to resend it."
    },
    {
      title: "Password Reset Flow",
      icon: HiKey,
      gradient: "from-purple-500 to-pink-500",
      content: "Forgot your password? After entering your phone number, answer your security questions. Then, enter a new password and confirm it to regain access to your account."
    },
    {
      title: "Main Interface Exploration",
      icon: HiComputerDesktop,
      gradient: "from-orange-500 to-amber-500",
      content: "Upon successful login, the 'Dashboard Page' provides access to Settings, Profile, Amenities, Navigation, Bot, and News features."
    },
    {
      title: "Account and Settings",
      icon: HiCog6Tooth,
      gradient: "from-indigo-500 to-purple-500",
      content: "Under 'Settings', you can configure your account, manage privacy, security, notifications, review Terms & Conditions, or logout. In 'Profile', update your username, password, and phone number."
    },
    {
      title: "Utilizing Features",
      icon: HiSparkles,
      gradient: "from-teal-500 to-cyan-500",
      content: "Explore amenities on the map, navigate efficiently, interact with the AI chatbot for assistance, and perform currency exchanges within the app."
    },
    {
      title: "Real-Time News",
      icon: HiNewspaper,
      gradient: "from-red-500 to-rose-500",
      content: "Stay updated with the latest news and events directly through the app."
    },
    {
      title: "Seamless User Experience",
      icon: HiHeart,
      gradient: "from-pink-500 to-rose-500",
      content: "Follow the flow diagram within the app for a step-by-step guide on using each feature effectively."
    },
    {
      title: "Support and Queries",
      icon: HiChatBubbleLeftRight,
      gradient: "from-violet-500 to-purple-500",
      content: "Refer to this section as a manual for navigating and utilizing the comprehensive features of NexusNTU."
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-4xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
          
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
          <div className="glass-card mb-6 p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <HiQuestionMarkCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Explore Singapore with Ease
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Your comprehensive guide to using NexusNTU
              </p>
            </div>
          </div>

          {/* Quick Tips Banner */}
          <div className="glass-card mb-6 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-gradient-to-r from-blue-100/60 to-cyan-100/60 dark:from-blue-900/30 dark:to-cyan-900/30 shadow-xl border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Pro Tip
                </h3>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Bookmark this page for quick access to help whenever you need it!
                </p>
              </div>
            </div>
          </div>

          {/* Help Sections */}
          <div className="space-y-6 pb-6">
            {helpSections.map((section, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ animation: `fadeIn 0.6s ease-out ${index * 0.05}s both` }}
              >
                {/* Section Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <div className="ml-16">
                  {section.items ? (
                    <div className="space-y-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                            {item.subtitle}
                          </h3>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Contact Support Card */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <HiChatBubbleLeftRight className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Need More Help?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    Contact us for further assistance or queries regarding the use of NexusNTU. Our support team is here to help you have the best experience possible.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-sm shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-purple-100/60 to-pink-100/60 dark:from-purple-900/30 dark:to-pink-900/30 shadow-xl border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                <HiSparkles className="w-5 h-5" />
                Key Features at a Glance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🗺️", text: "Interactive Map & Navigation" },
                  { icon: "🤖", text: "AI Chatbot Assistance" },
                  { icon: "💱", text: "Currency Exchange" },
                  { icon: "📰", text: "Real-Time News Updates" },
                  { icon: "📍", text: "Nearby Amenities Finder" },
                  { icon: "⚙️", text: "Customizable Settings" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      {feature.text}
                    </span>
                  </div>
                ))}
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

export default Help;