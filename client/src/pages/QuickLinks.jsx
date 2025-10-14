//QuickLinks.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/landscapelogo.png';
import backImage from '../assets/back.png';
import '../styles/QuickLinks.css';

/**
 * QuickLinks component displays categorized links for easy access to
 * NTU resources, CCDS portals, and other important student links.
 */

const QuickLinks = () => {
  const navigate = useNavigate();

  // Define all quick links organized by category
  const quickLinks = [
    // Top Links - Most frequently used
    {
      name: 'Student Intranet',
      url: 'https://entuedu.sharepoint.com/sites/student',
      category: 'top',
      icon: '📚'
    },
    {
      name: 'STARS Planner',
      url: 'https://wish.wis.ntu.edu.sg/pls/webexe/ldap_login.login?w_url=https://wish.wis.ntu.edu.sg/pls/webexe/aus_stars_planner.main',
      category: 'top',
      icon: '⭐'
    },
    {
      name: 'NTULearn',
      url: 'https://ntulearn.ntu.edu.sg/ultra/course',
      category: 'top',
      icon: '📖'
    },
    
    // NTU Links
    {
      name: 'Academic Calendar',
      url: 'https://www.ntu.edu.sg/admissions/matriculation/academic-calendars',
      category: 'ntu',
      icon: '📅'
    },
    {
      name: 'Library Booking',
      url: 'https://libcalendar.ntu.edu.sg/',
      category: 'ntu',
      icon: '📚'
    },
    {
      name: 'Degree Audit',
      url: 'https://wish.wis.ntu.edu.sg/pls/webexe/ldap_login.login?w_url=https://wish.wis.ntu.edu.sg/pls/webexe/dars_result_ro.main_display',
      category: 'ntu',
      icon: '🎓'
    },
    {
      name: 'NTU Medical Centre',
      url: 'https://www.ntu.edu.sg/life-at-ntu/health-and-safety/health-care',
      category: 'ntu',
      icon: '🏥'
    },
    {
      name: 'OneStop @ SAC',
      url: 'https://ntuadminonestop.service-now.com/ntussp',
      category: 'ntu',
      icon: '🛠️'
    },
    
    // CCDS Links
    {
      name: 'Curriculum Structure',
      url: 'https://www.ntu.edu.sg/computing/admissions/undergraduate-programmes/curriculum-structure',
      category: 'ccds',
      icon: '📋'
    },
    {
      name: 'FYP Portal',
      url: 'https://sso.wis.ntu.edu.sg/webexe88/owa/sso_redirect.asp?t=1&app=https://wis.ntu.edu.sg/webexe/owa/fyp_filter_student.main',
      category: 'ccds',
      icon: '💼'
    },
    {
      name: 'Past Papers',
      url: 'https://entuedu-my.sharepoint.com/personal/scds-academics_e_ntu_edu_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fscds-academics_e_ntu_edu_sg%2FDocuments%2FSCDS%20Past%20Year%20Papers&ga=1',
      category: 'ccds',
      icon: '📝'
    },
    {
      name: 'News & Events',
      url: 'https://www.ntu.edu.sg/computing/news-events',
      category: 'ccds',
      icon: '📰'
    },
    {
      name: 'Contact CCDS',
      url: 'https://www.ntu.edu.sg/computing/contact-us/students\'-enquiries',
      category: 'ccds',
      icon: '📞'
    },
    {
      name: 'CCDS History',
      url: 'https://www.ntu.edu.sg/computing/about-us/history',
      category: 'ccds',
      icon: '📜'
    },
    
    // Career & Financial
    {
      name: 'Career Portal',
      url: 'https://www.ntu.edu.sg/education/career-guidance-industry-collaborations/for-students/one-stop-career-portal',
      category: 'career',
      icon: '💼'
    },
    {
      name: 'Career Resources',
      url: 'https://www.ntu.edu.sg/education/career-guidance-industry-collaborations/for-students/browse-career-resources',
      category: 'career',
      icon: '📂'
    },
    {
      name: 'Financial Aid',
      url: 'https://www.ntu.edu.sg/admissions/undergraduate/financial-matters/financial-aid/faq/financial-aid-schemes-at-a-glance-to-finance-fees-living-cost',
      category: 'financial',
      icon: '💰'
    },
    {
      name: 'NTU Bursary',
      url: 'https://www.ntu.edu.sg/admissions/undergraduate/financial-matters/financial-aid/bursaries',
      category: 'financial',
      icon: '💵'
    }
  ];

  const handleLinkClick = (url, name) => {
    console.log(`Opening: ${name} (${url})`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const renderSection = (title, emoji, categoryFilter) => {
    const filteredLinks = quickLinks.filter(link => 
      Array.isArray(categoryFilter) 
        ? categoryFilter.includes(link.category)
        : link.category === categoryFilter
    );

    if (filteredLinks.length === 0) return null;

    return (
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '1.3rem', 
          fontWeight: '600',
          marginLeft: '20px',
          marginBottom: '15px',
          color: '#333'
        }}>
          {emoji} {title}
        </h2>
        <div className="dashboard-grid">
          {filteredLinks.map((link, index) => (
            <div key={index} className='dashboard-box'>
              <button 
                onClick={() => handleLinkClick(link.url, link.name)} 
                className="icon-button"
              >
                <span style={{ fontSize: '3rem' }}>{link.icon}</span>
              </button>
              <span>{link.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='dashboard-main'>
      <div className="header-container">
        <img 
          src={backImage} 
          alt="back" 
          className="back-image" 
          onClick={handleBackClick}
          style={{
            position: 'absolute',
            left: '16px',
            width: '35px',
            height: '35px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.opacity = '0.8';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.opacity = '1';
          }}
        />
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>

      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Quick Links
      </h2>

      <div style={{
        width: '100%',
        maxHeight: 'calc(100vh - 180px)',
        overflowY: 'auto',
        paddingBottom: '20px'
      }}>
        {renderSection('Top Links', '📌', 'top')}
        {renderSection('NTU Links', '🏫', 'ntu')}
        {renderSection('CCDS Links', '💻', 'ccds')}
        {renderSection('Career & Financial', '💼', ['career', 'financial'])}
      </div>

      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#888'
      }}>
        Not endorsed by NTU. Links open in new tabs.
      </div>
    </div>
  );
};

export default QuickLinks;