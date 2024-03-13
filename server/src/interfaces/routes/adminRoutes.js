import {Router} from 'express';
const adminRoute = Router();
import { decodeAdminToken } from '../../middlewares/auth.js';
import { adminLogin ,loadUsers, userBlock,deleteuser,} from '../controllers/adminControllers.js';


adminRoute.post('/adminLogin', adminLogin);
adminRoute.get('/loadUsers',decodeAdminToken, loadUsers);
adminRoute.patch('/blockuser/:id', decodeAdminToken,userBlock);
adminRoute.delete('/adminDeleteUser/:id', decodeAdminToken,deleteuser);


export default adminRoute;