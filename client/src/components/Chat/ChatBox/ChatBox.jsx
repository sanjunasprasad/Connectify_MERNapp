import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosUserInstance } from "../../../services/axios/axios";
import moment from 'moment';
import InputEmoji from 'react-input-emoji'
import videocall from "../../../Icons/videocall.png"
import closeicon from "../../../Icons/close.png"
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
  // console.log("loggeduserid", currentUser)
  // console.log(" friend userid 88888", friendId)
  const getRelativeTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }


  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // Store selected image file in state
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
    // console.log("5)chat box friend userid", userId)
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
        console.log("8)backend response all chatbox messages ", data)
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);






  //send from loggeduser to friend
  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('senderId', currentUser);
    formData.append('text', newMessage);
    formData.append('chatId', chat._id);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ senderId: currentUser, text: newMessage, image: selectedImage, receiverId });
    try {
      const response = await axiosUserInstance.post("/messages", formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Important for handling FormData on the backend
        }
      });
      // Reset states after successful message sending
      setMessages([...messages, response.data]);
      setNewMessage("");
      setSelectedImage(null);
      setImagePreview(null); 
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };


  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived chatbox of reciver on chat of sended user: ", receivedMessage)
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
                  {message.image && (
                    <img 
                    src={`http://localhost:8000/${message.image}`}   
                    style={{ maxHeight: '150px' }} alt="Message Image" />
                  )}
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
            <div className="input-with-image-preview">
              {imagePreview && (
                <>
                  <img src={imagePreview} alt="Selected" className="selected-image-preview" />
                  <img src={closeicon} alt="Close" className="close-icon" onClick={() => setImagePreview(null)} />
                </>
              )}
            </div>

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
