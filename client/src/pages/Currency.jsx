// src/pages/Currency.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import { HiArrowLeft, HiArrowsRightLeft } from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png';
import bgdImage from '../assets/bgd.png';
import { X_RapidAPI_AK } from './API_KEYS.jsx';

function CurrencyConverter() {
  const { userProfile } = useUser();

  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('UYU');
  const [amount, setAmount] = useState('');       
  const [rate, setRate] = useState(null);          
  const [convertedAmount, setConvertedAmount] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userProfile?.nationality) return;
    switch (userProfile.nationality) {
      case 'Indian':
        setToCurrency('INR');
        break;
      case 'Chinese':
        setToCurrency('CNY');
        break;
      case 'Malaysian':
        setToCurrency('MYR');
        break;
      default:
        setToCurrency('UYU');
        break;
    }
  }, [userProfile]);

  useEffect(() => {
    if (convertedAmount != null) {
      console.log('Converted Amount State (after update):', convertedAmount);
    }
  }, [convertedAmount]);

  const fetchConversionRate = async () => {
    setLoading(true);
    setError('');

    try {
      const options = {
        method: 'GET',
        url: 'https://currency-converter241.p.rapidapi.com/convert',
        params: { from: fromCurrency.toUpperCase(), to: toCurrency.toUpperCase(), amount },
        headers: {
          'X-RapidAPI-Key': X_RapidAPI_AK,
          'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com',
        },
        timeout: 10000,
      };

      console.log('Request:', options);

      const { data } = await axios.request(options);
      console.log('API data:', data);

      const apiRate = Number(data?.rate ?? data?.result?.rate);
      const apiTotal = Number(data?.total ?? data?.result ?? data?.conversion_result);

      setRate(Number.isFinite(apiRate) ? Number(apiRate.toFixed(6)) : null);
      setConvertedAmount(Number.isFinite(apiTotal) ? apiTotal : null);

      console.log('Converted Amount (value set):', apiTotal);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch conversion rate');
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRate(null);
    setConvertedAmount(null);

    if (amount === '') {
      toast.info('Please enter an amount first!');
      return;
    }

    const amt = Number(amount);
    if (!Number.isFinite(amt)) {
      toast.info('Please enter a valid numerical amount!');
      return;
    }
    if (amt <= 0) {
      toast.info('Please enter a positive amount!');
      return;
    }

    fetchConversionRate();
  };

  const switchCurrencies = () => {
    setRate(null);
    setConvertedAmount(null);
    setAmount('');

    setFromCurrency((prevFrom) => {
      const nextFrom = toCurrency;
      setToCurrency(prevFrom);
      return nextFrom;
    });
  };

  const handleBackClick = () => window.history.back();

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-2xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
          
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
              Currency Converter
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Convert currencies in real-time
            </p>
          </div>

          {/* Converter Card */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* From Section */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg shadow-lg">
                    <span className="text-sm font-bold text-white">{fromCurrency}</span>
                  </div>
                  <input
                    type="number"
                    className="w-full pl-28 pr-4 py-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all text-lg font-medium"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                    step="0.01"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button 
                  type="button" 
                  onClick={switchCurrencies}
                  className="group p-3 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 hover:scale-110"
                  aria-label="Switch currencies"
                >
                  <HiArrowsRightLeft className="w-6 h-6 text-white transform group-hover:rotate-180 transition-transform duration-300" />
                </button>
              </div>

              {/* To Section */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Converted Amount
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                    <span className="text-sm font-bold text-white">{toCurrency}</span>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-28 pr-4 py-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white text-lg font-medium focus:outline-none"
                    value={convertedAmount != null ? convertedAmount.toFixed(2) : ''}
                    readOnly
                    placeholder="Result"
                  />
                </div>
              </div>

              {/* Convert Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Converting...
                  </span>
                ) : 'Convert'}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error: {error}
                </p>
              </div>
            )}

            {/* Exchange Rate */}
            {!loading && !error && rate != null && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700">
                <p className="text-center text-sm font-semibold text-green-800 dark:text-green-200">
                  1 {fromCurrency} = {rate} {toCurrency}
                </p>
              </div>
            )}
          </div>

          {/* Footer Spacer */}
          <div className="mt-auto pt-6"></div>
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

        /* Hide number input spinners */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}

export default CurrencyConverter;