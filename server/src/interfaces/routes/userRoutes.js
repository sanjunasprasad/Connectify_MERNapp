import {Router} from 'express'
const userRoute = Router();
import { upload } from '../../middlewares/multer.js';
import { decodeToken } from '../../middlewares/auth.js';
import { userRegister,fetchProfile,userLogin,otpVerify,resendotp,updateUser} from '../controllers/userControllers.js';



userRoute.post('/userRegister',  userRegister);
userRoute.post('/otpVerify',  otpVerify);
userRoute.get('/resendotp',  resendotp);
userRoute.post('/userLogin', userLogin);
userRoute.get('/userProfile', decodeToken, fetchProfile); //get logged user home,profile
userRoute.put('/updateUser/:id', decodeToken,upload.single('file'),updateUser);



export default userRoute;