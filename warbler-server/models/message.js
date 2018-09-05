const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // reference to the User model
    },
  },
  {
    timestamps: true
  });

// when we remove a message, we find the user and remove the id of the message from the user's message list
messageSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the message from their messages list
    user.messages.remove(this.id); // sync call from mongo
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
