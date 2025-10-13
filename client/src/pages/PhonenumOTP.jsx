// PhonenumOTP.jsx
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowRight, HiPhone } from "react-icons/hi2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import axios from "axios";
import Logo from "../assets/crbologo.png";
import { UserContext } from "../contexts/UserContext";
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
 * Phone Number Verification component with glassmorphism design
 * Handles phone number entry for registration and forgot password flows
 */

const PhonenumOTP = ({ theme = 'warmOrange' }) => {
  const { updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { comingFrom, username, password } = location.state || {};
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!ph && comingFrom !== "login") {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      if (comingFrom === "register") {
        // Just proceed to the next step with the phone number
        navigate("/profile", { state: { username, password, ph } });
        return;
      }

      if (comingFrom === "login") {
        // Skip OTP: issue token now and go to dashboard
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/giveToken",
          { username }
        );
        updateToken(data.token);
        navigate("/dashboard");
        return;
      }

      // Forgot password flow (no state passed): ensure phone exists, then go to security questions
      await axios.post("http://localhost:3000/api/v1/forgotpasswordphauth", {
        ph,
      });
      navigate("/securityq", { state: { ph } });
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getTitleAndSubtitle = () => {
    if (comingFrom === "login") {
      return {
        title: "Phone Verification",
        subtitle: "Confirm your registered phone number (optional)"
      };
    }
    return {
      title: "Phone Verification",
      subtitle: "Enter your phone number to continue"
    };
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <GeometricBackground theme={theme} />
      
      <PageContainer maxWidth="max-w-[560px] md:max-w-[640px] xl:max-w-[720px]">
        <GlassCard theme={theme}>
          <PageHeader 
            logo={Logo}
            title={title}
            subtitle={subtitle}
            theme={theme}
          />

          <form onSubmit={handleContinue} className="space-y-6" noValidate>
            {/* Phone Input */}
            {comingFrom !== "login" && (
              <div className="space-y-2">
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <HiPhone className="w-4 h-4" />
                    <span>Phone Number <span className="text-red-500">*</span></span>
                  </div>
                </label>
                <div className="phone-input-wrapper">
                  <PhoneInput
                    country="sg"
                    value={ph}
                    onChange={setPh}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                    containerClass="w-full"
                    inputClass="w-full px-4 py-3 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200"
                    buttonClass="!bg-white/80 dark:!bg-slate-800/80 !border-2 !border-gray-200 dark:!border-slate-700 !rounded-l-xl hover:!bg-gray-50 dark:hover:!bg-slate-700/80 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  We'll use this number for account verification and security
                </p>
              </div>
            )}

            {/* Continue Button */}
            <Button
              type="submit"
              variant="primary"
              icon={HiArrowRight}
              loading={loading}
              theme={theme}
              className="w-full"
            >
              Continue
            </Button>
          </form>

          {/* Optional Skip Info for Login Flow */}
          {comingFrom === "login" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can skip this step if you prefer
              </p>
            </div>
          )}
        </GlassCard>
      </PageContainer>

      {/* Custom styles for phone input */}
      <style>{`
        ${customAnimations}
        
        .phone-input-wrapper .react-tel-input .form-control {
          width: 100% !important;
          height: auto !important;
          font-size: 1rem !important;
        }
        
        .phone-input-wrapper .react-tel-input .flag-dropdown {
          border-right: none !important;
        }
        
        .dark .phone-input-wrapper .react-tel-input .form-control {
          color: rgb(241 245 249) !important;
        }
        
        .dark .phone-input-wrapper .react-tel-input .selected-flag:hover,
        .dark .phone-input-wrapper .react-tel-input .selected-flag:focus {
          background-color: rgb(51 65 85 / 0.8) !important;
        }
      `}</style>
    </div>
  );
};

export default PhonenumOTP;