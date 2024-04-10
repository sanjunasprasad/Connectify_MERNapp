import React from 'react'
import {  useDispatch } from 'react-redux';
import { Link,useNavigate } from "react-router-dom";
import {clearUser} from "../../../services/redux/slices/userSlice"
import "./Chatsidebar.css"
import Homeicon from "../../../Icons/home.png";
import SearchIcon from "../../../Icons/Search.png";
import Exploreicon from "../../../Icons/Explore.png";
import Reels from "../../../Icons/Reels.png";
import Messages from "../../../Icons/Messenger.png";
import Notifications from "../../../Icons/Notifications.png";
import createicon from "../../../Icons/New post.png";
import More from "../../../Icons/Settings.png";
import InstagramIcon from "../../../Icons/Instagramlogo.png"; 


function Chatsidebar() {

  const navigate = useNavigate();
  const dispatch =useDispatch()
  const signOut = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className='chatmainsidebar'>
      <div>

      <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
      <div style={{ display: "flex", alignItems: "center", marginTop: "44px" , cursor:'pointer', marginLeft: "20px" }}>
        <img src={InstagramIcon} className="logos" alt=""/>
      </div>
      </Link>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
        <img src={Homeicon} className="logos" alt=""/>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
      <img src={SearchIcon} className="logos" alt=""/>
      </div>


      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
      <img src={Exploreicon} className="logos" alt="" /> 
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
      <img src={Reels} className="logos" alt=""/>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
      <img src={Messages} className="logos" alt="" />   
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
      <img src={Notifications}className="logos" alt="" />
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
      <img src={createicon}  className="logos"alt=""/>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}>
        <img src={"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"} alt='' className='profileicon' /> 
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "40px" , cursor:'pointer', marginLeft: "20px" }}   onClick={signOut}>
        <img src={More} alt='' className='logos' /> 
      </div>

  </div>
</div>
  )
}

export default Chatsidebar
