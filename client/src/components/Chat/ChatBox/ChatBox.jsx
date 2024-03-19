import React, { useState, useEffect,useRef } from 'react'
import { axiosUserInstance } from "../../../services/axios/axios";
import moment from 'moment';
import InputEmoji from 'react-input-emoji'
import "./ChatBox.css"

const ChatBox = ({ chat, currentUser,setSendMessage,receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const imageRef = useRef();
  // console.log(" 6)chat props is:", chat)
  // const { _id } = chat
  // console.log("7)chat id is",chat._id)

  const getRelativeTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  
  // fetching data on  heading name
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    // console.log("5)chat box userid", userId)

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
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await axiosUserInstance.post("/messages",message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
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
                  </div>
                </div>
              </div>
              < hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px", }} />

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
