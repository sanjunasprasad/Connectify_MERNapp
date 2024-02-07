import React from 'react'
// import "../App.css"
import "./UserHomePage.css"
import FeedHome from "../components/User/FeedHome/FeedHome";
function UserHomePage() {
  return (
    <div className="App">
    <div className="blur" style={{top: '-18%', right: '0'}}></div>
    <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
    <FeedHome />
    </div>
  )
}

export default UserHomePage

