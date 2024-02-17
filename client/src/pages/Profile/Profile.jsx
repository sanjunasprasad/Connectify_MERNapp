import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios/axios";
import "./profile.css";
import ProductTwo from "../../components/User/testpost/ProductTwo";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import SettingIcon from "../../Icons/Settingslogo.png";

export default function Profile() {


  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      axiosInstance
        .get("/userProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.firstName);
          setFormData(response.data);
          // console.log("response from back to userprofilehomepage:",response.data);
          setUserId(response.data._id)
          // console.log("User IDddd:",response.data._id );
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [image, setImage] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
};
const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setFormData({ ...formData, image: image });
}


//after edit submit post
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("User ID for test:", userId);
      const response = await axiosInstance.put(`/updateUser/${userId}`, formData);
      if (response.status === 200) {
        console.log("User profile updated successfully:", response.data);
      }
  } catch (err) {
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
                  src="https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg="
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
                  <p style={{ marginLeft: 100, fontWeight: 1000 }}>{user}</p>
                  <button
                    style={{
                      paddingLeft: 10,
                      marginLeft: 20,
                      paddingRight: 20,
                      paddingTop: 8,
                      paddingBottom: 8,
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handleShowModal}
                  >
                    Edit profile
                  </button>
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
                              name="image"
                              id="fileInput"
                              onChange={handleImageChange}
                              style={{ color: "white" }}
                            />
                          </div>
                          <div  >
                          Selected File: {formData?.image ? <img src={`http://localhost:5000/${formData?.image}`} alt={formData?.image} style={{ color: "white" }} /> : 'No file selected'}
                          </div>
                          

                          <button type="submit">Update</button>
                        </form>
                      </div>
                    </div>
                  )}
                

                  <img
                    src={SettingIcon}
                    style={{ marginLeft: 20, cursor: "pointer" }}
                    alt=""
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginLeft: 100 }}>1 Post</p>
                  <p style={{ marginLeft: 40 }}>200k Followers</p>
                  <p style={{ marginLeft: 40 }}>10k Following</p>
                </div>
                <div style={{ alignItems: "center" }}>
                <p style={{ marginLeft: 100, marginTop: 8 }}>{formData.email}</p>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{formData.bio}</p>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{formData.location}</p>
                
                </div>
              </div>
            </div>

            {/* <div className='postContainerForProfile'>
                {PostExplore.map((item)=>(
                  <Explorepost item={item}/>
                ))}
              </div> */}

            <div className="postContainerForProfile">
              <ProductTwo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
