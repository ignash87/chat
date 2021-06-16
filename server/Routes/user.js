const express = require('express')
const app = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserChat = require('../Schemas/user');

app.get("/userAuth", auth, async function (req, res){
    const {userId} = req.user;
    const user = await UserChat.findOne({_id: userId});
    console.log(user)
    const responseData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
    }
    return res.status(200).json({message: "User logged in", user: responseData})
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await UserChat.findOne({email});
    if (!user){
        return res.status(400).json({message: "User is not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return res.status(400).json({message: "Wrong password"})
    }
    const token = jwt.sign(
        {userId: user.id},
        'secret key',
        { expiresIn: '1h'}
    );

    const responseData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
    }

    res.cookie('token', token);

    return res.status(200).json({message: "User logged in", user: responseData})

});
app.get("/logout", async (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({message: "User logout"})
})
app.post("/registration", async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const candidate = await UserChat.findOne({email});

    if (candidate){
        return res.status(400).json({message: "Such a email exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserChat({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({message: "User created"})

});

function auth(req, res, next){
    try {
        const token = req.cookies['token'];
        if(!token){
            return res.status(401).json({message: "No authorization"})
        }

        const decoder = jwt.verify(token, 'secret key')
        req.user = decoder;
        next()

    } catch (error) {
        return res.status(401).json({message: "No authorization"})
    }
}

module.exports = app
