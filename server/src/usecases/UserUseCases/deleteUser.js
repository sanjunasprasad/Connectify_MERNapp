import { deleteOneUser } from "../../repositories/userRepository.js"

export const deleteUser = async(id) =>{
    const response = await deleteOneUser(id)
    return response;
}