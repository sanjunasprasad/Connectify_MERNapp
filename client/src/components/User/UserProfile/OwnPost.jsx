import React, { useState, useEffect } from 'react';
import { axiosUserInstance }  from '../../../services/axios/axios';
import Modal from "react-modal";
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'
import love from '../../../Icons/Notifications2.png';
import comment from '../../../Icons/Comment.png';
import deleteicon from "../../../Icons/delete.png"
import Moreoptions from "../../../Icons/Moreoptions.png"

function OwnPost({ loggedUser }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showPosts, setShowPosts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
     axiosUserInstance
      .get('/post/loadPost',{
        headers: {
          'Authorization': `Bearer ${token}`,
          'role': 'user'
      }
      })
      .then((response) => {
        console.log(" my profile response:",response)
        setShowPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);



   //to delete post
   const deletePost = (postId) => {
    const token = localStorage.getItem("token");
    console.log("post to be deleted:",postId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          axiosUserInstance 
          .delete(`/post/deletePost/${postId}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'role': 'user'
          }
          })
          .then((response) => {
            // console.log('Post deleted:', response.data);
            // Remove the deleted post from showPosts state
            setShowPosts(showPosts.filter(post => post.id !== postId));
            // Show success message
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
            // Show error message
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while deleting the post.',
              icon: 'error'
            });
          });
      }
    });
  };


  //to show modal in comments
  const [modalIsOpen ,setmodalIsOpen] = useState(false);
  const handleShowmodal = ()=>{
      setmodalIsOpen(true)
  }

  return (
    <div className="mx-auto grid gap-y-3 grid gap-x-3 w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:space-y-0 lg:grid-cols-4 ">
      {showPosts.map((post, index) => (
        // Filter posts based on loggedUser's _id matching post.user
        loggedUser._id === post.user && (
          <div
            key={index}
            className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-400 "
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
          
            <img
              src={post.file} 
              alt={post.title} 
              className="z-0 h-full w-full rounded-md object-cover"
              style={{ maxHeight: '250px' }}
            />
            {hoveredIndex === index && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center" onClick={handleShowmodal}>
                <img src={love} alt="Love Icon" className="w-6 h-6 mx-2 cursor-pointer" />
                <img src={comment} alt="Comment Icon" className="w-6 h-6 mx-2 cursor-pointer" />
                <img src={deleteicon} alt ="delete Icon" className="w-6 h-6 mx-2 cursor-pointer"   onClick={() => deletePost(post._id)}/>
              </div>
            )}
          </div>
        )
      ))}

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
                    <img style={{width:"100%" , height:"85vh" , objectFit:"cover"}} src="" alt="" />
                </div>

                   {/* rightside commentsection */}
                <div style={{flex:1 , height:"90vh"}}>
                    <div >
                        <div style={{display:"flex" , alignItems:"center" , paddingLeft:10 , justifyContent:"space-between"}}>
                            <div style={{display:"flex" , alignItems:"center" , paddingLeft:10}}>
                              <img src=""style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                              <div style={{paddingLeft:10}}>
                                {/* post owner name on top comment section */}
                                  <p style={{marginBottom:0}}></p> 
                              </div>
                            </div>
                            <div>
                                <img src={Moreoptions} alt="" />
                            </div>
                        </div>

                       {/* dynamic comment display section */}
                        <div className='scrollable-div'>
                              {/* {postlist.comments.map((comment, index) => ( */}
                                <div style={{ display: 'flex', marginLeft: 30 }}>
                                  <img src="" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', marginTop: 35 }} alt="User" />
                                  <div style={{ marginLeft: 20 }}>
                                    <p style={{ marginTop: 30 }}></p>
                                    <p style={{ marginTop: 0 }}></p>
                                    <p style={{ color: '#A8A8A8', marginTop: -4 }}></p>
                                  </div>
                                </div>
                               {/* ))} */}
                        </div>
                    </div>


                    <div style={{display:'flex' , justifyContent:"space-between" , marginLeft:30 , alignContent:'center'}}>
                        <div style={{flex:4 , marginLeft:10}}>
                            <textarea type="text"  value={comment}style={{width:"100%" , backgroundColor:"black" , border:"none" , color:"white"}}  placeholder='Add a comment'/>
                        </div>
                        <div style={{flex:0.3 , marginTop:6 , marginLeft:10}}  >
                           <p style={{cursor:'pointer' , color:"#0095F6" , fontWeight:600}} >Post</p>  
                        </div>
                    </div>
                </div>
              </div>
      </Modal>

           
    </div>
  );
}

export default OwnPost;


