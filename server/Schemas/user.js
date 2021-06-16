const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        password: String,
    },
    { versionKey: false }
);
const UserChat = mongoose.model("UserChat", userSchema);
module.exports = UserChat;

