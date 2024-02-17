import User from  '../entities/userModel.js'


//user registration
export const saveUser = async (firstName, lastName, phoneNo, email, password, is_blocked, date) => {
    const user = new User({ firstName, lastName, phoneNo, email, password,is_blocked, date});
    return  user.save();
    
}

//from login to verify token
export const checkUser = async (email) => {
    const existingUserData = await User.findOne({email:email});
    // console.log("from repo:",existingUserData)
    return existingUserData;
}


//after login userhomepage
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



  //from user+admin  to edit
  export const updateUser = async (id, userData, image) => {
    try {
      const { firstName, lastName, phoneNo, email, password, bio, location } = userData;
      const updateData = { firstName, lastName, phoneNo, email, password, bio, location };
      if (image) {
        updateData.image = image;
      }
      return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error for handling in the usecase layer
    }
  };
  