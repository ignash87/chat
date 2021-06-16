const UsersInChat = require('../Schemas/userInChat');
const UserChat = require('../Schemas/user');
 const userHandler = (io, socket)=> {

    const getUsers = async () => {
        let usersInChat = await UsersInChat.find({});

        const usersPromise = usersInChat.map((user) => UserChat.find({_id: user.userId}));
        let usersData = await Promise.all(usersPromise);

        const responseData = usersInChat.reduce((acc, data)=>{
            const dataNew = usersData.find(item=> {
                return item[0]._id.equals(data.userId)
            });
            const responseUser = {
                userName: `${dataNew[0].lastName} ${dataNew[0].firstName}`,
                id: data.userId,
                isWrites: data.isWrites}
            dataNew && acc.push(responseUser)
            return acc
        }, [])

        io.sockets.emit('users_In_Chat', responseData)
    };


    const addUser = async (userId) => {
        let user = await UsersInChat.find({userId});
        if (!user.length){
            const userData = {userId, isWrites: false, socketId: socket.id}
            const newUser = await new UsersInChat(userData);
            await newUser.save();
        }
        await getUsers();
    };

    const leaveUser = async (userId) => {
        console.log(123456)
        await UsersInChat.deleteOne({userId})
        await getUsers();
    };
     const leaveBySocketUser = async (socketId) => {
         await UsersInChat.deleteOne({socketId})
         console.log('leaveBySocketUser')
         await getUsers();
     };

    const changeIsWritesUser = async ({userId, value}) => {

        await UsersInChat.updateOne({userId}, {isWrites: value});
        console.log('changeIsWritesUser')
        await getUsers();
    };

    socket.on('user:get', getUsers);
    socket.on('user:add', addUser);
    socket.on('user:leave', leaveUser);
    socket.on('user:leaveBySocket', leaveBySocketUser);
    socket.on('user:changeIsWrites', changeIsWritesUser);
}

module.exports = userHandler
