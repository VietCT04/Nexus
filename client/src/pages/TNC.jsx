//T&C.jsx
import React from 'react';
import { 
  HiArrowLeft,
  HiDocumentText,
  HiShieldCheck,
  HiInformationCircle,
  HiGlobeAlt,
  HiKey,
  HiUserGroup,
  HiEnvelope
} from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png'; 
import bgdImage from '../assets/bgd.png';

const TandC = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const sections = [
    {
      title: "Introduction",
      icon: HiInformationCircle,
      gradient: "from-blue-500 to-cyan-500",
      content: "This Privacy Policy outlines the collection, use, and disclosure of personal information by CROSS BORDER when you use our services. By accessing or using our service, you consent to the processing of your information as described in this policy."
    },
    {
      title: "Definitions",
      icon: HiDocumentText,
      gradient: "from-purple-500 to-pink-500",
      content: [
        { term: "Personal Data", desc: "includes identifiable information like your name, phone number, and address." },
        { term: "Usage Data", desc: "is automatically collected data, such as your device's IP address and browser type." },
        { term: "Cookies", desc: "are small files stored on your device to enhance service functionality." }
      ]
    },
    {
      title: "Data Collection",
      icon: HiShieldCheck,
      gradient: "from-green-500 to-emerald-500",
      content: "We collect Personal Data and Usage Data to provide and improve our services. With your permission, we may also collect location and camera/photos from your device."
    },
    {
      title: "Use of Data",
      icon: HiKey,
      gradient: "from-orange-500 to-amber-500",
      content: "Data is used for service provision, account management, communication, marketing, and service improvement. We may share your data with service providers, affiliates, business partners, and for legal reasons."
    },
    {
      title: "Data Retention and Transfer",
      icon: HiGlobeAlt,
      gradient: "from-indigo-500 to-purple-500",
      content: "Your Personal Data is kept as long as necessary for the purposes outlined in this policy. Data may be transferred internationally, subject to data protection safeguards."
    },
    {
      title: "Your Rights",
      icon: HiUserGroup,
      gradient: "from-red-500 to-rose-500",
      content: "You have the right to update, amend, or delete your personal information. You can manage your information through your account settings or by contacting us."
    },
    {
      title: "Security and Children's Privacy",
      icon: HiShieldCheck,
      gradient: "from-teal-500 to-cyan-500",
      content: "We strive to protect your Personal Data but cannot guarantee its absolute security. Our service does not target children under 13, and we do not knowingly collect data from them."
    },
    {
      title: "Changes to Policy",
      icon: HiDocumentText,
      gradient: "from-violet-500 to-purple-500",
      content: "We may update this policy and will notify you of changes."
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
                <HiDocumentText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Privacy Policy for CROSS BORDER
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last Updated: October 13, 2025
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6 pb-6">
            {sections.map((section, index) => (
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
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <div className="ml-16">
                  {Array.isArray(section.content) ? (
                    <div className="space-y-3">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50">
                          <p className="text-gray-900 dark:text-white">
                            <strong>{item.term}</strong> {item.desc}
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

            {/* Contact Footer Card */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <HiEnvelope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Contact Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    For questions or concerns, contact us via our website.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-yellow-100/60 to-amber-100/60 dark:from-yellow-900/30 dark:to-amber-900/30 shadow-xl border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <HiInformationCircle className="w-6 h-6 text-yellow-700 dark:text-yellow-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                    Important Notice
                  </h4>
                  <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                    By using NexusNTU services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our services.
                  </p>
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

export default TandC;