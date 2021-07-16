const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config()

const userRouter = require('./routers/user');
const UsersInChat = require('./schemas/userInChat');

const {userHandler, getUsers} = require('./Socket/userHandler');
const messageHandler = require('./Socket/messageHandler');
const errorMiddleware = require('./middlewares/error-middlewares');

const app = express();
const port = process.env.PORT || 4000;

const http = require('http');


const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use('*', express.static(buildPath));

app.use(cors({ credentials: true, origin: '' }));
app.use(express.json());
app.use(cookieParser("secret key"));
app.use('/user', userRouter);
app.use(errorMiddleware);

mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDb, connected"))
    .catch((err) => console.log(err));


io.on("connection", (socket)=>{
    console.log("Присоединился")

    userHandler(io, socket);
    messageHandler(io, socket)

    socket.on("disconnect", async (data)=>{
        await UsersInChat.deleteOne({socketId: socket.id});
        await getUsers(io);
        console.log("Отсоединился")
    });
});

server.listen(port, () => console.log(`server is up port: ${port}`));
