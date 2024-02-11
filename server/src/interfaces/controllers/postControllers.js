// import { savePost } from "../../usecases/PostUseCases/createPost.js";
// export const createPost = async(req,res) =>{
//     console.log("$$$$$$$$$$$$$$$$")
//     try{
//          const {caption} = req.body
//          const {file} = req.file
//          const response = await savePost(caption,file)
//          if(!response)
//          {
//           return res.status(401).end(); 
//          }
            
//     }catch(error){
//       console.error('Error creating post:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }


import Post from  '../../entities/postModel.js'
import cloudinary from "../../config/cloudinary.js"
import path from 'path';
  export const createPost = async(req,res) =>{
    try {
      console.log(11111)
      const { caption } = req.body;
    const file = req.file;
        console.log("caption:",caption)
        console.log("file",file)
    // Upload file to Cloudinary
    const folder = 'posts_folder';
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path,{folder: folder});

    // Save post data to MongoDB
    const newPost = new Post({
      caption,
      file: cloudinaryResponse.secure_url // Save Cloudinary URL to the post
    });

    await newPost.save();

    res.status(201).send('Post created successfully');
    } catch (error) {
      console.log(10000)
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  }