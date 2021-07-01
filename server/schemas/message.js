const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        userName: String,
        date: Date,
        message: String
    },
    { versionKey: false }
);

module.exports = model("Messages", messageSchema);
