import React from "react";
import "./Profile.css";
import LeftSide from "../LeftSide/LeftSide";
import ProfileCard from "../ProfileCard/ProfileCard";
import Posts from "../Posts/Posts";
import RightSide from "../RightSide/RightSide";

function Profile() {
  return (
    <div className="Profile">
      <LeftSide />
      <div className="Profile-center">
        <ProfileCard />
        <Posts />
      </div>
      <RightSide/>
  
    </div>
  );
}

export default Profile;
