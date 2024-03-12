import Post from "../../entities/postModel.js";
import User from "../../entities/userModel.js";

export const getUserAccount = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log("params",userId)
    const user = await User.findById(userId).select("-password");
    // console.log("friend is",user)
    const posts = await Post.find({ user: userId });
    // console.log("post is",posts)
    const userDataWithPosts = {
      user: user,
      posts: posts,
    };

    res.status(200).json(userDataWithPosts);
  } catch (error) {
    console.error("Error fetching user details and posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const followUser = async (req, res) => {
  const  userId  = req.params.id;
  console.log("friend id",userId)
  const { loggeduser } = req.body;
  console.log("loggeduser id",loggeduser)
  console.log
  try {
    const user = await User.findById(userId); //friend
    if (user.followers.includes(loggeduser)) {
      return res.status(400).send("You are already following this user");
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { followers: loggeduser },
      });
      await User.findByIdAndUpdate(loggeduser, {
        $addToSet: { following: userId },
      });
      res.status(200).send("Followed successfully");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const unfollowUser = async (req, res) => {
  const  userId  = req.params.id;
  console.log("friend id",userId)
  const { loggeduser } = req.body;
  console.log("loggeduser id",loggeduser)

  try {
    const user = await User.findById(userId);
    if (!user.followers.includes(loggeduser)) {
      return res.status(400).send("You are not following this user");
    } else {
      await User.findByIdAndUpdate(userId, {
        $pull: { followers: loggeduser },
      });
      await User.findByIdAndUpdate(loggeduser, {
        $pull: { following: userId },
      });
      res.status(200).send("Unfollowed successfully");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
