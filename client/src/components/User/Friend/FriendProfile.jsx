import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { useSelector} from 'react-redux';
import "./FriendProfile.css";
import { axiosUserInstance } from "../../../services/axios/axios";
import FriendPost from "../testpost/FriendPost";
import Sidebar from "../Sidebar/Sidebar"


 function FriendProfile() {

const loggeduser = useSelector(state => state.user.user);
const { _id } = loggeduser;
console.log("Logged user ID:", _id);
const {userid} = useParams()
console.log("friend userid",userid)
const [userName,SetName] = useState("")
const [userMail,SetMail]=useState("")
const [userBio,SetBio] =useState("")
const  [userPlace,SetPlace] =useState("")
const [userImage,SetImage] =useState("")
const [postLength,SetLength] =useState(0)
const [posts,SetPosts] = useState([])
useEffect(() => {
    axiosUserInstance.get(`/friend/userAccount/${userid}`)
      .then(response => {
        // console.log("response from backend",response)
        SetName(response.data.user.firstName);
        SetMail(response.data.user.email)
        SetBio(response.data.user.bio)
        SetPlace(response.data.user.location)
        SetImage(response.data.user.image)
        SetLength(response.data.posts.length)
        SetPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  }, []);


  //FOLLOW + UNFOLLOW
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = async () => {
    try {
      await axiosUserInstance.post(`/friend/follow/${userid}`,{ loggeduser: _id });
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axiosUserInstance.post(`/friend/unfollow/${userid}`,{loggeduser:_id});
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div>
      <div>
        <div className="homesubcontainer">
          <div className="homesidebar">
            <Sidebar />
          </div>

          {/* rightside accountprofile */}
          <div className="Profilerightbar">
            <div className="subProfilerightbar">
              <div>
                <img
                  src={userImage}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginLeft: 100, fontWeight: 1000 }}>{userName}</p>
                  { isFollowing ? (
                  <button style={{width:108,height:30,paddingLeft: 10,marginLeft: 20,paddingRight: 20,paddingTop: 4,paddingBottom: 8,borderRadius: 10,border: "none",cursor: "pointer",backgroundColor: "rgb(236, 233 ,233)",color:"black"}} onClick={handleUnfollow}>Unfollow</button>
                  ): (
                    <button style={{width:108,height:30,paddingLeft: 10,marginLeft: 20,paddingRight: 20,paddingTop: 4,paddingBottom: 8,borderRadius: 10,border: "none",cursor: "pointer",backgroundColor: "rgb(236, 233 ,233)",color:"black"}} onClick={handleFollow}>Follow</button>
                  )

                  }

                  <button style={{width:108,height:30,paddingLeft: 10,marginLeft: 20,paddingRight: 20,paddingTop: 4,paddingBottom: 8,borderRadius: 10,border: "none",cursor: "pointer",backgroundColor: "rgb(236, 233 ,233)",color:"black"}}>Message</button>

                
                 
                </div>
                <div style={{ display: "flex", alignItems: "center" ,paddingTop:10}}>
                  <p style={{ marginLeft: 100 ,paddingTop:6}}>{postLength} Post</p>
                  <p style={{ marginLeft: 40 }}>200k Followers</p>
                  <p style={{ marginLeft: 40 }}>100k Following</p>
                </div>
                <div style={{ alignItems: "center" }}>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{userMail}</p>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{userBio}</p>
                  <p style={{ marginLeft: 100, marginTop: 8 }}>{userPlace}</p>
                </div>
              </div>
            </div>


            <div className="postContainerForProfile">
        {posts.map((post, index) => (
          <FriendPost key={index} post={post} />
        ))}
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FriendProfile