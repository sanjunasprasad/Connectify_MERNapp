import {Router} from 'express';
const adminRoute = Router();
import { adminLogin ,loadUsers, userBlock} from '../controllers/adminControllers.js';


adminRoute.post('/adminLogin', adminLogin);
adminRoute.get('/loadDashboard', loadUsers);
adminRoute.patch('/blockuser/:id', userBlock);


export default adminRoute;