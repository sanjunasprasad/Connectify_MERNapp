import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axiosInstance from '../../services/axios/axios';
import Sidebar from "../../components/User/Sidebar/Sidebar";
import Rightbar from "../../components/User/Rightbar/Rightbar";

function UserHomePage() {
  const [user, setUser] = useState("");
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
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },[]);


  return (
    <div>
      <div className="homesubcontainer">
        <div className="homesidebar">
          <Sidebar user={user}/>
        </div>
        <div className="homerightbar">
          <Rightbar user={user}/>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
