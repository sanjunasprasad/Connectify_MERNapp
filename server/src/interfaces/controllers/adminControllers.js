import {checkLogin} from '../../usecases/AdminUseCases/checkAdmin.js'
import { getUsers  } from '../../usecases/AdminUseCases/getUsers.js';
import {blockUsers} from '../../usecases/AdminUseCases/blockUsers.js'
import { deleteUser } from '../../usecases/AdminUseCases/deleteUser.js';

export const adminLogin =  (req, res) => {
    try{
        const {email, password} = req.body;
        const adminData = checkLogin(email, password);
        return res.json(adminData);
    }catch(err){
        console.log(err)
    }
}


export const loadUsers = async(req, res) =>{
    try{
        const userData = await getUsers()
        return res.json(userData)
    }catch(err){
        console.log(err);
    }
}


export const userBlock = async (req,res) =>{
    try {
        console.log("-----")
        const { id } = req.params;
        const { is_blocked } = req.body;
        const response = await blockUsers(id, is_blocked)
        // console.log("response from controller",response)
        if(!id){
            return res.status(400).json("id not found")
        }
        if (response !== undefined) {
            return res.status(200).json({message:"User status updated successfully" });
          } else {
            return res.status(404).json({ message: "User not found or other error occurred" });
          }
      } catch (error) {
        res.status(500).send('Internal server error');
      }
  }


  export const deleteuser = async (req,res) =>{
    try{
        const userId = req.params.id;
        const response = await deleteUser(userId);
        res.json(response)
    }catch(err){
        console.log(err);
        res.json({message:"Couldnt delete the user"})
    }
}
