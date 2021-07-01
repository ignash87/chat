const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        isWrites: Boolean,
        socketId: String
    },
    { versionKey: false }
);
module.exports = model("UsersInChat", userSchema);
