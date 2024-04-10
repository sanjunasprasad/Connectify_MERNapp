import React, { useState, useEffect,useRef,useCallback } from 'react'
import { useSelector } from "react-redux";
import {  useNavigate} from "react-router-dom";
import { axiosUserInstance } from "../../../services/axios/axios";
import moment from 'moment';
import InputEmoji from 'react-input-emoji'
import videocall from "../../../Icons/videocall.png"
import "./ChatBox.css"

const ChatBox = ({  currentUser,currentUserName,setSendMessage,receivedMessage }) => {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();

  const chat = useSelector(state => state.chat.chats);
  const chatId = chat ? chat._id : null;
  // console.log("chat in chatbox:",chat);
  // console.log("chatid in chatbox",chatId)
  const friendId = chat?.members?.find((id) => id !== currentUser);
  console.log("loggeduserid",currentUser)
  console.log(" friend userid 88888", friendId)
 
  

  const getRelativeTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  // const handleImageChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  // }

  

  // fetching chat user name,image on  chatbox heading 
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    console.log("5)chat box friend userid", userId)
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axiosUserInstance.get(`/friend/userAccount/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'role': 'user'
          }
        })
        setUserData(data);
        // console.log(" 9)chatbox userdata response", data)
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null)
      getUserData();
  }, [chat, currentUser]);


  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axiosUserInstance.get(`/messages/${chat._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'role': 'user'
          }
        })
        setMessages(data);
        // console.log("8)backend response chatbox messages ", data)
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);


  //send message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
      // image: selectedImage
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  try {
    const { data } = await axiosUserInstance.post("/messages",message);
    setMessages([...messages, data]);
    setNewMessage("");
    // setSelectedImage(null);
  }catch{
    console.log("error")
  }
}

// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }
},[receivedMessage])


  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])


  const handleVideocall = useCallback(() =>{
    navigate(`/meeting/${currentUser}/${friendId}`);
  
  })




  return (
      <div className='ChatBox-container'>
        {chat ? (
          <>
              {/* chat-header */}
            <div className='chat-header'>
              <div >
                <div>
                  <img
                    src={userData?.user?.image
                      ? userData.user.image
                      : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                    alt=""
                    className="followerImage"
                    style={{ width: "45px", height: "45px", marginTop: '2rem', marginLeft: '4rem' }}
                  />
                  <div  style={{ fontSize: '0.8rem', marginLeft: '8rem', marginTop: '-2rem' }}>
                    <span>{userData?.user?.firstName} {userData?.user?.lastName}</span>
                    <img src={videocall} className='videocall' alt="" onClick={handleVideocall} />
                   
                  </div>
                </div>
              </div>
              {/* < hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px", }} /> */}
              </div>

              {/* chat messages */}
              <div className="chat-body" >
                {messages.map((message,index) => (
                  <>
                    <div key={index} ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                       {/* {message.image && <img src={message.image} alt="Sent" style={{ maxWidth: '200px', maxHeight: '200px' }} />} */}
                      <span>{message.text}</span>{" "}
                      <span>{getRelativeTime(message.createdAt)}</span>
                    </div>
                  </>
                ))}
              </div>


              {/* chat-sender */}
              <div className="chat-sender">
               
                <div onClick={() => imageRef.current.click()}>+</div>
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                />
                <div className="send-button button" onClick = {handleSend}>Send</div>
                <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
                // onChange={handleImageChange}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
  
  )
}

export default ChatBox
