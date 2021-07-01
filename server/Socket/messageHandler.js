const Message = require('../schemas/message');

const messageHandler = (io, socket) => {
    const downloadMessages = async () => {
        let messages = await Message.find({});
        io.sockets.emit('download:messages', messages);
    };

    const sendMessage = async (data) => {
        const {userId, userName, date, message} = data;
        const newMessage = new Message({
            userId,
            userName,
            date,
            message
        });
        await newMessage.save();
        io.sockets.emit('add:message', data);
    };

    socket.on("send message", sendMessage);
    socket.on("get messages", downloadMessages);
}
module.exports = messageHandler;
