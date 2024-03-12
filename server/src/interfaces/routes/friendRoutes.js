import {Router} from "express"
const friendRoute = Router()
import { getUserAccount,followUser,unfollowUser,suggetionList } from "../controllers/friendControllers.js"





friendRoute.get('/userAccount/:id',getUserAccount);
friendRoute.post('/follow/:id',followUser);
friendRoute.post('/unfollow/:id',unfollowUser)
friendRoute.get('/suggestionlist/:id',suggetionList)
export default friendRoute