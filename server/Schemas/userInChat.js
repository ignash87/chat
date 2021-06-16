const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: mongoose.Types.ObjectId,
        isWrites: Boolean,
        socketId: String
    },
    { versionKey: false }
);
const UsersInChat = mongoose.model("UsersInChat", userSchema);
module.exports = UsersInChat;
