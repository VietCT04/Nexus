import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiArrowLeft,
  HiAcademicCap,
  HiBookOpen,
  HiCalendar,
  HiBuildingLibrary,
  HiClipboardDocumentList,
  HiHeart,
  HiWrench,
  HiDocumentText,
  HiBriefcase,
  HiNewspaper,
  HiPhone,
  HiDocumentMagnifyingGlass,
  HiCurrencyDollar,
  HiBanknotes,
  HiFolderOpen
} from 'react-icons/hi2';
import Logo from '../assets/landscapelogo.png';
import bgdImage from '../assets/bgd.png';
import { customAnimations } from '../components/SharedComponents';

/**
 * QuickLinks component with glassmorphism design
 * Displays categorized links for easy access to NTU resources
 */

const QuickLinks = ({ theme = 'warmOrange' }) => {
  const navigate = useNavigate();

  // Define all quick links organized by category
  const quickLinks = [
    // Top Links - Most frequently used
    {
      name: 'Student Intranet',
      url: 'https://entuedu.sharepoint.com/sites/student',
      category: 'top',
      icon: HiAcademicCap,
      color: 'from-orange-500 to-amber-500'
    },
    {
      name: 'STARS Planner',
      url: 'https://wish.wis.ntu.edu.sg/pls/webexe/ldap_login.login?w_url=https://wish.wis.ntu.edu.sg/pls/webexe/aus_stars_planner.main',
      category: 'top',
      icon: HiClipboardDocumentList,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'NTULearn',
      url: 'https://ntulearn.ntu.edu.sg/ultra/course',
      category: 'top',
      icon: HiBookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    
    // NTU Links
    {
      name: 'Academic Calendar',
      url: 'https://www.ntu.edu.sg/admissions/matriculation/academic-calendars',
      category: 'ntu',
      icon: HiCalendar,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Library Booking',
      url: 'https://libcalendar.ntu.edu.sg/',
      category: 'ntu',
      icon: HiBuildingLibrary,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Degree Audit',
      url: 'https://wish.wis.ntu.edu.sg/pls/webexe/ldap_login.login?w_url=https://wish.wis.ntu.edu.sg/pls/webexe/dars_result_ro.main_display',
      category: 'ntu',
      icon: HiDocumentMagnifyingGlass,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'NTU Medical Centre',
      url: 'https://www.ntu.edu.sg/life-at-ntu/health-and-safety/health-care',
      category: 'ntu',
      icon: HiHeart,
      color: 'from-red-500 to-rose-500'
    },
    {
      name: 'OneStop @ SAC',
      url: 'https://ntuadminonestop.service-now.com/ntussp',
      category: 'ntu',
      icon: HiWrench,
      color: 'from-gray-500 to-slate-500'
    },
    
    // CCDS Links
    {
      name: 'Curriculum Structure',
      url: 'https://www.ntu.edu.sg/computing/admissions/undergraduate-programmes/curriculum-structure',
      category: 'ccds',
      icon: HiDocumentText,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      name: 'FYP Portal',
      url: 'https://sso.wis.ntu.edu.sg/webexe88/owa/sso_redirect.asp?t=1&app=https://wis.ntu.edu.sg/webexe/owa/fyp_filter_student.main',
      category: 'ccds',
      icon: HiBriefcase,
      color: 'from-violet-500 to-purple-500'
    },
    {
      name: 'Past Papers',
      url: 'https://entuedu-my.sharepoint.com/personal/scds-academics_e_ntu_edu_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fscds-academics_e_ntu_edu_sg%2FDocuments%2FSCDS%20Past%20Year%20Papers&ga=1',
      category: 'ccds',
      icon: HiFolderOpen,
      color: 'from-amber-500 to-yellow-500'
    },
    {
      name: 'News & Events',
      url: 'https://www.ntu.edu.sg/computing/news-events',
      category: 'ccds',
      icon: HiNewspaper,
      color: 'from-lime-500 to-green-500'
    },
    {
      name: 'Contact CCDS',
      url: 'https://www.ntu.edu.sg/computing/contact-us/students\'-enquiries',
      category: 'ccds',
      icon: HiPhone,
      color: 'from-sky-500 to-blue-500'
    },
    {
      name: 'CCDS History',
      url: 'https://www.ntu.edu.sg/computing/about-us/history',
      category: 'ccds',
      icon: HiDocumentText,
      color: 'from-orange-500 to-red-500'
    },
    
    // Career & Financial
    {
      name: 'Career Portal',
      url: 'https://www.ntu.edu.sg/education/career-guidance-industry-collaborations/for-students/one-stop-career-portal',
      category: 'career',
      icon: HiBriefcase,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Career Resources',
      url: 'https://www.ntu.edu.sg/education/career-guidance-industry-collaborations/for-students/browse-career-resources',
      category: 'career',
      icon: HiFolderOpen,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Financial Aid',
      url: 'https://www.ntu.edu.sg/admissions/undergraduate/financial-matters/financial-aid/faq/financial-aid-schemes-at-a-glance-to-finance-fees-living-cost',
      category: 'financial',
      icon: HiCurrencyDollar,
      color: 'from-green-500 to-lime-500'
    },
    {
      name: 'NTU Bursary',
      url: 'https://www.ntu.edu.sg/admissions/undergraduate/financial-matters/financial-aid/bursaries',
      category: 'financial',
      icon: HiBanknotes,
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  const handleLinkClick = (url, name) => {
    console.log(`Opening: ${name} (${url})`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderSection = (title, categoryFilter) => {
    const filteredLinks = quickLinks.filter(link => 
      Array.isArray(categoryFilter) 
        ? categoryFilter.includes(link.category)
        : link.category === categoryFilter
    );

    if (filteredLinks.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 px-4">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(link.url, link.name)}
              className="group relative overflow-hidden glass-card p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-orange-500/50 aspect-square flex flex-col items-center justify-center"
              style={{ animation: `fadeIn 0.6s ease-out ${index * 0.05}s both` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <link.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Label */}
              <h3 className="relative text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors text-center leading-tight">
                {link.name}
              </h3>

              {/* External Link Indicator */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full shadow-lg" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-7xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="glass-card mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
              aria-label="Back to Dashboard"
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
                alt="NexusNTU Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>

            {/* Spacer for symmetry */}
            <div className="w-20 sm:w-24"></div>
          </div>
        </div>

        {/* Mobile Title */}
        <div className="sm:hidden glass-card mb-6 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            Quick Links
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Access NTU resources quickly
          </p>
        </div>

        {/* Links Sections - Scrollable */}
        <div className="flex-1 pb-6 space-y-8">
          {renderSection('📌 Top Links', 'top')}
          {renderSection('🏫 NTU Links', 'ntu')}
          {renderSection('💻 CCDS Links', 'ccds')}
          {renderSection('💼 Career & Financial', ['career', 'financial'])}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 pb-2 text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Not endorsed by NTU. All links open in new tabs.
          </p>
        </div>
      </div>
      </div>

      <style>{`
        ${customAnimations}
        
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

export default QuickLinks;