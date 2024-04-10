import Post from "../../entities/postModel.js";
import User from "../../entities/userModel.js";
import cloudinary from "../../config/cloudinary.js";


export const createPost = async (req, res) => {
  try {
    console.log(11111);
    let fileUrl;
    const { caption, user } = req.body;
    const userData = JSON.parse(user);
    const file = req.file;
    const paths = req.file.path;
    // console.log("User Data:", userData);
    // console.log("caption:", caption);
    console.log("1)file from multer", file);
    console.log("2)File mimetype:", file.mimetype);
    console.log("3)path from multer is", paths);
    const folder = "posts_folder";
    if (file.mimetype.startsWith("video/mp4")) {
      console.log("4)path video", paths);
      fileUrl = paths;
    } else {
      let cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
        folder: folder,
      });
      console.log("path image", cloudinaryResponse);
      fileUrl = cloudinaryResponse.secure_url;
      console.log("fileurl of image", fileUrl);
    }
    const newPost = new Post({
      caption,
      file: fileUrl,
      user: userData._id,
    });
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    console.log(10000);
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//load our post
export const loadownPost = async (req, res) => {
  try {
     const {userId} = req.query;
    console.log("my id",userId)
    const posts = await Post.find({user: userId})
    .populate('user', 'firstName image') 
    .populate('comments.user', 'firstName image')
    console.log("list ofposts:",posts)
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//load restricted post
export const loadPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log("my id",userId)
    const following = JSON.parse(req.query.following);
    // console.log("i am following them",following)
    const posts = await Post.find({
      $or: [{ user: userId }, { user: { $in: following } }],
    }).populate("user")
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'firstName image', 
      },
    }).populate({
      path: 'likes',
      populate: {
        path: 'user',
        select: 'firstName  lastName image', 
      },
    });

    // console.log("selected posts:",posts)
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//like post
export const likePost = async (req, res) => {
  const postId = req.params.postid;
  console.log("postid of likedddddd:", postId);

  const { userid } = req.body;
  console.log("userid", userid);

  try {
    const post = await Post.findById(postId);
    // console.log("post data from db",post)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.some((like) => like.user.toString() === userid)) {
      return res.status(400).json({ message: "Post already liked" });
    }
    post.likes.push({ user: userid });
    await post.save();
    //find length of post
    const updatedPost = await Post.findById(postId);
    const likeCount = updatedPost.likes.length;
    res.status(200).json({  postId, userid,likeCount,message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//unlike post
export const unlikePost = async (req, res) => {
  const postId = req.params.postid;
  console.log("postid from unlikeddddddd:", postId);
  console.log("type of postid:", typeof postId);

  const { userid } = req.body;
  // console.log("userid",userid)
  // console.log("type of userid:",typeof(userid));

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const likeIndex = post.likes.findIndex(
      (like) => like.user.toString() === userid
    );
    if (likeIndex === -1) {
      return res.status(400).json({ message: "Post not liked" });
    }
    // Remove the user's like from the post
    post.likes.splice(likeIndex, 1);
    await post.save();
    // console.log("post data from db",post)

    const updatedPost = await Post.findById(postId);
    const likeCount = updatedPost.likes.length;
    res.status(200).json({ postId, userid,likeCount,message: "Post unliked successfully" });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//comment post
export const commentPost = async (req, res) => {
  try {
    const postId = req.params.postid;
    const { userId, comment } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = {
      user: userId,
      text: comment,
    };
    post.comments.push(newComment);
    await post.save();
    // res.status(201).json({ message: 'Comment added successfully' });
    res.status(200).json({
      postId: postId,
      userId: userId,
      commentId: newComment._id,
      comment: comment,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//commented user name
export const getCommentedUser = async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log("postId", postId);
    const commentsuserId = Array.isArray(req.query.commentsuserId)
      ? req.query.commentsuserId
      : [req.query.commentsuserId];
    // console.log("commentsuserId", commentsuserId);
    const commentIds = Array.isArray(req.query.commentId)
      ? req.query.commentId
      : [req.query.commentId];
    // console.log("commentIds:", commentIds);

    let userDetails = [];
    for (let i = 0; i < commentIds.length; i++) {
      const users = await User.find(
        { _id: commentsuserId[i] },
        "firstName image"
      );
      // console.log("users getting", users);
      if (users.length > 0) {
        const user = users[0]; // Assuming there is only one user for each comment
        userDetails.push({
          firstName: user.firstName,
          userImage: user.image,
          userId: user._id,
        });
      } else {
        userDetails.push({ firstName: "Unknown", userImage: "" });
      }
    }
    res.json({ userDetails });
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete our post
export const deletePost = async (req, res) => {
  try {
    console.log("HAIIIIII");
    const PostId = req.params.postId;
    console.log("post id from params", PostId);
    const post = await Post.findById(PostId);
    console.log("post details", post);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    await Post.findByIdAndDelete(PostId);
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the post" });
  }
};

//save post
export const savedPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log("post id from params", postId);
    const { userId } = req.body;
    console.log("LOGGED USER ID",userId)
    const user = await User.findById(userId);
    if (user.savedPosts.includes(postId)) {
      return res.status(400).json({ message: "Post already saved" }); 
    }
    user.savedPosts.push(postId);
    await user.save();
    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



//get saved post.
export const getSavedPost = async(req, res) => {
  try {
    const userId = req.params.userId;
    console.log("user id is", userId);
    const user = await User.findById(userId).populate('savedPosts');
    const savedPosts = user.savedPosts.map(async (post) => {
      const postWithUserInfo = { ...post._doc };
      const postUser = await User.findById(post.user);
      console.log('owner of Post user:', postUser);
      postWithUserInfo.username = postUser.firstName;
      postWithUserInfo.userPhoto = postUser.image; 
   

      // Fetch names and images of users who commented on this post
      const populatedComments = await Promise.all(post.comments.map(async (comment) => {
        const commentUser = await User.findById(comment.user);
        if (commentUser) { // Check if commentUser is not null
          return {
            ...comment._doc,
            username: commentUser.firstName,
            userPhoto: commentUser.image,
          };
        } else {
          return null; // or handle as per your application's logic
        }
      }));
      postWithUserInfo.comments = populatedComments.filter(comment => comment !== null); // Remove null values

      return postWithUserInfo;
    });
    const populatedSavedPosts = await Promise.all(savedPosts);
    console.log("Saved postsssss", populatedSavedPosts);
    res.status(200).json(populatedSavedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


export const editPost = async(req,res) =>{
  try {
    const postId = req.params.postId;
    const { caption } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, { caption }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post caption updated successfully", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}




