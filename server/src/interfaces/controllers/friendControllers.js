import Post from "../../entities/postModel.js";
import User from  '../../entities/userModel.js'

export const getUserAccount = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log("params",userId)
      const user = await User.findById(userId).select('-password');
      console.log("friend is",user)
      const posts = await Post.find({ user: userId });
      console.log("post is",posts)
      const userDataWithPosts = {
        user: user,
        posts: posts
      };
  
      res.status(200).json(userDataWithPosts);
    } catch (error) {
      console.error("Error fetching user details and posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  