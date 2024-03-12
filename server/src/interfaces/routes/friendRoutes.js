import {Router} from "express"
const friendRoute = Router()
import { getUserAccount,followUser,unfollowUser } from "../controllers/friendControllers.js"





friendRoute.get('/userAccount/:id',getUserAccount);
friendRoute.post('/follow/:id',followUser);
friendRoute.post('/unfollow/:id',unfollowUser)
export default friendRoute