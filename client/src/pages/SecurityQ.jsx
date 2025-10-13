//SecurityQ.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowLeft, HiArrowRight, HiShieldCheck, HiXCircle } from "react-icons/hi2";
import { toast } from 'react-toastify';
import axios from "axios";
import Logo from '../assets/crbologo.png'; 
import { UserContext } from '../contexts/UserContext';
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
 * Security Question component with glassmorphism design
 * Handles security question verification for password reset flow
 */

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
      
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
          <HiXCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

function SecurityQuestion({ theme = 'warmOrange' }) {
  const { updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [answer, setAnswer] = useState('');
  const [securityqueskeyword, setKeyword] = useState('');
  const [question, setQ] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ph } = location.state || {};

  // Effect hook to fetch the security question based on the user's phone number
  useEffect(() => {
    const fetchques = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/getq", { ph: ph });
        setKeyword(response.data.msg);
        
        switch (response.data.msg) {
          case 'firstPet':
            setQ("What was the first item you bought with your own money in Singapore?");
            break;
          case 'birthCity':
            setQ("In what city/town/village were you born?");
            break;
          case 'childhoodNickname':
            setQ("What was your childhood nickname?");
            break;
          case 'favoriteTeacher':
            setQ("What is the name of your favorite teacher?");
            break;
          case 'memorableDate':
            setQ("What is the first name of your best friend from childhood?");
            break;
          default:
            setQ("");
            break;
        }
      } catch (err) {
        console.error("Failed to fetch security question:", err);
        toast.error("Failed to load security question");
      }
    };
    fetchques();
  }, [ph]);

  // Handles the submission of the security question's answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (answer === "") {
      setError("Please provide an answer");
      toast.error("Please fill in the answer!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/verifyanswer", { 
        ph: ph, 
        answer: answer 
      });
      
      if (response.data.correct) {
        try {
          const tokenResponse = await axios.post("http://localhost:3000/api/v1/giveTokenUsingPh", { ph: ph });
          updateToken(tokenResponse.data.token);
        } catch (error) {
          console.error(error);
        }
        navigate("/reset");
        toast.success("Login successful! Please reset your password");
      } else {
        setError("The answer is incorrect");
        toast.error("The answer is incorrect, please try again");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Verification failed");
      toast.error(err.response?.data?.msg || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <GeometricBackground theme={theme} />
      
      <PageContainer maxWidth="max-w-[560px] md:max-w-[640px] xl:max-w-[720px]">
        <GlassCard theme={theme}>
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded px-2 py-1"
            aria-label="Go back"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <PageHeader 
            logo={Logo}
            title="Security Question"
            subtitle="Answer your security question to verify your identity"
            theme={theme}
          />

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Security Question Display */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <HiShieldCheck className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-200 mb-1">
                    Your Security Question:
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {question || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Input */}
            <FloatingInput
              id="securityAnswer"
              name="securityAnswer"
              type="text"
              label="Your Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              error={error}
              required
              autoFocus
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              icon={HiArrowRight}
              loading={isLoading}
              theme={theme}
              className="w-full"
            >
              Verify Answer
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              The answer is case-sensitive and must match exactly
            </p>
          </div>
        </GlassCard>
      </PageContainer>

      <style>{customAnimations}</style>
    </div>
  );
}

export default SecurityQuestion;
