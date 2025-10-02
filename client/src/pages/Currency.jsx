// src/pages/Currency.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import '../styles/Currency.css';
import { toast } from 'react-toastify';
import logoImage from '../assets/landscapelogo.png';
import backImage from '../assets/back.png';
import { X_RapidAPI_AK } from './API_KEYS.jsx';

function CurrencyConverter() {
  const { userProfile } = useUser();

  const [fromCurrency, setFromCurrency] = useState('SGD');
  const [toCurrency, setToCurrency] = useState('UYU');
  const [amount, setAmount] = useState('');             // keep as string for input
  const [rate, setRate] = useState(null);               // number | null
  const [convertedAmount, setConvertedAmount] = useState(null); // number | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pick default "to" currency from user nationality
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

  // Log when convertedAmount actually updates (state updates are async)
  useEffect(() => {
    if (convertedAmount != null) {
      // eslint-disable-next-line no-console
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

      // eslint-disable-next-line no-console
      console.log('Request:', options);

      const { data } = await axios.request(options);
      // eslint-disable-next-line no-console
      console.log('API data:', data);

      // Defensive parsing (providers sometimes change shapes)
      const apiRate =
        Number(data?.rate ?? data?.result?.rate);
      const apiTotal =
        Number(data?.total ?? data?.result ?? data?.conversion_result);

      setRate(Number.isFinite(apiRate) ? Number(apiRate.toFixed(6)) : null);
      setConvertedAmount(Number.isFinite(apiTotal) ? apiTotal : null);

      // eslint-disable-next-line no-console
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

    // swap using a temp
    setFromCurrency((prevFrom) => {
      const nextFrom = toCurrency;
      setToCurrency(prevFrom);
      return nextFrom;
    });
  };

  const handleBackClick = () => window.history.back();

  return (
    <div className="currency-main">
      <div className="header-container">
        <img src={backImage} alt="back" className="back-image" onClick={handleBackClick} />
        <img src={logoImage} alt="Logo" className="logo-image" />
        <div />
      </div>

      <h2>Currency Currency</h2>

      <form onSubmit={handleSubmit}>
        <div className="currency-group-container">
          <div className="form-group">
            <label htmlFor="fromCurrency">From Currency:</label>
            <div className="currency-input">
              <input
                type="text"
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
              />
              <button type="button" className="switch-button" onClick={switchCurrencies}>
                ⇄
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="toCurrency">To Currency:</label>
            <input
              type="text"
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <div className="form-group2">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
        </div>

        <button type="submit" className="convert-button" disabled={loading}>
          Convert
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div id="convert-result">
          <p>Rate: {rate != null ? rate : 'N/A'}</p>
          <p>
            Converted Amount:{' '}
            {convertedAmount != null ? convertedAmount.toFixed(2) : '--'} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
