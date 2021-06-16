import React from 'react';
import {ChatMessageType} from "../types";
import Message from "./Message";


const Messages: React.FC<{ messages: ChatMessageType[] }> = ({ messages}) => {
    return (
        <div>
            {messages.map((m)=> <Message key={new Date(m.date).getTime()} message={m} /> )}
        </div>
    );
};

export default Messages;
