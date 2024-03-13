import {Router} from 'express'
const postRoute = Router();
import { decodeToken } from '../../middlewares/auth.js';
import { upload } from '../../middlewares/multer.js';
import {createPost,loadPost,loadownPost,likePost,unlikePost,commentPost,getCommentedUser,deletePost} from "../controllers/postControllers.js"




postRoute.post('/createPost',decodeToken,upload.single('file'), createPost);
postRoute.get('/loadPost',decodeToken, loadownPost);
postRoute.get('/loadPost/:userId', decodeToken,loadPost);
postRoute.post('/likepost/:postid',decodeToken, likePost);
postRoute.post('/unlikepost/:postid', decodeToken,unlikePost);
postRoute.post('/commentpost/:postid',decodeToken, commentPost); 
postRoute.get('/getCommentUser/:postId',decodeToken,getCommentedUser) 
postRoute.delete('/deletePost/:postId',decodeToken, deletePost); 



export default postRoute;