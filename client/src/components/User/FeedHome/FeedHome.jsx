import React from 'react'
import "./FeedHome.css"
import PostSide from '../PostSide/PostSide'
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";

function FeedHome() {
  return (
    <div className="Home">

      {/* <div className="Leftside">Left</div> */}
      <LeftSide />

     
      {/* <div className="Postside">post</div> */}
      <PostSide/>

      {/* <div className="Rightside">Right</div> */}
      <RightSide/>
    </div>
  )
}

export default FeedHome
