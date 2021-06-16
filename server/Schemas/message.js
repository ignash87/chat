const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        userId: mongoose.Types.ObjectId,
        userName: String,
        date: Date,
        message: String
    },
    { versionKey: false }
);

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;

