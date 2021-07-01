const UsersInChat = require('../schemas/userInChat');
const UserChat = require('../schemas/user');

const getUsers = async (io) => {
    let usersInChat = await UsersInChat.find({});

    const usersPromise = usersInChat.map((user) => UserChat.find({_id: user.userId}));
    let usersData = await Promise.all(usersPromise);

    const responseData = usersInChat.reduce((acc, data)=>{
        const dataNew = usersData.find(item=> {
            return item[0]._id.equals(data.userId);
        });
        const responseUser = {
            userName: `${dataNew[0].lastName} ${dataNew[0].firstName}`,
            id: data.userId,
            isWrites: data.isWrites}
        dataNew && acc.push(responseUser)
        return acc;
    }, [])

    io.sockets.emit('users_In_Chat', responseData);
};

module.exports.userHandler = (io, socket)=> {
    const addUser = async (userId) => {
        let user = await UsersInChat.find({userId});
        if (!user.length){
            const userData = {userId, isWrites: false, socketId: socket.id}
            const newUser = await new UsersInChat(userData);
            await newUser.save();
        }
        await getUsers(io);
    };

    const leaveUser = async (userId) => {
        await UsersInChat.deleteOne({userId});
        await getUsers(io);
    };

    const changeIsWritesUser = async ({userId, value}) => {
        await UsersInChat.updateOne({userId}, {isWrites: value});
        await getUsers(io);
    };

    socket.on('user:add', addUser);
    socket.on('user:leave', leaveUser);
    socket.on('user:changeIsWrites', changeIsWritesUser);
}

module.exports.getUsers = getUsers;
