import {Router} from 'express'
const postRoute = Router();
import {getPostedUser,likePost,unlikePost} from "../controllers/postControllers.js"





postRoute.get('/getPostuser/:user',getPostedUser)
postRoute.post('/likepost/:postid', likePost);
postRoute.post('/unlikepost/:postid', unlikePost);




export default postRoute;