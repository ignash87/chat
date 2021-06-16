const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require('./Routes/user')
const Messages = require('./Schemas/message');
const app = express();
const port = process.env.PORT || 4000;

const http = require('http');
const userHandler = require('./Socket/userHandler');
const UsersInChat = require('./Schemas/userInChat');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(cors({ credentials: true, origin: '' }));
app.use(bodyParser.json());
app.use(cookieParser("secret key"));

mongoose.connect("mongodb+srv://yander:yander@cluster0-ekjj1.mongodb.net/Chat?retryWrites=true&w=majority",
        {useNewUrlParser: true,
            useUnifiedTopology: true,}
    )
    .then(() => console.log("MongoDb, connected"))
    .catch((err) => console.log(err));

app.use('/user', userRoute);

let connections = [];

io.on("connection", (socket)=>{
    connections.push(socket);
    console.log("Присоединился")

    socket.on("disconnect", async  (data)=>{
        io.sockets.emit('user:leaveBySocket', socket.id)
        await UsersInChat.deleteOne({socketId: socket.id})
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отсоединился")
    });

    userHandler(io, socket);

    socket.on("send message", async (data) => {
        const { userId, userName, date, message} = data;
        const newMessage = new Messages({
            userId,
            userName,
            date,
            message
        });
        await newMessage.save();
        io.sockets.emit('message', data)
    })
});


server.listen(port, () => console.log(`server is up port: ${port}`));
