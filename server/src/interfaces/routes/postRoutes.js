import {Router} from 'express'
const postRoute = Router();
import {getPostedUser} from "../controllers/postControllers.js"

// postRoute.get('/likepost', likePost);
// postRoute.get('/unlikepost', unlikePost);
postRoute.get('/getPostuser/:user',getPostedUser)



export default postRoute;