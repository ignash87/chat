const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        refreshToken: String
    },
    { versionKey: false }
);

module.exports = model("Token", TokenSchema);

