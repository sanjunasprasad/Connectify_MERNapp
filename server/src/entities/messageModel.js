import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    // imageData: {
    //   data: Buffer, // Instead of directly using Buffer type, use an object with a 'data' property
    //   contentType: String, // Store content type of the image
    // },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel
