import {Router} from 'express'
const postRoute = Router();
import {getPostedUser,likePost,unlikePost,commentPost,getCommentedUser} from "../controllers/postControllers.js"





postRoute.get('/getPostuser/:user',getPostedUser)
postRoute.post('/likepost/:postid', likePost);
postRoute.post('/unlikepost/:postid', unlikePost);
postRoute.post('/commentpost/:postid', commentPost); //comment on post
postRoute.get('/getCommentUser/:postId',getCommentedUser) // comment users name




export default postRoute;