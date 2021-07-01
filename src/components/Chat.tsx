import React, {useEffect, useRef, useState} from 'react';
import AddMessageForm from "./AddMessagForm";
import io, {Socket} from 'socket.io-client'
import {ChatMessageType, UserInChat} from "../types";
import {useSelector} from "react-redux";
import {selectUser} from "../store/store";
import {BASE_API_URL} from "../constants"
import MessagesBlock from "./MessagesBlock";

const SERVER_URL = BASE_API_URL;

const Chat: React.FC = () => {
    const socketRef = useRef<null| Socket>(null);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [userInChat, setUserInChat] = useState<UserInChat[]>([]);
    const user = useSelector(selectUser);

    const addNewMessage = (value: string)=>{
        socketRef.current?.emit("send message", {
            userId: user?.id,
            userName: `${user?.lastName} ${user?.lastName}`,
            date: new Date(),
            message: value
        });
    };

    const changeUserIsWrites = (value: boolean) => {
        socketRef.current?.emit('user:changeIsWrites', {userId: user?.id, value})
    }

    useEffect(()=>{
        socketRef.current = io(SERVER_URL);

        socketRef.current.emit('user:add', user?.id);
        socketRef.current.emit('get messages', user?.id);

        socketRef.current.on('users_In_Chat', (users: UserInChat[]) => {
            setUserInChat(users.filter(userChat =>userChat.id!==user?.id))
        });

        socketRef.current.on("download:messages", (data: ChatMessageType[])=>{
            setMessages(data);
        });

        socketRef.current.on("add:message", (data: ChatMessageType)=>{
            setMessages((prevMessages) => [...prevMessages, data])
        });


        return () => {
            socketRef.current?.emit('user:leave', user?.id);
            socketRef.current?.disconnect()
        }
    }, [user])

    return (
        <div>
            <MessagesBlock userInChat={userInChat} messages={messages}/>
            <AddMessageForm addNewMessage={addNewMessage} changeUserIsWrites={changeUserIsWrites} />
        </div>
    );
};

export default Chat;
