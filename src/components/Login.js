// src/components/Login.js
import React, { useState, useEffect } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
        setMessage(`OTP sent to ${phoneNumber}`);
        setCountdown(60); // 60 seconds countdown
        console.log('Debug OTP:', data.debug_otp); // Remove in production
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp_code: otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        
        setMessage('Login successful! Redirecting...');
        
        // Call the onLogin callback to switch to admin panel
        setTimeout(() => {
          onLogin(data.user);
        }, 1000);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP resent successfully');
        setCountdown(60);
        console.log('Debug OTP:', data.debug_otp); // Remove in production
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">🏦</span>
            <h1>FinTrust Admin</h1>
          </div>
          <p>Secure Admin Portal Access</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="phone-input-container">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || phoneNumber.length !== 10}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="login-form">
            <div className="otp-info">
              <p>Enter OTP sent to <strong>+91 {phoneNumber}</strong></p>
              <button 
                type="button" 
                className="change-number-btn"
                onClick={() => setStep('phone')}
                disabled={loading}
              >
                Change Number
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="otp">OTP Code</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
                disabled={loading}
              />
            </div>

            <div className="otp-actions">
              <button 
                type="button" 
                className="resend-btn"
                onClick={handleResendOtp}
                disabled={loading || countdown > 0}
              >
                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Verifying...
                </>
              ) : (
                'Verify & Login'
              )}
            </button>
          </form>
        )}

        {message && (
          <div className="message success">
            <span>✅</span>
            {message}
          </div>
        )}

        {error && (
          <div className="message error">
            <span>❌</span>
            {error}
          </div>
        )}

        <div className="login-footer">
          <p>🔒 Your data is securely encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Login;