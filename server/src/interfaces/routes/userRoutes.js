import {Router} from 'express'
const userRoute = Router();
import { upload } from '../../middlewares/multer.js';
import { decodeToken } from '../../middlewares/auth.js';
import {userRegister,fetchProfile,userLogin,otpVerify,resendotpVerify,updateUser } from '../controllers/userControllers.js';
import {createPost,loadPost} from '../controllers/postControllers.js';


userRoute.post('/userRegister',  userRegister);
userRoute.post('/otpVerify',  otpVerify);
userRoute.post('/resendotpVerify',  resendotpVerify);
userRoute.post('/userLogin', userLogin);
userRoute.get('/userProfile', decodeToken, fetchProfile); //get logged user home,profile
userRoute.post('/createPost',upload.single('file'), createPost);
userRoute.get('/loadPost', loadPost);
userRoute.put('/updateUser/:id', updateUser);



export default userRoute;