import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios/axios.js";
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'


function VerifyOTP() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          // Handle timeout here (e.g., show resend button)
        }
        return prevTimer === 0 ? 0 : prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleOtpInput = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;

    if (value && index < 3) {
      document.getElementsByName(`txt${index + 2}`)[0].focus();
    }

    setOtpInputs(newOtpInputs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Otp = otpInputs.join('');
    console.log('user entered OTP:', Otp);

    try {
      // Make a POST request to your backend API to verify the OTP
      const response = await axiosInstance.post('/otpVerify', { Otp });
      console.log('Response from backend:', response);
      if (response.status === 200) {
       
        navigate("/");
      } else {
        alert('Invalid OTP. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Axios error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid OTP!",
       
      });
    }
  };

  const handleResendOTP = async () => {
    const Otp = otpInputs.join('');
    console.log('user entered OTP:', Otp);
    try {
      const response = await axiosInstance.post('/resendotpVerify',{Otp});
      console.log('Response from backend (resend OTP):', response);
      // Reset timer to 60 seconds
      setTimer(60);
    } catch (error) {
      console.error('Axios error (resend OTP):', error);
      alert('An error occurred while resending OTP. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center "
    style={{
        background:
          "linear-gradient(to bottom right, #E86D9C, #FAAFCE, #FEADB9)",
      }}>
      <form className="bg-white bg-opacity-25 backdrop-blur-lg p-10 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold text-white text-center mb-5">Verify OTP</h1>
        <p className="text-center text-white">OTP sent to your Email,<br />Please enter the OTP to verify.</p><br />
        <div className="flex justify-center mb-4">
          {otpInputs.map((value, index) => (
            <input
              key={index}
              type="text"
              name={`txt${index + 1}`}
              maxLength="1"
              pattern="[0-9]"
              value={value}
              onChange={e => handleOtpInput(index, e.target.value)}
              className="w-12 h-12 rounded-md border border-gray-300 mr-2 text-center"
            />
          ))}
        </div>
        <div id="otp-timer" className="text-center mb-4 text-white">{timer > 0 ? `Time Remaining: ${Math.floor(timer / 60)}:${timer % 60}` : 'Timeout'}</div>
        <div className="flex justify-center mb-4">
          <a href="#" className="text-white text-center mt-3" onClick={handleResendOTP}>Resend OTP</a>
        </div>
        <div className="flex justify-center">
          <button type="submit"  className="bg-gradient-to-r from-pink-600 via-pink-400 to-pink-500 hover:from-pink-500 hover:via-pink-400 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Verify</button>
        </div>
      </form>
    </div>
  );
}

export default VerifyOTP;
