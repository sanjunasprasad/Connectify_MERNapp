import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import  { axiosUserInstance }   from '../../services/axios/axios';
import { setUser, setToken } from "../../services/redux/slices/userSlice";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import Rightbar from "../../components/User/Rightbar/Rightbar";

function UserHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggeduser = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  // const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token fom local:",token)
    if (!token) {
      navigate("/");
    } else {
      dispatch(setToken(token));
       axiosUserInstance 
        .get("/userProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
         
          // console.log("response from back to userprofilehomepage:",response)
          //  setUser(response.data);
          dispatch(setUser(response.data));
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },[]);

  console.log("User from Redux store:", loggeduser);
  console.log("Token from Redux store:", token);

  return (
    <div>
      <div className="homesubcontainer">
        <div className="homesidebar">
          <Sidebar loggeduser={loggeduser}/>
        </div>
        <div className="homerightbar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
