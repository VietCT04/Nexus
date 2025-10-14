// Profile.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiArrowRight, HiUser, HiHome, HiBriefcase, HiGlobeAlt, HiShieldCheck } from "react-icons/hi2";
import { isValidSingaporePostalCode } from '../utils/inputValidation';
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from '../contexts/UserContext';
import Logo from "../assets/landscapelogo.png";
import { 
  GeometricBackground, 
  GlassCard, 
  PageContainer, 
  Button, 
  PageHeader,
  customAnimations 
} from '../components/SharedComponents';

/**
 * Profile Details component with glassmorphism design
 * Handles user profile information collection during registration
 */

const Profile = ({ theme = 'warmOrange' }) => {
  const { updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    let fullname = e.target.fullname.value;
    let gender = e.target.gender.value;
    let profession = e.target.job.value;
    let nationality = e.target.nationality.value;
    let homeaddress = e.target.haddress.value;
    let homepostal = e.target.homepostalCode.value;
    let securityq = e.target.securityQuestion.value;
    let securityans = e.target.securityAnswer.value;

    if (!fullname || !gender || !profession || !nationality || !homeaddress || !homepostal || !securityq || !securityans) {
      toast.error("Please fill in all inputs");
      return;
    }

    if (!isValidSingaporePostalCode(homepostal)) {
      toast.info("Please enter a valid 6-digit postal code!");
      return;
    }

    const { username, password, ph } = location.state || {};
    const formData = {
      username,
      password,
      ph,
      fullname,
      gender,
      nationality,
      profession,
      homeaddress,
      homepostal,
      securityq,
      securityans
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        formData
      );
      updateToken(response.data.token);
      navigate("/profilepic");
    } catch (err) {
      console.log(err);
      toast.error("Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 dark:text-gray-100";
  
  const selectClasses = "w-full px-4 py-3 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <GeometricBackground theme={theme} />
      
      <PageContainer maxWidth="max-w-[640px] md:max-w-[720px] xl:max-w-[800px]">
        <GlassCard theme={theme}>
          <PageHeader 
            logo={Logo}
            title="Complete Your Profile"
            subtitle="Please enter your details to create your account"
            theme={theme}
          />

          <form onSubmit={handleProfileSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <HiUser className="w-4 h-4" />
                  <span>Full Name <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter your full name"
                className={inputClasses}
                required
              />
            </div>

            {/* Gender & Nationality Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    defaultValue=""
                    className={selectClasses}
                    required
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <HiGlobeAlt className="w-4 h-4" />
                    <span>Nationality <span className="text-red-500">*</span></span>
                  </div>
                </label>
                <div className="relative">
                  <select
                    id="nationality"
                    name="nationality"
                    defaultValue=""
                    className={selectClasses}
                    required
                  >
                    <option value="" disabled>Select nationality</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="Malaysian">Malaysian</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Profession */}
            <div className="space-y-2">
              <label htmlFor="job" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <HiBriefcase className="w-4 h-4" />
                  <span>Profession <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="text"
                id="job"
                name="job"
                placeholder="Enter your profession"
                className={inputClasses}
                required
              />
            </div>

            {/* Home Address */}
            <div className="space-y-2">
              <label htmlFor="haddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <HiHome className="w-4 h-4" />
                  <span>Home Address <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="text"
                id="haddress"
                name="haddress"
                placeholder="Enter your home address"
                className={inputClasses}
                required
              />
            </div>

            {/* Home Postal Code */}
            <div className="space-y-2">
              <label htmlFor="homepostalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Home Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="homepostalCode"
                name="homepostalCode"
                placeholder="6-digit postal code"
                maxLength="6"
                className={inputClasses}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter a valid 6-digit Singapore postal code
              </p>
            </div>

            {/* Security Question Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <HiShieldCheck className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Security Question
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Choose a security question to help recover your account if needed
              </p>

              {/* Security Question Dropdown */}
              <div className="space-y-2 mb-4">
                <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="securityQuestion"
                    name="securityQuestion"
                    defaultValue=""
                    className={selectClasses}
                    required
                  >
                    <option value="" disabled>Choose a security question</option>
                    <option value="firstPet">What was the first item you bought with your own money in Singapore?</option>
                    <option value="birthCity">In what city/town/village were you born?</option>
                    <option value="childhoodNickname">What was your childhood nickname?</option>
                    <option value="favoriteTeacher">What is the name of your favorite teacher?</option>
                    <option value="memorableDate">What is the first name of your best friend from childhood?</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Security Answer */}
              <div className="space-y-2">
                <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Answer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="securityAnswer"
                  name="securityAnswer"
                  placeholder="Enter your answer"
                  className={inputClasses}
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Remember this answer - you'll need it for account recovery
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              icon={HiArrowRight}
              loading={loading}
              theme={theme}
              className="w-full mt-6"
            >
              Create Account
            </Button>
          </form>
        </GlassCard>
      </PageContainer>

      {/* Custom styles */}
      <style>{`
        ${customAnimations}
        
        select option {
          background-color: white;
          color: #1f2937;
        }
        
        .dark select option {
          background-color: #1e293b;
          color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default Profile;