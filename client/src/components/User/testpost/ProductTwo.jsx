import React, { useState, useEffect } from 'react';
import { axiosUserInstance }  from '../../../services/axios/axios';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'
import love from '../../../Icons/Notifications2.png';
import comment from '../../../Icons/Comment.png';
import deleteicon from "../../../Icons/delete.png"

function ProductTwo({ loggedUser }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showPosts, setShowPosts] = useState([]);

  useEffect(() => {
     axiosUserInstance
      .get('/post/loadPost')
      .then((response) => {
        // console.log('check post coming:', response.data);
        setShowPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);



   //to delete user
   const deletePost = (postId) => {
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
          .delete(`/post/deletePost/${postId}`)
          .then((response) => {
            console.log('Post deleted:', response.data);
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
                <img src={love} alt="Love Icon" className="w-6 h-6 mx-2 cursor-pointer" />
                <img src={comment} alt="Comment Icon" className="w-6 h-6 mx-2 cursor-pointer" />
                <img src={deleteicon} alt ="delete Icon" className="w-6 h-6 mx-2 cursor-pointer"   onClick={() => deletePost(post._id)}/>
              </div>
            )}
          </div>
        )
      ))}
           
    </div>
  );
}

export default ProductTwo;


