import bcrypt from 'bcrypt';
import { saveUser } from "../../repositories/userRepository.js";
import { formatDate } from "../../services/moment.js";

export const registerUser = async (
  firstName,
  lastName,
  phoneNo,
  email,
  password,
  is_blocked,
  image,
  bio,
  location,
  status

) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const date = await formatDate(Date.now());
    return await saveUser( 
      firstName,
      lastName,
      phoneNo,
      email,
      hashedPassword,
      is_blocked,
      image,
      bio,
      location,
      status,
       date
    );
  } catch (err) {
    console.error("START_USECASE++++++:", err);
    console.log("END+++++++++++")
  }
};
