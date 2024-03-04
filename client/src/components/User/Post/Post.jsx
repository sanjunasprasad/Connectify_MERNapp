import React, { useState,useEffect } from 'react'
import { axiosUserInstance }  from "../../../services/axios/axios";
import moment from 'moment';
import "./post.css"
import Moreoptions from "../../../Icons/Moreoptions.png"
import Likeicon from "../../../Icons/Notifications.png"
import commneticon from "../../../Icons/Comment.png"
import Shareicon from "../../../Icons/SharePost.png"
// import Editicon from "../../../Icons/editing.png"
import Saveicon from "../../../Icons/Save.png"
import unlikeicon from "../../../Icons/Unlike.png"
import Modal from "react-modal";


export default function Post({item,user}) {

    // console.log("item from post compo is",item);
    // console.log("logged in user from post compo  is",user)
    const getRelativeTime = (createdAt) => {
      return moment(createdAt).fromNow();
    };
    



//fetch comment username
const [commentuser, setCommentUser] = useState([]);
useEffect(() => {
  let commentsuserId = [];
  for (let i = 0; i < item.comments.length; i++) {
    commentsuserId.push(item.comments[i].user);
  }
  // console.log("Commented people", commentsuserId);

  // Assuming item.post contains the post ID
  axiosUserInstance.get(`/post/getCommentUser/${item._id}`, {
    params: { commentsuserId: commentsuserId }
  })
  .then(response => {
    const usernames = response.data.usernames;
    setCommentUser(usernames);
    // console.log("Usernames on state update:", commentuser);
  })
  .catch(error => {
    console.error('Error fetching usernames:', error);
  });
}, []);

      

    //fetch post username
    const[postUserpic,setpostUserpic]  = useState("");
    const [postuser, setPostuser] = useState("");
    useEffect(() => {
            // console.log("post user id:",item.user);
      // console.log("type of userid from post:",typeof(item.user));
       axiosUserInstance.get(`/post/getPostuser/${item.user}`)
          .then(response => {
            // console.log("username from backend respo:", response.data.user.firstName);
            // console.log("type of username from backend respo:",typeof(response.data.user.firstName))
            setpostUserpic(response.data.user.image)
            setPostuser(response.data.user.firstName);
            // console.log("state change postusername:", postuser);
          })
          .catch(error => {
            console.error('Error fetching username:', error);
          });
      }, []);
      

   //LIKES +DISLIKES
//    const handleLike = ()=>{
//     if(Like === Likeicon){
//         SetLike(unlike)
//     }else{
//         SetLike(Likeicon)
//     }
// }
    const [Like, setLike] = useState(unlikeicon);
    const [likesCount, setLikesCount] = useState(item.likes.length);
    useEffect(() => {
      // console.log("Item likes:", item.likes);
      // console.log("User IDddd:", user._id);
    // Check if the current user has liked the post
    setLike(item.likes.some(like => like.user === user._id));
    // console.log('Like state:', item.likes.some(like => like.user === user._id));
    // console.log(`Post ID: ${item._id}, Like state: ${item.likes.some(like => like.user === user._id)}`);
    // console.log('Component re-rendered');

  },[item.likes, user._id]);
  const handleLike = async () => {
    try {
      // console.log("postid:",item._id);
      // console.log("type of postid:",typeof(item._id));
      const userid = user._id
      // console.log("user id from props",userid)
      // console.log("type of userid", typeof(userid))
      const response = await axiosUserInstance.post(`/post/likepost/${item._id}`,{userid});
      // console.log(response)
      if (response.status === 200) {
        setLike(Likeicon);
        setLikesCount(likesCount + 1);
        // console.log('Likes Count:', likesCount + 1);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
    
  const handleUnlike = async () => {
    try {
     
      // console.log("postid unlike:",item._id);
      // console.log("type of postid unlike:",typeof(item._id));
      const userid = user._id
      // console.log("user id from props unlike",userid)
      // console.log("type of userid unlike", typeof(userid))
      const response = await axiosUserInstance.post(`/post/unlikepost/${item._id}`,{userid});
      // console.log("response from unlike",response)
      if (response.status === 200) {
        setLike(unlikeicon);
        setLikesCount(likesCount - 1);
        // console.log('unLikes Count:', likesCount - 1);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };



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
        const response = await axiosUserInstance.post(`/post/commentpost/${item._id}`, {
          userId: user._id,
          comment: comment 
        });
        // console.log('Comment submitted successfully:', response.data);
        setComment('');
        setmodalIsOpen(false);
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };

    
    
    return (
        // area for profileimage+profilename on post top
        <div style={{ marginLeft: "120px" , marginTop:20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" ,marginBottom:10}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={postUserpic} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover",}} alt="" /> {/* profilepic on post top*/}
                    <p style={{marginLeft:10}}>{postuser}</p> {/* username  on post top*/}
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
                {/* bigimage left side commentsection */}
                <div style={{display:"flex"}}>
                <div style={{flex:1.3}} >
                    <img style={{width:"100%" , height:"85vh" , objectFit:"cover"}} src={item.file}  alt="" />
                </div>

                   {/* rightside commentsection */}
                <div style={{flex:1 , height:"90vh"}}>
                    <div >
                        <div style={{display:"flex" , alignItems:"center" , paddingLeft:10 , justifyContent:"space-between"}}>
                            <div style={{display:"flex" , alignItems:"center" , paddingLeft:10}}>
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                              <div style={{paddingLeft:10}}>
                                  <p style={{marginBottom:0}}>{postuser}</p> {/* post owner name on top comment section */}
                              </div>
                            </div>
                            <div>
                                <img src={Moreoptions} alt="" />
                            </div>
                        </div>

                       {/* dynamic comment display section */}
                        <div className='scrollable-div'>
                        {item.comments.map((comment, index) => (
                            <div style={{display:'flex' , marginLeft:30}}>
                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: 30, height: 30 , borderRadius: "50%", objectFit: "cover" , marginTop:35 }} alt="" />
                               <div style={{marginLeft:20}}>
                                 <p style={{  marginTop:30}}>{commentuser[index]}</p>
                                 <p style={{marginTop: 0}}>{comment.text}</p>
                                 <p style={{color:"#A8A8A8" , marginTop:-4}}>{getRelativeTime(comment.createdAt)}</p>
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
            <img src={item?.file} style={{ height: "auto", width: "100%", objectFit: "contain" }} alt="" />  {/* posted image */} 
            <div style={{display:"flex" , alignItems:"center" , justifyContent:'space-between'}}>  {/* to style icons like,comment,save,share  */}
                <div style={{display:'flex' , alignItems:"center"  , justifyContent:"space-between"}}>

                    <div  onClick={Like ? handleUnlike : handleLike}>
                      <img src={Like ? unlikeicon: Likeicon} className='logoforpost' alt="" />
                    </div>

                    <div onClick={handleShowmodal} style={{cursor:"pointer"}}>
                     <img src={commneticon} className='logoforpost' alt="" />
                    </div>
                    
                    <img src={Shareicon} className='logoforpost' alt="" />
                </div>
                <div style={{display:'flex' ,alignItems:'center'}}>
                <img src={Saveicon} alt="" />
                </div>
            </div>
            
            <p style={{display:"flex" , marginTop:"0px"}}>{likesCount} likes</p>  {/* likes count */} 
            <p style={{textAlign:'start' , }}>{item?.caption}</p> {/* caption */} 
            <div onClick={handleShowmodal} style={{cursor:"pointer"}}>
                <p style={{textAlign:"start" , color:"#A8A8A8"}}>View all comments</p> 
            </div>
            <p style={{textAlign:"start" , fontSize:"11px" , color:"#A8A8A8"}}>{getRelativeTime(item.createdAt)}</p>
        </div>
        
    )
}


