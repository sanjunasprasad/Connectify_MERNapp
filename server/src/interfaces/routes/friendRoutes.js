import {Router} from "express"
const friendRoute = Router()
import { decodeToken } from '../../middlewares/auth.js';
import { getUserAccount,followUser,unfollowUser,suggetionList } from "../controllers/friendControllers.js"





friendRoute.get('/userAccount/:id',decodeToken,getUserAccount);
friendRoute.post('/follow/:id',decodeToken,followUser);
friendRoute.post('/unfollow/:id',decodeToken,unfollowUser)
friendRoute.get('/suggestionlist/:id',decodeToken,suggetionList)
export default friendRoute