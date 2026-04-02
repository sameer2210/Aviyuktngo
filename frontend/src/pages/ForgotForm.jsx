import React, { useState, useEffect } from 'react';
import axios from '../instant/axios';
import { useNavigate } from 'react-router-dom'; // <--- Added for redirect

function ForgotPass() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // <--- Hook for navigation

  const handleSendOTP = async () => {
    try {
      await axios.post('/api/auth/send-otp', { email });
      setStep(2);
      setError('');
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await axios.post('/api/auth/verify-otp', { email, otp });
      setStep(3);
      setError('');
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post('/api/auth/reset-password', { email, newPassword });
      setSuccess('Password reset successful!');
      setStep(4);
      setError('');

      // Redirect after 2 seconds
    
        navigate('/');
      

    } catch (error) {
      setError('Error resetting password');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mb-22 mt-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Password Reset</h1>

      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSendOTP}
            className="w-full bg-[#335288] hover:bg-transparent hover:text-[#335288] border-1 border-[#335288] text-white py-2 rounded"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleVerifyOTP}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Verify OTP
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-green-500 text-center">{success}</h2>
          <p className="text-gray-500 text-center mt-2">Redirecting to home...</p>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default ForgotPass;
