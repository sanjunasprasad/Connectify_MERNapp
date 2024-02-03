import User from "../entities/userModel.js";

// to get all users
export const getAllUsers = async () => {

  const userData = await User.find().lean();
  console.log("reached last of loaduser admin repo:",userData);
  return userData
};

// for admin to block user
// export const updateUserstatus = async (id, isBlocked) => {
//   try {
//     const userToUpdate = await User.findById(id);
//     console.log("tttt",userToUpdate)
//     if (!userToUpdate) {
//       throw new Error("User not found");
//     }

//     userToUpdate.is_blocked = isBlocked;
//    const result= await userToUpdate.save();
//    console.log("result is:",result)
//     // return userToUpdate;
//   } catch (error) {
//     throw new Error("Failed to update user status");
//   }
// };


export const updateUserstatus = async (id, isBlocked) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, 
      { $set: { is_blocked: isBlocked } }, 
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    // console.log("Updated user from repo:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user status:", error);
    throw new Error("Failed to update user status");
  }
};