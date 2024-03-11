import Post from "../../entities/postModel.js";
import User from  '../../entities/userModel.js'
import cloudinary from "../../config/cloudinary.js";
import path from "path";




export const createPost = async (req, res) => {
    try {
        console.log(11111);
        const { caption ,user} = req.body;
        const userData = JSON.parse(user);
        const file = req.file;
        console.log("User Data:", userData);
        console.log("caption:", caption);
        console.log("file", file);
        console.log("File mimetype:", file.mimetype);
        const folder = 'posts_folder';
        let cloudinaryResponse;
        if (file.mimetype.startsWith('video/mp4')) {
            cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
                folder: folder,
                resource_type: 'video'
            });
            console.log("path video",cloudinaryResponse)
        } else {

            cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
                folder: folder
            });
            console.log("path image",cloudinaryResponse)
        }
        const newPost = new Post({
            caption,
            file: cloudinaryResponse.secure_url,
            user: userData._id
        });
        const savedPost = await newPost.save();
       return res.status(201).json(savedPost);
    } catch (error) {
        console.log(10000);
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
  console.log("postid of likedddddd:",postId)
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
  console.log("postid from unlikeddddddd:",postId)
  console.log("type of postid:",typeof(postId));

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
    // res.status(201).json({ message: 'Comment added successfully' });
    res.status(200).json({
      postId: postId,
      userId: userId,
      commentId: newComment._id,
      comment: comment,
      message: 'Comment added successfully'
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' })
  }
}


export const getCommentedUser = async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log("postId", postId);
    const commentsuserId = Array.isArray(req.query.commentsuserId) ? req.query.commentsuserId : [req.query.commentsuserId];
    // console.log("commentsuserId", commentsuserId);
    const commentIds = Array.isArray(req.query.commentId) ? req.query.commentId : [req.query.commentId];
    // console.log("commentIds:", commentIds);

    let userDetails = [];
    for (let i = 0; i < commentIds.length; i++) {
      const users = await User.find({ _id: commentsuserId[i] }, 'firstName image');
      // console.log("users getting", users);
      if (users.length > 0) {
        const user = users[0]; // Assuming there is only one user for each comment
        userDetails.push({ firstName: user.firstName, userImage: user.image ,userId:user._id});
      } else {
        userDetails.push({ firstName: "Unknown", userImage: "" }); 
      }
    }
    res.json({ userDetails });

  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}





export const deletePost = async(req,res) =>{
  try {
    console.log("HAIIIIII")
    const PostId = req.params.postId;
   console.log("post id from params",PostId)
    const post = await Post.findById(PostId);
    console.log("post details",post)
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    // Delete the post
    await Post.findByIdAndDelete(PostId);
    res.status(200).send({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send({ message: 'An error occurred while deleting the post' });
  }
}