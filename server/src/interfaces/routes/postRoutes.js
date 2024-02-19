import {Router} from 'express'
const postRoute = Router();
import {getPostedUser,likePost,unlikePost,commentPost,getCommentedUser,deletePost} from "../controllers/postControllers.js"





postRoute.get('/getPostuser/:user',getPostedUser)
postRoute.post('/likepost/:postid', likePost);
postRoute.post('/unlikepost/:postid', unlikePost);
postRoute.post('/commentpost/:postid', commentPost); //comment on post
postRoute.get('/getCommentUser/:postId',getCommentedUser) // comment users name
postRoute.delete('/deletePost/:postId', deletePost); 



export default postRoute;