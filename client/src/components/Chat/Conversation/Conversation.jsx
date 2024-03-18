import React, { useState, useEffect } from 'react'
import { axiosUserInstance } from "../../../services/axios/axios";
import "./Conversation.css"





const Conversation = ({ data, currentUserId }) => {

  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId)
    console.log("4)userid to chat in convo", userId)
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axiosUserInstance.get(`/friend/userAccount/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'role': 'user'
          }
        })
        setUserData(data)
        console.log("5)userdetails to chat profile in convo ", data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getUserData();
  }, [])


  return (
    <>
      <div className="follower conversation">
        <div>
          <div className="online-dot"></div>
          <img
            src={userData?.user?.image
              ? userData.user.image
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: '0.8rem', marginLeft: '4rem', marginTop: '-3rem' }}>
            <span>{userData?.user?.firstName} {userData?.user?.lastName}</span>
            <span >Online</span>
          </div>
        </div>
      </div>
    </>

  )
}

export default Conversation
