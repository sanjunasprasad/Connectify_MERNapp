import React, { useState,useEffect } from 'react'
import axiosInstance from "../../../services/axios/axios";
import "./post.css"
import Moreoptions from "../../../Icons/Moreoptions.png"
import Likeicon from "../../../Icons/Notifications.png"
import commneticon from "../../../Icons/Comment.png"
import Shareicon from "../../../Icons/SharePost.png"
import Saveicon from "../../../Icons/Save.png"
import unlikeicon from "../../../Icons/Unlike.png"
import Emoji from "../../../Icons/Emoji.png"
import Modal from "react-modal";


export default function Post({item,user}) {
    // console.log("item from post compo is",item);
    // console.log("user from post compo  is",user)
   


    //fetch post username
    const [postuser, setPostuser] = useState("");
    useEffect(() => {
            // console.log("post user id:",item.user);
      // console.log("type of userid from post:",typeof(item.user));
        axiosInstance.get(`/post/getPostuser/${item.user}`)
          .then(response => {
            // console.log("username from backend respo:", response.data.user.firstName);
            // console.log("type of username from backend respo:",typeof(response.data.user.firstName))
            setPostuser(response.data.user.firstName);
            // console.log("state change postusername:", postuser);
          })
          .catch(error => {
            console.error('Error fetching username:', error);
          });
      }, []);
      

   //LIKES +DISLIKES
    const [Like, setLike] = useState(unlikeicon);
    const [likesCount, setLikesCount] = useState(item.likes.length);
    useEffect(() => {
      // console.log("Item likes:", item.likes);
      // console.log("User IDddd:", user._id);
    // Check if the current user has liked the post
    setLike(item.likes.some(like => like.user === user._id));
    // console.log('Like state:', item.likes.some(like => like.user === user._id));
    console.log(`Post ID: ${item._id}, Like state: ${item.likes.some(like => like.user === user._id)}`);
  },[item.likes, user._id]);

 


  const handleLike = async () => {
    try {
      // console.log("postid:",item._id);
      // console.log("type of postid:",typeof(item._id));
      const userid = user._id
      // console.log("user id from props",userid)
      // console.log("type of userid", typeof(userid))
      const response = await axiosInstance.post(`/post/likepost/${item._id}`,{userid});
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
      const response = await axiosInstance.post(`/post/unlikepost/${item._id}`,{userid});
      // console.log("response from unlike",response)
      if (response.status === 200) {
        setLike(unlikeicon);
        setLikesCount(likesCount - 1);
        console.log('unLikes Count:', likesCount - 1);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };




    const [modalIsOpen ,setmodalIsOpen] = useState(false);
    const handleShowmodal = ()=>{
        setmodalIsOpen(true)
    }
    const [comments , SetComments] = useState([]);
    const [commetwriting , setcommentwriting] = useState('');
    // console.log(commetwriting);

    const addComment = async()=>{
        const comment = {
            "postid":"7823131",
            "username":"Suman",
            "comment":`${commetwriting}`,
            "profile":"https://images.pexels.com/photos/2646841/pexels-photo-2646841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }

        SetComments(comments.concat(comment))
    }

    const handlecomment=()=>{
        addComment();
    };

    
    
    return (
        // area for profileimage+profilename on post top
        <div style={{ marginLeft: "120px" , marginTop:20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" ,marginBottom:10}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover",}} alt="" />
                    <p style={{marginLeft:10}}>{postuser}</p> {/* username */}
                </div>
                <div>
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
                <div style={{display:"flex"}}>
                <div style={{flex:1.3}} >
                    <img style={{width:"100%" , height:"90vh" , objectFit:"cover"}} src={item?.item?.file}  alt="" />
                </div>
                <div style={{flex:1 , height:"90vh"}}>
                    <div >
                        <div style={{display:"flex" , alignItems:"center" , paddingLeft:10 , justifyContent:"space-between"}}>
                            <div style={{display:"flex" , alignItems:"center" , paddingLeft:10}}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                            <div style={{paddingLeft:10}}>
                                <p style={{marginBottom:16}}>Suman</p>
                                <p  style={{marginTop:-17  , fontSize:12}}>Khadka</p>
                            </div>
                            </div>
                            <div>
                                <img src={Moreoptions} alt="" />
                            </div>
                        </div>

                        <div className='scrollable-div'>
                            {comments.map((item)=>(
                            <div style={{display:'flex'  , marginLeft:30}}>
                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: 30, height: 30 , borderRadius: "50%", objectFit: "cover" , marginTop:20 }} alt="" />
                               <div style={{marginLeft:20}}>
                                 <p>{item.username}</p>
                                 <p style={{marginTop:-15}}>{item.comment}</p>
                                 <p style={{color:"#A8A8A8" ,  marginTop:-10}}>1d</p>
                               </div>
                            </div>
                            ))}

                            <div style={{display:'flex' , marginLeft:30}}>
                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: 30, height: 30 , borderRadius: "50%", objectFit: "cover" , marginTop:20 }} alt="" />
                               <div style={{marginLeft:20}}>
                                 <p>Suman</p>
                                 <p style={{marginTop:-15}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore hic blanditiis asperiores sint, odit odio nemo dolore reiciendis necessitatibus assumenda corporis. Corporis doloribus aspernatur eligendi, praesentium delectus quam reiciendis labore.</p>
                                 <p style={{color:"#A8A8A8" ,  marginTop:-10}}>1d</p>
                               </div>
                            </div>

                            <div style={{display:'flex'  , marginLeft:30}}>
                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: 30, height: 30 , borderRadius: "50%", objectFit: "cover" , marginTop:20 }} alt="" />
                               <div style={{marginLeft:20}}>
                                 <p>Suman</p>
                                 <p style={{marginTop:-15}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore hic blanditiis asperiores sint, odit odio nemo dolore reiciendis necessitatibus assumenda corporis. Corporis doloribus aspernatur eligendi, praesentium delectus quam reiciendis labore.</p>
                                 <p style={{color:"#A8A8A8" ,  marginTop:-10}}>1d</p>
                               </div>
                            </div>

                            <div style={{display:'flex' , marginLeft:30}}>
                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: 30, height: 30 , borderRadius: "50%", objectFit: "cover" , marginTop:20 }} alt="" />
                               <div style={{marginLeft:20}}>
                                 <p>Suman</p>
                                 <p style={{marginTop:-15}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore hic blanditiis asperiores sint, odit odio nemo dolore reiciendis necessitatibus assumenda corporis. Corporis doloribus aspernatur eligendi, praesentium delectus quam reiciendis labore.</p>
                                 <p style={{color:"#A8A8A8" ,  marginTop:-10}}>1d</p>
                               </div>
                            </div>

                            <div style={{display:'flex' , marginLeft:30}}>
                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: 30, height: 30 , borderRadius: "50%", objectFit: "cover" , marginTop:20 }} alt="" />
                               <div style={{marginLeft:20}}>
                                 <p>Suman</p>
                                 <p style={{marginTop:-15}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore hic blanditiis asperiores sint, odit odio nemo dolore reiciendis necessitatibus assumenda corporis. Corporis doloribus aspernatur eligendi, praesentium delectus quam reiciendis labore.</p>
                                 <p style={{color:"#A8A8A8" ,  marginTop:-10}}>1d</p>
                               </div>
                            </div>


                        </div>
                    </div>

                    <div style={{marginLeft:30 , marginTop:0}}>
                        <div style={{display:'flex' , justifyContent:"space-between" , alignContent:'center'}}>
                            <div style={{marginTop:10 , marginLeft:-15}}>
                                   {/* <img onClick={handleLike} src={Like} style={{marginLeft:13 , cursor:"pointer"}} alt="" /> */}
                                <img src={commneticon} style={{marginLeft:13 , cursor:"pointer"}} alt="" />
                                <img src={Shareicon} style={{marginLeft:13 , cursor:"pointer"}} alt="" />
                            </div>
                            <div style={{marginTop:10}}>
                                <img src={Saveicon} style={{ cursor:"pointer"}} alt="" />
                            </div>
                        </div>
                        <p style={{marginTop:0}}>98,429 likes</p>
                        <p style={{fontSize:11 , color:"#A8A8A8" , marginTop:-10}}>1 DAY AGO</p>
                    </div>
                    <div style={{display:'flex' , justifyContent:"space-between" , marginLeft:30 , alignContent:'center'}}>
                        <div style={{flex:0.2}}>
                         <img src={Emoji} style={{width:24 , height:24 }} alt="" />
                        </div>
                        <div style={{flex:4 , marginLeft:10}}>
                            <textarea type="text" style={{width:"100%" , backgroundColor:"black" , border:"none" , color:"white"}} onChange={(e)=>setcommentwriting(e.target.value)
                            } placeholder='Add a comment'/>
                        </div>
                        <div style={{flex:0.3 , marginTop:-16 , marginLeft:70}} onClick={handlecomment} >
                           <p style={{cursor:'pointer' , color:"#0095F6" , fontWeight:600}}>Post</p>  
                        </div>
                    </div>
                </div>
                </div>
            </Modal>

             {/* area for postimage+caption+comment */}
            <img src={item?.file} style={{ height: "auto", width: "100%", objectFit: "contain" }} alt="" />
            <div style={{display:"flex" , alignItems:"center" , justifyContent:'space-between'}}>  {/* to style icons like,comment,save,share  */}
                <div style={{display:'flex' , alignItems:"center" , justifyContent:"space-between"}}>


                    

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
                <p style={{textAlign:"start" , color:"#A8A8A8"}}>View all 3,250 comments</p>
            </div>
            <p style={{textAlign:"start" , fontSize:"11px" , color:"#A8A8A8"}}>3 DAYS AGO</p>
        </div>
        
    )
}


