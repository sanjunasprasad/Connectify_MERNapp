import {Router} from "express"
const friendRoute = Router()
import { getUserAccount } from "../controllers/friendControllers.js"





friendRoute.get('/userAccount/:id',getUserAccount);

export default friendRoute