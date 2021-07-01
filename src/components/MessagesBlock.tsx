import React from 'react';
import { ChatMessageType, UserInChat } from "../types";
import UsersInChat from "./UsersInChat";
import Messages from "./Messages";
import styled from "@emotion/styled";

const MessageWrapper = styled.div`
    display: flex;
    height: 50vh;
    & ul{
        width: 20%;
        min-width: 150px;
        border-right: solid 1px;
        list-style: none;
    }
    & .messages{
        overflow: auto;
    }
    
`;
const MessagesBlock: React.FC<{ userInChat: UserInChat[], messages: ChatMessageType[] }> = ({ userInChat, messages}) => {
    return (
        <MessageWrapper>
            <UsersInChat userInChat={userInChat} />
            <Messages messages={messages}/>
        </MessageWrapper>
    );
}


export default MessagesBlock;
