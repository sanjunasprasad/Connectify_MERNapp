import React from 'react'
import "./Sidebar.css"
import { UilSearch } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
import { UilHeart } from '@iconscout/react-unicons'
import { UilPlusSquare } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilUserCircle } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'
import { UilHouseUser } from '@iconscout/react-unicons'

function Sidebar() {
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4  id='name'>𝕔𝕠𝕟𝕟𝕖𝕔𝕥𝕚𝕗𝕪</h4>
      </div>
      <br/>
      <div className="info">
        <span className="icon"> <UilHouseUser/> </span>
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
        <span className="icon"> <UilUserCircle/> </span>
        <span>Profile</span>
      </div>

      <div className="info">
        <span className="icon"> <UilSignout/> </span>
        <span>Logout</span>
      </div>
      
    </div>
  )
}

export default Sidebar
