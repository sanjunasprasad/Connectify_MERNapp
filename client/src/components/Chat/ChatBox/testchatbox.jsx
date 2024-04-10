import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { axiosUserInstance } from "../../../services/axios/axios";
import moment from 'moment';
import InputEmoji from 'react-input-emoji'
import videocall from "../../../Icons/videocall.png"
import "./ChatBox.css"

const ChatBox = ({ currentUser, setSendMessage, receivedMessage }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [imagePreview, setImagePreview] = useState(null);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();



  //VIDEOCALL
  const chat = useSelector(state => state.chat.chats);
  const chatId = chat ? chat._id : null;
  // console.log("chat in chatbox:",chat);
  // console.log("chatid in chatbox",chatId)
  const friendId = chat?.members?.find((id) => id !== currentUser);
  console.log("loggeduserid", currentUser)
  console.log(" friend userid 88888", friendId)
  const getRelativeTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // Store selected image file in state
    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store data URL of the image preview in state
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


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
  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      image: selectedImage // Include the selected image in the message
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId }) // send message to socket server
    try {
      const { data } = await axiosUserInstance.post("/messages", message);
      setMessages([...messages, data]);
      setNewMessage("");
      setSelectedImage(null); // Reset selected image after sending
    } catch {
      console.log("error")
    }
  }

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage])


  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])


  const handleVideocall = useCallback(() => {
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
                <div style={{ fontSize: '0.8rem', marginLeft: '8rem', marginTop: '-2rem' }}>
                  <span>{userData?.user?.firstName} {userData?.user?.lastName}</span>
                  <img src={videocall} className='videocall' alt="" onClick={handleVideocall} />
                </div>
              </div>
            </div>
          </div>

          {/* chat messages */}
          <div className="chat-body" >
            {messages.map((message, index) => (
              <>
                <div key={index} ref={scroll}
                  className={
                    message.senderId === currentUser
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span>{getRelativeTime(message.createdAt)}</span>
                </div>
              </>
            ))}

            {/* {vcallLink && <a href={vcallLink} target="_blank">Video Call Link</a>} */}
          </div>


          {/* chat-sender */}
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>


            <InputEmoji
              value={newMessage}
              onChange={handleChange}
            />
           
            <div className="send-button button" onClick={handleSend}>Send</div>
            <input
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
              ref={imageRef}
              onChange={handleImageSelect}
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
