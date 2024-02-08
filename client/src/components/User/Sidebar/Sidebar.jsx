import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'
import { UilSearch } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import { UilHeart } from '@iconscout/react-unicons'
import { UilPlusSquare } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilUserCircle } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'
import { UilHouseUser } from '@iconscout/react-unicons'

function Sidebar() {

  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("logout successfully")
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  
    Toast.fire({
      icon: "success",
      title: "Signed out successfully"
    });
  };
  

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4  id='name'>𝕔𝕠𝕟𝕟𝕖𝕔𝕥𝕚𝕗𝕪</h4>
      </div>
      <br/>
      <div className="info">
        {/* <span className="icon"> <UilHouseUser/> </span> */}
        <Link to="/feedhome" className="icon"> <UilHouseUser/>  </Link>
        <span>Home</span>
      </div>
     
      <div className="info">
        <span className="icon"> <UilSearch/> </span>
        <span>Search</span>
      </div>

      <div className="info">
        <span className="icon"> <UilUsersAlt/> </span>
        <span>Friends</span>
      </div>

      <div className="info">
        <span className="icon"> <UilMessage/> </span>
        <span>Messages</span>
      </div>


      <div className="info">
        <span className="icon"> <UilHeart/> </span>
        <span>Notifictaion</span>
      </div>


      <div className="info">
        <span className="icon"> <UilPlusSquare/> </span>
        <span>Create</span>
      </div>


    
      <div className="info">
        {/* <span className="icon"> <UilUserCircle/> </span> */}
        <Link to="/profile" className="icon"><UilUserCircle/></Link>
        <span>Profile</span>
      </div>

      <div className="info" onClick={signOut}>
        <span className="icon"> <UilSignout/> </span>
        <span>Logout</span>
      </div>
      
    </div>
  )
}

export default Sidebar
