import {Router} from 'express'
const userRoute = Router();
import { decodeToken } from '../../middlewares/auth.js';
import {userRegister,fetchProfile,userLogin,otpVerify,resendotpVerify } from '../controllers/userControllers.js';


userRoute.post('/userRegister',  userRegister);
userRoute.post('/otpVerify',  otpVerify);
// userRoute.post('/resendotpVerify',  resendotpVerify);
userRoute.get('/userProfile', decodeToken, fetchProfile);
userRoute.post('/userLogin', userLogin);





export default userRoute;