import User from  '../entities/userModel.js'


//user registration
export const saveUser = async (firstName, lastName, phoneNo, email, password, is_blocked, date) => {
    const user = new User({ firstName, lastName, phoneNo, email, password,is_blocked, date});
    return  user.save();
    
}

export const checkUser = async (email) => {
    const existingUserData = await User.findOne({email:email});
    console.log("from repo:",existingUserData)
    return existingUserData;
}

export const findOneUser = async (id) => {
    try{
        return await User.findById(id);
    }catch(err){
        console.log(err)
    }
}

//for admin to get all users
export const getAllUsers = async () => {
    return await User.find().lean();
  };



  