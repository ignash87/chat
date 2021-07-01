import React, { useEffect, useRef } from 'react';
import {ChatMessageType} from "../types";
import Message from "./Message";

const Messages: React.FC<{ messages: ChatMessageType[] }> = ({ messages}) => {
    const elementMessages = useRef<HTMLDivElement>(null);
    const isScrolled = useRef<boolean>(false)

    useEffect(()=> {
        const scrollHandler = (): void => {
            isScrolled.current = true;
        };
        elementMessages.current?.addEventListener('scroll',scrollHandler, {once: true});
    }, []);

    useEffect(()=> {
        const scrollTop = elementMessages.current?.scrollTop as number;
        const scrollHeight = elementMessages.current?.scrollHeight as number;
        const heightElement = elementMessages.current?.clientHeight as number;
        const scroll = scrollHeight - heightElement;

        if((scrollHeight - scrollTop - heightElement) < 300 || !isScrolled.current){
            elementMessages.current?.scroll({
                behavior: "smooth",
                top: scroll
            });
        }
    }, [messages]);

    return (
        <div ref={elementMessages} className='messages'>
            {messages.map((m)=> <Message key={new Date(m.date).getTime()} message={m} /> )}
        </div>
    );
};

export default Messages;
