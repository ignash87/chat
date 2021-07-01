const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        password: String,
    },
    { versionKey: false }
);
module.exports = model("UserChat", userSchema);
