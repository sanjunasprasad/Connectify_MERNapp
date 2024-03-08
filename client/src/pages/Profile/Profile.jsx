import React, {  useState,useEffect } from "react";
import { useSelector ,useDispatch} from 'react-redux';
import { setUser } from "../../services/redux/slices/userSlice";
import { axiosUserInstance }  from "../../services/axios/axios";
import "./profile.css";
import ProductTwo from "../../components/User/testpost/ProductTwo";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import SettingIcon from "../../Icons/Settingslogo.png";
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'


export default function Profile() {

  const nameRegex = /^[A-Za-z]+$/;
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.user.user);
  // console.log("userdata from Redux store profile:", loggedUser);

  useEffect(() => {
    setFormData(loggedUser);
  }, [loggedUser]);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({})
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
    setErrors({ ...errors, [name]: "" }); 
};

const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setFormData({ ...formData, image: image });
}


const validateForm = (data) => {
  const errors = {};
  if (!data.firstName) {
    errors.firstName = "First Name cannot be empty";
  } else if (!nameRegex.test(data.firstName)) {
    errors.firstName = "First Name must only contain alphabets";
  }

  if (!data.email) {
    errors.email = "Please provide an email";
  }

  if (!data.bio) {
    errors.bio = "bio";
  } else if (data.bio.length < 8) {
    errors.bio = "Bio must have min 8 max 50 characters";
  }

  if (!data.location) {
    errors.location = "Please provide a valid location";
  }

  if (!data.file) {
    errors.file = "Please provide a image of type jpg/jpeg";
  }
  return errors;
};

//after edit submit post
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    const bio = document.querySelector('textarea[name="bio"]').value;
    const firstName = document.querySelector('input[name="firstName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const location = document.querySelector('input[name="location"]').value;
    const fileInput = document.querySelector('input[name="file"]');
    const file = fileInput.files[0];

    formData.append('firstName', firstName);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('location', location);
    formData.append('file', file); // Append the file directly, without changing the field name

    console.log("User ID for test:", loggedUser._id);
    console.log("Form data details:");
    console.log("Bio:", bio);
    console.log("First Name:", firstName);
    console.log("Email:", email);
    console.log("Location:", location);
    console.log("File Name:", file.name);
    console.log("File Type:", file.type);
    console.log("File Size:", file.size);

 
    const response = await axiosUserInstance.put(`/updateUser/${loggedUser._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    });

    if (response.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500
      });
      console.log("User profile updated successfully:", response.data);
      dispatch(setUser(response.data));
    }
  
}catch (err) {
    console.log(err);
  }
}

  return (
    <div>
      <div>
        <div className="homesubcontainer">
          <div className="homesidebar">
            <Sidebar />
          </div>

          {/* rightside accountprofile */}
          <div className="Profilerightbar">
            <div className="subProfilerightbar">
              <div>
                <img
                  src={loggedUser.image}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginLeft: 100, fontWeight: 1000 }}>{loggedUser.firstName}</p>
                  <button style={{width:108,height:30,paddingLeft: 10,marginLeft: 20,paddingRight: 20,paddingTop: 4,paddingBottom: 8,borderRadius: 10,border: "none",cursor: "pointer",backgroundColor: "rgb(236, 233 ,233)",color:"black"}}>Following</button>
                  <button style={{width:108,height:30,paddingLeft: 10,marginLeft: 20,paddingRight: 20,paddingTop: 4,paddingBottom: 8,borderRadius: 10,border: "none",cursor: "pointer",backgroundColor: "rgb(236, 233 ,233)",color:"black"}}>Message</button>
                  <img src={SettingIcon} style={{ marginLeft: 20, cursor: "pointer" }} alt="" onClick={handleShowModal}/>
                 {showModal && (
                    <div className="modal-overlay">
                      <div className="modal">
                        <span className="close" onClick={handleCloseModal}>
                          &times;
                        </span>
                        <h2>Edit Profile</h2>

                        <form onSubmit={handleSubmit}>
                          {/* Form fields */}
                          <div className="inputfields">
                            <label
                              htmlFor="username"
                              style={{ color: "white" }}
                            >
                              Username:
                            </label>
                            <input
                              type="text"
                              placeholder="Name"
                              value={formData?.firstName}
                              name="firstName"
                              onChange={handleInputChange}
                            />
                            {errors.firstName && (
              <p className="error-message text-red-500">{errors.firstName}</p>
            )}
                          </div>
                          <div className="inputfields">
                            <label htmlFor="email" style={{ color: "white" }}>
                              Email:
                            </label>
                            <input
                              type="email"
                              placeholder="Email"
                              value={formData?.email}
                              name="email"
                              onChange={handleInputChange}
                              
                            />
                            {errors.email && (
              <p className="error-message text-red-500">{errors.email}</p>
            )}
                          </div>
                          <div className="inputfields">
                            <label htmlFor="bio" style={{ color: "white" }}>
                              Description bio:
                            </label>
                            <textarea
                              type="text"
                              placeholder="User bio"
                              value={formData?.bio}
                              name="bio"
                              onChange={handleInputChange}
                            ></textarea>
                            {errors.bio && (
              <p className="error-message text-red-500">{errors.bio}</p>
            )}
                          </div>
                          <div className="inputfields">
                            <label
                              htmlFor="location"
                              style={{ color: "white" }}
                            >
                              Location:
                            </label>
                            <input 
                            type="text" 
                            placeholder="Location" 
                            value={formData?.location}
                            name="location"
                            onChange={handleInputChange}
                            />
                            {errors.location && (
              <p className="error-message text-red-500">{errors.location}</p>
            )}
                          </div>
                          <div className="inputfields">
                            <label
                              htmlFor="fileInput"
                              style={{ color: "white" }}
                            >
                             {image ? "Choose another pic" : "Select a profile Photo"}
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              name="file"
                              id="fileInput"
                              onChange={handleImageChange}
                              style={{ color: "white" }}
                            />
                          </div>
                          <div  >
                          Selected File: {formData?.image ? <img src={`http://localhost:5000/${formData?.image}`} alt={formData?.image} style={{ color: "white" }} /> : 'No file selected'}
                          {errors.file && (
              <p className="error-message text-red-500">{errors.file}</p>
            )}
                          </div>
                          <button type="submit">Update</button>
                        </form>
                      </div>
                    </div>
                  )}
                
                 
                </div>
                <div style={{ display: "flex", alignItems: "center" ,paddingTop:10}}>
                  <p style={{ marginLeft: 100 ,paddingTop:6}}>1 Post</p>
                  <p style={{ marginLeft: 40 }}>200k Followers</p>
                  <p style={{ marginLeft: 40 }}>100k Following</p>
                </div>
                <div style={{ alignItems: "center" }}>
                <p style={{ marginLeft: 100, marginTop: 8 }}>{loggedUser.email}</p>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{loggedUser.bio}</p>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{loggedUser.location}</p>
                
                </div>
              </div>
            </div>


            <div className="postContainerForProfile">
              <ProductTwo loggedUser={loggedUser}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
