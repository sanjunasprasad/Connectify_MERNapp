import Post from "../../entities/postModel.js";
import User from  '../../entities/userModel.js'
import cloudinary from "../../config/cloudinary.js";
import path from "path";

//create post
export const createPost = async (req, res) => {
  try {
    const { caption, user } = req.body;
    const userData = JSON.parse(user);
    const file = req.file;
    // console.log("User Data:", userData);
    // console.log("caption:", caption);
    // console.log("file", file);
    const folder = "posts_folder";
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
      folder: folder,
    });
    const newPost = new Post({
      caption,
      file: cloudinaryResponse.secure_url,
      user: userData._id,
    });
    await newPost.save();
     return res.status(201).send("Post created successfully");
  } catch (error) {
    console.log(10000);
    console.error("Error creating post:", error);
   return  res.status(500).json({ message: "Internal server error" });
  }
};

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
export const loadPost = async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log("list ofposts:",posts)
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//postuser name display
export const getPostedUser = async(req,res) =>{
  try {
    const userId = req.params.user;
    // console.log("user id  :",userId)
    // console.log("type of userid:",typeof(userId));
    const user = await User.findById(userId);
    // console.log("user from mongo:",user)
    // console.log("type of user from mongo:",typeof(user))
    //  console.log("user id",userId + "name:",user.firstName)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


//like post
export const likePost = async(req,res) =>{
  const  postId  = req.params.postid;
  console.log("postid :",postId)
  console.log("type of postid:",typeof(postId));

  const {userid} = req.body;
  console.log("userid",userid)
  console.log("type of userid:",typeof(userid));
  try {
    const post = await Post.findById(postId);
    // console.log("post data from db",post)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.some(like => like.user.toString() === userid)) {
      return res.status(400).json({ message: 'Post already liked' });
    }
    post.likes.push({ user: userid });
    await post.save();
    res.status(200).json({ message: 'Post liked successfully' });
  } 
  catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


//unlike post
export const unlikePost = async(req,res) =>{
  const  postId  = req.params.postid;
  // console.log("postid :",postId)
  // console.log("type of postid:",typeof(postId));

  const {userid} = req.body;
  // console.log("userid",userid)
  // console.log("type of userid:",typeof(userid));

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const likeIndex = post.likes.findIndex(like => like.user.toString() === userid);
    if (likeIndex === -1) {
      return res.status(400).json({ message: 'Post not liked' });
    }
    // Remove the user's like from the post
    post.likes.splice(likeIndex, 1);
    await post.save();
        // console.log("post data from db",post)
    res.status(200).json({ message: 'Post unliked successfully' });
  } 
  catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const commentPost = async(req,res) =>{
  try {
    const postId = req.params.postid;
    const { userId, comment } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const newComment = {
      user: userId,
     text:comment
    };
    post.comments.push(newComment);
    await post.save();
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' })
  }
}



//commented name display
export const getCommentedUser = async(req,res) =>{
  try {
    const  postId  = req.params.postId;
    // console.log("postid",postId)
    const { commentsuserId } = req.query;
    // console.log("userid",commentsuserId)
    const users = await User.find({ _id: { $in: commentsuserId } }, 'firstName'); 
    const usernames = users.map(user => user.firstName); 
    // console.log("usernames",usernames)
    res.json({ usernames });
  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}