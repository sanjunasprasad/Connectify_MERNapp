import Post from  '../../entities/postModel.js'
import cloudinary from "../../config/cloudinary.js"
import path from 'path';


//create post
  export const createPost = async(req,res) =>{
    try {
      console.log(11111)
      const { caption } = req.body;
    const file = req.file;
        console.log("caption:",caption)
        console.log("file",file)
    const folder = 'posts_folder';
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path,{folder: folder});
    const newPost = new Post({
      caption,
      file: cloudinaryResponse.secure_url 
    });
    await newPost.save();
    res.status(201).send('Post created successfully');
    } catch (error) {
      console.log(10000)
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  }



// import Post from '../../entities/postModel.js';
// import cloudinary from "../../config/cloudinary.js";
// import path from 'path';
// export const createPost = async (req, res) => {
//     try {
//         console.log(11111);
//         const { caption } = req.body;
//         const file = req.file;
//         console.log("caption:", caption);
//         console.log("file", file);
//         console.log("File mimetype:", file.mimetype);
//         const folder = 'posts_folder';
//         let cloudinaryResponse;
//         if (file.mimetype.startsWith('video')) {
//             cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
//                 folder: folder,
//                 resource_type: 'video' 
//             });
//             console.log("path video",cloudinaryResponse)
//         } else {
  
//             cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
//                 folder: folder
//             });
//             console.log("path image",cloudinaryResponse)
//         }
//         const newPost = new Post({
//             caption,
//             file: cloudinaryResponse.secure_url 
//         });
//         await newPost.save();
//         res.status(201).send('Post created successfully');
//     } catch (error) {
//         console.log(10000);
//         console.error('Error creating post:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };




  //loadpost
  export const loadPost = async(req,res) =>{
    try {
      const posts = await Post.find(); 
      console.log("list ofposts:",posts)
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }