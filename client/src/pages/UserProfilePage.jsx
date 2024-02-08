import React from 'react'
import Profile from "../components/User/Profile/Profile";
import "../App.css"


function UserProfilePage() {
  return (
    <div className="App">
    <div className="blur" style={{top: '-18%', right: '0'}}></div>
    <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
    <Profile />
    </div>
  )
}

export default UserProfilePage
