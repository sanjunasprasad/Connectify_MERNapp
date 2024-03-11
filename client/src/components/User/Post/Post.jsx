import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosUserInstance } from "../../../services/axios/axios";
import { addComment } from "../../../services/redux/slices/postSlice"
import moment from 'moment';
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./post.css"
import Moreoptions from "../../../Icons/Moreoptions.png"
import  greyicon from "../../../Icons/Notifications.png" 
import  redicon from "../../../Icons/Unlike.png" 
import commneticon from "../../../Icons/Comment.png"
import Shareicon from "../../../Icons/SharePost.png"
import Saveicon from "../../../Icons/Save.png"



export default function Post({ postlist }) {

  const dispatch = useDispatch();
  const { user} = postlist; 
  const loggeduser = useSelector(state => state.user.user);
  

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




  // comment section+comment modal
  const [modalIsOpen ,setmodalIsOpen] = useState(false);
  const handleShowmodal = ()=>{
      setmodalIsOpen(true)
  }
  const [comment, setComment] = useState('');
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handlecomment=async ()=>{
    try {
      const response = await axiosUserInstance.post(`/post/commentpost/${postlist._id}`, {
        userId: loggeduser._id,
        comment: comment 
      });
      console.log('response for comment posting:', response.data);
      setComment('');
      setmodalIsOpen(false);
      dispatch(addComment(response.data));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Comment added successfully",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  //fetch comment username
const [commentuser, setCommentUser] = useState([]);
const [commentUserPic,SetcommentUserPic] =useState([])
useEffect(() => {
  let commentsuserId = [];
  let commentId = []
  for (let i = 0; i < postlist.comments.length; i++) {
    commentsuserId.push(postlist.comments[i].user);
    commentId .push(postlist.comments[i]._id);
     
  }
  // console.log("comment id",commentId)
  // console.log(("commented people....",commentsuserId))
  axiosUserInstance.get(`/post/getCommentUser/${postlist._id}`, {
    params: { commentsuserId: commentsuserId ,commentId: commentId}
  })
  .then(response => {
    // console.log("response in commnenttttt:", response.data.userDetails);
    const userpic = response.data.userDetails.map(user => user.userImage);
    const usernames = response.data.userDetails.map(user => user.firstName);
    setCommentUser(usernames);
    SetcommentUserPic(userpic)
  })
  .catch(error => {
    console.error('Error fetching usernames:', error);
  });
}, []);

// useEffect(() => {
//   console.log("state user name", commentuser);
//   console.log("state user pic", commentUserPic);
// }, [commentuser, commentUserPic]);

 

  
  return (
    // area for profileimage+profilename on post top
    <div style={{ marginLeft: "120px", marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={postUserpic} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", }} alt="" /> {/* profilepic on post top*/}
          <p style={{ marginLeft: 10 }}>  {/* username  on post top*/}
            { loggeduser && loggeduser._id === user ? (<Link to={`/username`} >{postUser}</Link>) : (<Link to={`/username/${postlist.user}`} >{postUser}</Link> )}
           </p>
        </div>
        <div >
          <img src={Moreoptions} alt="" />
        </div>
      </div>


      {/* modal for comments */}
      <Modal
             style={{overlay:{backgroundColor:"#2e2b2bc7"}}}
             isOpen = {modalIsOpen}
             onRequestClose={()=>setmodalIsOpen(false)}
             className={"modalclassNameforAPost"}
             >
                {/* bigimage left side + commentsection */}
                <div style={{display:"flex"}}>
                <div style={{flex:1.3}} >
                    <img style={{width:"100%" , height:"85vh" , objectFit:"cover"}} src={postlist.file}  alt="" />
                </div>

                   {/* rightside commentsection */}
                <div style={{flex:1 , height:"90vh"}}>
                    <div >
                        <div style={{display:"flex" , alignItems:"center" , paddingLeft:10 , justifyContent:"space-between"}}>
                            <div style={{display:"flex" , alignItems:"center" , paddingLeft:10}}>
                              <img src={postUserpic} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                              <div style={{paddingLeft:10}}>
                                  <p style={{marginBottom:0}}>{postUser}</p> {/* post owner name on top comment section */}
                              </div>
                            </div>
                            <div>
                                <img src={Moreoptions} alt="" />
                            </div>
                        </div>

                       {/* dynamic comment display section */}
                        <div className='scrollable-div'>
                              {postlist.comments.map((comment, index) => (
                                <div key={index} style={{ display: 'flex', marginLeft: 30 }}>
                                  <img src={commentUserPic[index]}  style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', marginTop: 35 }} alt="User" />
                                  <div style={{ marginLeft: 20 }}>
                                    <p style={{ marginTop: 30 }}>{commentuser[index]}</p>
                                    <p style={{ marginTop: 0 }}>{comment.text}</p>
                                    <p style={{ color: '#A8A8A8', marginTop: -4 }}>{getRelativeTime(comment.createdAt)}</p>
                                  </div>
                                </div>
                              ))}
                        </div>
                    </div>


                    <div style={{display:'flex' , justifyContent:"space-between" , marginLeft:30 , alignContent:'center'}}>
                        <div style={{flex:4 , marginLeft:10}}>
                            <textarea type="text"  value={comment}style={{width:"100%" , backgroundColor:"black" , border:"none" , color:"white"}} onChange={handleCommentChange} placeholder='Add a comment'/>
                        </div>
                        <div style={{flex:0.3 , marginTop:6 , marginLeft:10}}  >
                           <p style={{cursor:'pointer' , color:"#0095F6" , fontWeight:600}} onClick={handlecomment}>Post</p>  
                        </div>
                    </div>
                </div>
              </div>
      </Modal>


      {/* area for postimage+caption+comment */}
      <img src={postlist.file} style={{ height: "auto", width: "100%", objectFit: "contain" }} alt="" />  {/* posted image */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>  {/* to style icons like,comment,save,share  */}
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

          {/* Likes  */}
         

            {/* Comment */}
          <div  onClick={handleShowmodal}style={{ cursor: "pointer" }}>
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


     <p style={{display:"flex" , marginTop:"0px"}}> likes</p>    {/* likes count  */}
      <p style={{ textAlign: 'start', }}>{postlist.caption}</p> {/* caption */}
      <div style={{ cursor: "pointer" }}onClick={handleShowmodal}>
        <p style={{ textAlign: "start", color: "#A8A8A8" }}>View all comments</p>
      </div>
      <p style={{ textAlign: "start", fontSize: "11px", color: "#A8A8A8" }}>{getRelativeTime(postlist.createdAt)}</p>

    </div>



  )
}


