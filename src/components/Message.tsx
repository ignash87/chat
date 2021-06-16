import React from 'react';
import {ChatMessageType} from "../types";
import { format, parseISO} from 'date-fns'
import styled from "@emotion/styled";
import {useSelector} from "react-redux";
import {selectUser} from "../store/store";

const MessageText = styled.div`
    padding: 15px;
    background: #f2f2f2;
    border-radius: 10px;
    white-space: pre-wrap;
`;
const MessageUser = styled.div`
    padding: 5px 15px;
    font-size: 1.2em;
    font-weight: bold;
    span{
        font-size: 0.8em;
        font-weight: normal;
        padding-left: 15px;
    }
`;

type MessageBlockPropsType = {
    isOwner: boolean
}

const MessageBlock = styled.div<MessageBlockPropsType>`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: ${props=> props.isOwner ? 'flex-end' : 'flex-start' }
`;

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    const user = useSelector(selectUser);
    const date = format(parseISO(message.date), 'HH:mm')

    return (
        <MessageBlock isOwner={user?.id === message.userId}>
            <MessageUser>
                {message.userName}
                <span>{date}</span>
            </MessageUser>
            <MessageText>
                {message.message}
            </MessageText>
        </MessageBlock>
    );
};

export default Message;
