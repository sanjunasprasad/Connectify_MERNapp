import {Router} from 'express'
const postRoute = Router();
import {getPostedUser,likePost} from "../controllers/postControllers.js"


postRoute.get('/getPostuser/:user',getPostedUser)
postRoute.post('/likepost/:postid', likePost);
// postRoute.get('/unlikepost', unlikePost);




export default postRoute;