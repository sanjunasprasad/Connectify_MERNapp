import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./FeedHome.css";
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'
import connectify from "./img/connectify.png";
import post1 from "./img/post1.jpg";
import post2 from "./img/post2.jpg";
import profile4 from "./img/profile4.jpg";
import profile5 from "./img/profile5.jpg";
import profile6 from "./img/profile6.jpg";
import profile7 from "./img/profile7.jpg";
import profile10 from "./img/profile10.jpg";

const FeedHome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const signOut = () => {
    
    localStorage.removeItem("token");
  
    navigate("/");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Logged out successfully"
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("usertoken",token)
    if(!token){
      navigate("/")
    }
    else if (token) {
      console.log("222222, usertoken",token)
      fetchUserData(token);
      navigate("/feedhome"); //change to userprofile
    } 
  }, [navigate]);


  // to fetch user data
  const fetchUserData = (token) => {
    fetch("/userProfile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the username is present in the response data
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  
  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar">
        <a href="#" className="logo">
          <img src={connectify} alt="logo" />
          <h1 className="name">Connectify</h1>
        </a>

        {/* Menu */}
        <div className="menu">
          <a href="#">
            <span className="icon">
              <i className="ri-user-4-line"></i>
            </span>
            Profile
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-function-line"></i>
            </span>
            Feed
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-notification-4-line"></i>
            </span>
            Notification
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-search-line"></i>
            </span>
            Explore
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-mail-unread-fill"></i>
            </span>
            Message
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-send-plane-fill"></i>
            </span>
            Direct
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-bar-chart-2-fill"></i>
            </span>
            Stats
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-settings-4-line"></i>
            </span>
            Settings
          </a>

          <a href="#" onClick={signOut}>
            <span className="icon">
              <i className="ri-logout-box-r-line"></i>
            </span>
            Logout
          </a>

        </div>
      </div>
      
      <div className="main-home">
        <div className="header"></div>
        <div className="stories-title">
          <a href="#" className="btn">
            <i className="ri-play-circle-line"></i>
            <div className="text">watch all</div>
          </a>
        </div>
        <div className="stories">
          {/* stories 1 */}
          <div className="stories-img color">
            <img src={profile4} alt="profile" />
            <div className="add">+</div>
          </div>
          {/* stories 2 */}
          <div className="stories-img">
            <img src={profile5} alt="profile" />
          </div>
          {/* stories 3 */}
          <div className="stories-img">
            <img src={profile6} alt="profile" />
          </div>
          {/* stories 4 */}
          <div className="stories-img">
            <img src={profile7} alt="profile" />
          </div>
          {/* stories 5 */}
          <div className="stories-img">
            <img src={profile10} alt="profile" />
          </div>
          {/* stories 6 */}
          <div className="stories-img">
            <img src={profile6} alt="profile" />
          </div>
          {/* stories 7 */}
          <div className="stories-img">
            <img src={profile5} alt="profile" />
          </div>
          {/* stories 8 */}
          <div className="stories-img">
            <img src={profile7} alt="profile" />
          </div>
          {/* stories 9 */}
          <div className="stories-img">
            <img src={profile10} alt="profile" />
          </div>
          {/* stories 10 */}
          <div className="stories-img">
            <img src={profile6} alt="profile" />
          </div>
        </div>
        <div className="feed">
          <div className="feed-text"></div>
        </div>
        <div className="main-post">
          {/* Box1 */}
          <div className="post-box">
            <img src={post1} alt="post" />
            <div className="post-info">
              <div className="post-profile">
                <div className="post-img">
                  <img src={profile4} alt="profile" />
                </div>
                <h3>Anju B</h3>
              </div>
              <div className="likes">
                <i className="ri-heart-line"></i>
                <span>84.4k</span>
                <i className="ri-chat-3-line"></i>
                <span>88</span>
              </div>
            </div>
          </div>
          {/* Box2 */}
          <div className="post-box">
            <img src={post2} alt="post" />
            <div className="post-info">
              <div className="post-profile">
                <div className="post-img">
                  <img src="./img/profile6.jpg" alt="profile" />
                </div>
                <h3>Arun B</h3>
              </div>
              <div className="likes">
                <i className="ri-heart-line"></i>
                <span>74.4k</span>
                <i className="ri-chat-3-line"></i>
                <span>65</span>
              </div>
            </div>
          </div>
          {/* Box3 */}
          <div className="post-box">
            <img src={profile6} alt="post" />
            <div className="post-info">
              <div className="post-profile">
                <div className="post-img">
                  <img src={profile4} alt="profile" />
                </div>
                <h3>marquee B</h3>
              </div>
              <div className="likes">
                <i className="ri-heart-line"></i>
                <span>82.4k</span>
                <i className="ri-chat-3-line"></i>
                <span>77</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedHome;
