import {Router} from 'express'
const postRoute = Router();
import { decodeToken } from '../../middlewares/auth.js';
import { upload } from '../../middlewares/multer.js';
import {createPost,loadPost,loadownPost,likePost,unlikePost,commentPost,getCommentedUser,deletePost,savedPost,getSavedPost,editPost} from "../controllers/postControllers.js"




postRoute.post('/createPost',decodeToken,upload.single('file'), createPost);
postRoute.get('/loadownPost',decodeToken,loadownPost); //own post load
postRoute.get('/loadPost/:userId', decodeToken,loadPost);//restricted post load
postRoute.post('/likepost/:postid',decodeToken, likePost);
postRoute.post('/unlikepost/:postid', decodeToken,unlikePost);
postRoute.post('/commentpost/:postid',decodeToken, commentPost); 
// postRoute.get('/getCommentUser/:postId',decodeToken,getCommentedUser) 
postRoute.delete('/deletePost/:postId',decodeToken, deletePost); 
postRoute.post('/savePost/:postId',decodeToken,savedPost);
postRoute.get('/getSavedpost/:userId',decodeToken,getSavedPost)
postRoute.put('/editPost/:postId',decodeToken,editPost)


export default postRoute;