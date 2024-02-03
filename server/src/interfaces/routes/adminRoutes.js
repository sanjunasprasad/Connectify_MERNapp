import {Router} from 'express';
const adminRoute = Router();
import { adminLogin ,loadUsers, userBlock,deleteuser,} from '../controllers/adminControllers.js';


adminRoute.post('/adminLogin', adminLogin);
adminRoute.get('/loadDashboard', loadUsers);
adminRoute.patch('/blockuser/:id', userBlock);
adminRoute.delete('/adminDeleteUser/:id', deleteuser);


export default adminRoute;