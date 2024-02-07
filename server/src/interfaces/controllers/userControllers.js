import { registerUser } from "../../usecases/UserUseCases/registerUser.js";
import { findOneUser } from "../../repositories/userRepository.js";
import {loginUser} from '../../usecases/UserUseCases/loginUser.js';
import { generateOTP, sendOTPByEmail } from '../../services/otpService.js';

let savedOTP,newOTP,userMail
export const userRegister = async (req, res) => {
  // console.log("++++++++from register");
    try {
      const { firstName, lastName, phoneNo, email, password, is_blocked} = req.body;
      // console.log('User dataoooo:', { firstName, lastName, phoneNo, email, password ,is_blocked});
       userMail=req.body.email
      savedOTP = generateOTP(); 
      await sendOTPByEmail(email, savedOTP);
  
      await registerUser(firstName, lastName, phoneNo, email, password,is_blocked);
      return res.status(200).end();
    } catch (err) {
      console.error("Error during user registration:", err);
      return res.status(500).send("Internal Server Error");
    }
  };

  export const otpVerify = async(req,res) =>{
    try{

      const { Otp } = req.body;
      const OTP = parseInt(Otp, 10);
      if( OTP === savedOTP){
        res.status(200).json({ success: true, message: "OTP matched successfully." });
      }
      else {

        res.status(400).json({ success: false, message: "Invalid OTP. Please enter the correct OTP." });
      }

    }catch(err){
      console.error('Error verifying OTP:', err);
      res.status(500).json({ success: false, message: "An error occurred during OTP verification." });
    }
  }

  export const resendotpVerify = async(req,res) =>{
    try{
      const { Otp  } = req.body;
      const OTP = parseInt(Otp, 10);
      newOTP = generateOTP(); 
      console.log("maillllll",userMail)
      await sendOTPByEmail(userMail, newOTP);
      console.log("otp backend",newOTP)
      console.log("frontend user entered otp",OTP)
      if( OTP === newOTP){
        res.status(200).json({ success: true, message: "OTP matched successfully." });
      }
      else {

        res.status(400).json({ success: false, message: "Invalid OTP. Please enter the correct OTP." });
      }

    }catch(err){
      console.error('Error verifying OTP:', err);
      res.status(500).json({ success: false, message: "An error occurred during OTP verification." });
    }
  }
  

// for user home page
  export const fetchProfile = async (req, res) => {
    console.log("++++userdata:")
    try{
      const userId = req.token.userId
      const response = await findOneUser(userId);
     
      return res.status(200).json(response);
    }catch(err){
      console.log(err);
    }
  }


  
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email,password);
    // console.log("from login controller token",response)
    if (!response) {
      return res.status(401).end(); // User not found or password incorrect
    } else if (response.blocked) {
      return res.status(401).json({ message: response.message }); // User is blocked
    } else {
      return res.status(200).json(response); // Successful login
    }
 
    
  } catch (err) {
    console.log(err);
  }
};

