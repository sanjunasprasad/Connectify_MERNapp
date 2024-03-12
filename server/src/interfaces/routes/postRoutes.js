import {Router} from 'express'
const postRoute = Router();
import { upload } from '../../middlewares/multer.js';
import {createPost,loadPost,loadownPost,likePost,unlikePost,commentPost,getCommentedUser,deletePost} from "../controllers/postControllers.js"




postRoute.post('/createPost',upload.single('file'), createPost);
postRoute.get('/loadPost', loadownPost);
postRoute.get('/loadPost/:userId', loadPost);
postRoute.post('/likepost/:postid', likePost);
postRoute.post('/unlikepost/:postid', unlikePost);
postRoute.post('/commentpost/:postid', commentPost); 
postRoute.get('/getCommentUser/:postId',getCommentedUser) 
postRoute.delete('/deletePost/:postId', deletePost); 



export default postRoute;