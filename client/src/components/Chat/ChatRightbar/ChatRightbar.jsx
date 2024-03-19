import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./ChatRightbar.css"
import { axiosUserInstance } from "../../../services/axios/axios";
import Conversation from "../../../components/Chat/Conversation/Conversation"
import ChatBox from "../../../components/Chat/ChatBox/ChatBox"
import Saveicon from "../../../Icons/Save.png"


function ChatRightbar() {

  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const user = useSelector(state => state.user.user);
  // console.log("loged user is",user)
  const { _id, } = user
  console.log("1)loggeduser id in chatrightbar:", _id)


  //get chats 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (_id) {
      const getChats = async () => {
        try {
          const { data } = await axiosUserInstance.get(`/chat/${_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'role': 'user'
            }
          })
          console.log("2)response chat in rightbar", data)
          setChats(data);
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }
  }, [user._id]);




  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log("online users is", onlineUsers)
    });
  }, [user]);


  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);




  //recived message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }
    );
  }, []);


  //check online status
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };



  return (
    <div className='mainchatrightbar'>

      {/* leftside  */}
      <div className="Left-side-chat">
        {/* <div className="Chat-container"> */}
        <h1 style={{ marginLeft: '95px', fontWeight: 'bold', marginTop: '42px', fontSize: '20px' }}>Messages</h1>
        <div className="Chat-list">
          {chats.map((chat) => (
            <div onClick={() => { setCurrentChat(chat) }}>
              <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>



      <div className="vertical-line"></div>




      {/* rightside */}
      <div className="Right-side-chat">

        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  )
}

export default ChatRightbar
