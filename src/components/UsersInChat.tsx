import React from 'react';
import { UserInChat } from "../types";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(20deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;
const Pen = styled.span`
    color: #096dd9;
    display: inline-block;
    transform: scale(-1, 1);
    animation: ${rotate} 0.7s linear infinite;
`;
const UsersInChat: React.FC<{ userInChat: UserInChat[] }> = ({ userInChat}) => {
    return (
        <ul>
            {userInChat.map(u => <li key={u.id}>{u.userName} {u.isWrites && <Pen>&#9998;</Pen>}</li>)}
        </ul>
    );
}


export default UsersInChat;
