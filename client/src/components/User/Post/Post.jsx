import React, { useState } from 'react'
import "./post.css"
import Moreoptions from "../../../Icons/Moreoptions.png"
import Likeicon from "../../../Icons/Notifications.png"
import commneticon from "../../../Icons/Comment.png"
import Shareicon from "../../../Icons/SharePost.png"
import Saveicon from "../../../Icons/Save.png"
import unlike from "../../../Icons/Unlike.png"
import Emoji from "../../../Icons/Emoji.png"
import Modal from "react-modal";
export default function Post(item) {

    const [modalIsOpen ,setmodalIsOpen] = useState(false);
    const [Like , SetLike] = useState(Likeicon)
    const handleShowmodal = ()=>{
        setmodalIsOpen(true)
    }

    const handleLike = ()=>{
        if(Like === Likeicon){
            SetLike(unlike)
        }else{
            SetLike(Likeicon)
        }
    }

    const [comments , SetComments] = useState([]);
    const [commetwriting , setcommentwriting] = useState('');
    console.log(commetwriting);

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

    console.log(comments)
    
    return (
        <div style={{ marginLeft: "120px" , marginTop:20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" ,marginBottom:10}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover",}} alt="" />
                    <p style={{marginLeft:10}}>Zuck</p>
                </div>
                <div>
                    <img src={Moreoptions} alt="" />
                </div>
            </div>
            
            <Modal
             style={{overlay:{backgroundColor:"#2e2b2bc7"}}}
             isOpen = {modalIsOpen}
             onRequestClose={()=>setmodalIsOpen(false)}
             className={"modalclassNameforAPost"}
             >
                <div style={{display:"flex"}}>
                <div style={{flex:1.3}} >
                    <img style={{width:"100%" , height:"90vh" , objectFit:"cover"}} src={item?.item?.postimage}  alt="" />
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
                                   <img onClick={handleLike} src={Like} style={{marginLeft:13 , cursor:"pointer"}} alt="" />
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

            <img src={item?.item?.postimage} style={{ height: "auto", width: "100%", objectFit: "contain" }} alt="" />
            <div style={{display:"flex" , alignItems:"center" , justifyContent:'space-between'}}>  {/* to style icons like,comment,save,share  */}
                <div style={{display:'flex' , alignItems:"center" , justifyContent:"space-between"}}>
                    <div  onClick={handleLike}>
                      <img src={Like} className='logoforpost' alt="" />
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
            
            <p style={{display:"flex" , marginTop:"0px"}}>147,284 likes</p>
            <p style={{textAlign:'start' , }}>zuck Sharing an update on some of Meta's next generation infra to power new AI experiences…</p>
            <div onClick={handleShowmodal} style={{cursor:"pointer"}}>
                <p style={{textAlign:"start" , color:"#A8A8A8"}}>View all 3,250 comments</p>
            </div>
            <p style={{textAlign:"start" , fontSize:"11px" , color:"#A8A8A8"}}>3 DAYS AGO</p>
        </div>
    )
}


