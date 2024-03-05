import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { axiosUserInstance } from "../../../services/axios/axios";
import { toggleLike } from "../../../services/redux/slices/postSlice"
import moment from 'moment';
import Modal from "react-modal";
import "./post.css"
import Moreoptions from "../../../Icons/Moreoptions.png"
import  Likeicon from "../../../Icons/Notifications.png"
import unlikeicon from "../../../Icons/Unlike.png"
import commneticon from "../../../Icons/Comment.png"
import Shareicon from "../../../Icons/SharePost.png"
import Saveicon from "../../../Icons/Save.png"



export default function Post({ postlist }) {

  const dispatch = useDispatch();
  const loggeduser = useSelector(state => state.user.user);
  const posts = useSelector(state => state.post.posts) || [];
  const state = useSelector(state => state); 
  // console.log("Current Redux Store State:", state.post.posts);


  const getRelativeTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  //fetch post username
  const [postUserpic, setPostUserpic] = useState("");
  const [postUser, setPostUser] = useState("");
  useEffect(() => {
    axiosUserInstance.get(`/post/getPostuser/${postlist.user}`)
      .then(response => {
        setPostUserpic(response.data.user.image)
        setPostUser(response.data.user.firstName);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  }, []);


  //like 
  const [Like, setLike] = useState(unlikeicon);
    const [likesCount, setLikesCount] = useState(postlist.likes.length);
    useEffect(() => {
      // console.log("Item likes:", item.likes);
      // console.log("User IDddd:", user._id);
    // Check if the current user has liked the post
    setLike(postlist.likes.some(like => like.user === loggeduser._id));
    console.log('Like state:', postlist.likes.some(like => like.user === loggeduser._id));
    // console.log(`Post ID: ${item._id}, Like state: ${item.likes.some(like => like.user === user._id)}`);
    // console.log('Component re-rendered');

  },[postlist.likes,loggeduser._id]);
  const handleLike = async () => {
    try {
      // console.log("postid:",item._id);
      // console.log("type of postid:",typeof(item._id));
      const userid = loggeduser._id
      // console.log("user id from props",userid)
      // console.log("type of userid", typeof(userid))
      const response = await axiosUserInstance.post(`/post/likepost/${postlist._id}`,{userid});
      // console.log(response)
      if (response.status === 200) {
        setLike(unlikeicon);
        setLikesCount(likesCount + 1);
        console.log('Likes Count:', likesCount + 1);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
    
  const handleUnlike = async () => {
    try {
     
      // console.log("postid unlike:",item._id);
      // console.log("type of postid unlike:",typeof(item._id));
      const userid = loggeduser._id
      // console.log("user id from props unlike",userid)
      // console.log("type of userid unlike", typeof(userid))
      const response = await axiosUserInstance.post(`/post/unlikepost/${postlist._id}`,{userid});
      // console.log("response from unlike",response)
      if (response.status === 200) {
        setLike(Likeicon);
        setLikesCount(likesCount - 1);
        console.log('unLikes Count:', likesCount - 1);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };






  return (
    // area for profileimage+profilename on post top
    <div style={{ marginLeft: "120px", marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={postUserpic} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", }} alt="" /> {/* profilepic on post top*/}
          <p style={{ marginLeft: 10 }}>{postUser}</p> {/* username  on post top*/}
        </div>
        <div >
          <img src={Moreoptions} alt="" />
        </div>
      </div>


      {/* modal for comments */}


      {/* area for postimage+caption+comment */}
      <img src={postlist.file} style={{ height: "auto", width: "100%", objectFit: "contain" }} alt="" />  {/* posted image */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>  {/* to style icons like,comment,save,share  */}
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

          {/* Likes */}
          <div  onClick={Like ? handleUnlike : handleLike}>
            <img src={Like ? unlikeicon: Likeicon} className='logoforpost' alt="" />
          </div>

            {/* Comment */}
          <div style={{ cursor: "pointer" }}>
            <img src={commneticon} className='logoforpost' alt="" />
          </div>

             {/* Share */}
          <img src={Shareicon} className='logoforpost' alt="" />
        </div>

                 {/* Save */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Saveicon} alt="" />
        </div>
      </div>


     <p style={{display:"flex" , marginTop:"0px"}}>{likesCount} likes</p>    {/* likes count  */}
      <p style={{ textAlign: 'start', }}>{postlist.caption}</p> {/* caption */}
      <div style={{ cursor: "pointer" }}>
        <p style={{ textAlign: "start", color: "#A8A8A8" }}>View all comments</p>
      </div>
      <p style={{ textAlign: "start", fontSize: "11px", color: "#A8A8A8" }}>{getRelativeTime(postlist.createdAt)}</p>

    </div>



  )
}


