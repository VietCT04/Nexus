// EditProfile.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { isValidSingaporePostalCode } from '../utils/inputValidation';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import {
  HiArrowLeft,
  HiCamera,
  HiTrash,
  HiUser,
  HiIdentification,
  HiGlobeAlt,
  HiBriefcase,
  HiHome,
  HiMapPin,
  HiShieldCheck,
  HiXMark,
  HiCloudArrowUp
} from 'react-icons/hi2';
import defaultAvatarUrl from "../assets/defaultpfp.png";
import logoImage from "../assets/landscapelogo.png";
import bgdImage from '../assets/bgd.png';

/**
 * Modern EditProfile component with glassmorphism design
 * Allows users to edit and update their profile information with avatar upload
 */
const EditProfile = ({ userId }) => {
  const [token] = useState(localStorage.getItem('auth'));
  const { userProfile } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [isDragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    nationality: '',
    profession: '',
    homeaddress: '',
    homepostal: '',
    securityq: '',
    securityans: '',
  });

  const { updateToken } = useContext(UserContext);

  // Fetch avatar on mount
  useEffect(() => {
    const fetchAvatar = async () => {
      setIsLoading(true);
      if (userProfile && userProfile._id) {
        try {
          const response = await axios.post(`http://localhost:3000/api/v1/avatar`, {
            userId: userProfile._id,
          });
          setAvatar({ url: response.data.url, name: 'User Avatar' });
        } catch (error) {
          console.error("Error fetching avatar:", error);
          setAvatar({ url: defaultAvatarUrl, name: 'Default Avatar' });
        }
      }
      setIsLoading(false);
    };

    fetchAvatar();
  }, [userProfile]);

  // Populate form data
  useEffect(() => {
    if (!userProfile) return;

    setFormData({
      fullname: userProfile.fullname,
      gender: userProfile.gender,
      nationality: userProfile.nationality,
      profession: userProfile.profession,
      homeaddress: userProfile.homeaddress,
      homepostal: userProfile.homepostal,
      securityq: userProfile.securityq,
      securityans: userProfile.securityans,
    });
  }, [userProfile]);

  // Handle overlay click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setIsOverlayVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [overlayRef, isOverlayVisible]);

  const handleDeleteAvatar = async () => {
    if (!userProfile || !userProfile._id) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/delpic`, {
        data: { userId: userProfile._id },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setAvatar({ url: defaultAvatarUrl, name: 'Default Avatar' });
      toast.success("Profile picture removed successfully");
    } catch (error) {
      console.error("Error deleting avatar:", error);
      toast.error("Failed to remove avatar.");
    }
  };

  const handleSubmitPic = async (file) => {
    if (!(userProfile && userProfile._id)) return;

    const data = new FormData();
    data.append('file', file);
    data.append('filename', file.name);
    data.append('userId', userProfile._id);

    try {
      const result = await axios.post("http://localhost:3000/api/v1/upload", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (result.data && result.data.url) {
        setAvatar({ name: result.data.name, url: result.data.url });
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }

    setIsOverlayVisible(false);
  };

  const handleDragOver = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setDragOver(false);
    const file = evt.dataTransfer.files[0];
    if (file) handleSubmitPic(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { fullname, gender, nationality, profession, homeaddress, homepostal, securityq, securityans } = formData;

    if (!fullname || !profession || !homeaddress || !homepostal || !securityans) {
      toast.info("Please fill in all required fields!");
      setIsSubmitting(false);
      return;
    }

    if (!isValidSingaporePostalCode(homepostal)) {
      toast.info("Please enter a valid 6-digit postal code!");
      setIsSubmitting(false);
      return;
    }

    const form = {
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
      await axios.patch(
        "http://localhost:3000/api/v1/update",
        form,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      toast.success("Profile updated successfully");

      await axios.post('http://localhost:3000/api/v1/clear-cache', null, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      updateToken(token);
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />

      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-4xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="glass-card mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
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
                  alt="NexusNTU Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* Spacer */}
              <div className="w-20 sm:w-24"></div>
            </div>
          </div>

          {/* Title Card */}
          <div className="glass-card mb-6 p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
              Edit Your Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Update your personal information and settings
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="glass-card mb-6 p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HiCamera className="w-5 h-5" />
              Profile Picture
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/50 dark:border-slate-700/50 shadow-lg">
                  {isLoading ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
                  ) : (
                    <img
                      src={avatar ? avatar.url : defaultAvatarUrl}
                      alt={avatar ? avatar.name : 'Default Avatar'}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <HiCamera className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 flex-1">
                <button
                  onClick={toggleOverlay}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                >
                  <HiCloudArrowUp className="w-5 h-5" />
                  Upload New Picture
                </button>

                {avatar && avatar.url !== defaultAvatarUrl && (
                  <button
                    onClick={handleDeleteAvatar}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold border border-red-300 dark:border-red-700 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                  >
                    <HiTrash className="w-5 h-5" />
                    Remove Picture
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="glass-card mb-6 p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiUser className="w-4 h-4" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>

              {/* Gender & Nationality Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Gender */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <HiIdentification className="w-4 h-4" />
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <HiGlobeAlt className="w-4 h-4" />
                    Nationality *
                  </label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                    required
                  >
                    <option value="" disabled>Select Nationality</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="Malaysian">Malaysian</option>
                  </select>
                </div>
              </div>

              {/* Profession */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiBriefcase className="w-4 h-4" />
                  Profession *
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Enter your profession"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>

              {/* Home Address */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiHome className="w-4 h-4" />
                  Home Address *
                </label>
                <input
                  type="text"
                  name="homeaddress"
                  value={formData.homeaddress}
                  onChange={handleChange}
                  placeholder="Enter your home address"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiMapPin className="w-4 h-4" />
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="homepostal"
                  value={formData.homepostal}
                  onChange={handleChange}
                  placeholder="6-digit postal code"
                  maxLength="6"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>

              {/* Security Question */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiShieldCheck className="w-4 h-4" />
                  Security Question *
                </label>
                <select
                  name="securityq"
                  value={formData.securityq}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                  required
                >
                  <option value="" disabled>Choose a security question</option>
                  <option value="firstPet">What was the first item you bought with your own money in Singapore?</option>
                  <option value="birthCity">In what city/town/village were you born?</option>
                  <option value="childhoodNickname">What was your childhood nickname?</option>
                  <option value="favoriteTeacher">What is the name of your favorite teacher?</option>
                  <option value="memorableDate">What is the first name of your best friend from childhood?</option>
                </select>
              </div>

              {/* Security Answer */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <HiShieldCheck className="w-4 h-4" />
                  Security Answer *
                </label>
                <input
                  type="text"
                  name="securityans"
                  value={formData.securityans}
                  onChange={handleChange}
                  placeholder="Enter your answer"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving Changes...
                  </span>
                ) : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Footer Spacer */}
          <div className="mt-auto pt-6"></div>
        </div>
      </div>

      {/* Upload Overlay */}
      {isOverlayVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            ref={overlayRef}
            className="glass-card max-w-md w-full p-8 rounded-3xl border border-white/20 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={toggleOverlay}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/50"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Upload Profile Picture
            </h3>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                isDragOver
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-800/50'
              }`}
            >
              <HiCloudArrowUp className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && handleSubmitPic(e.target.files[0])}
                  className="hidden"
                />
                <span className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">
                  Choose a file
                </span>
              </label>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                or drag and drop here
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
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

export default EditProfile;