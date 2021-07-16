import React, {useRef, useState} from 'react';
import {Button, Input} from 'antd';
import styled from "@emotion/styled";

const TextArea = styled.textarea`
    width: 100%;
    resize: none;
    padding: 10px;
    border-radius: 5px;
    outline: none;

}
`;
const AddMessageWrapper = styled.div`
    padding: 10px 20px;
    width: 100%;
`;

type AddMessageFormProps = {
    addNewMessage: (value:string)=>void
    changeUserIsWrites: (value: boolean)=>void
}

const AddMessageForm: React.FC<AddMessageFormProps> = ({ addNewMessage, changeUserIsWrites }) => {
    const [value, setValue] = useState<string>('');

    const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setValue(event.target.value);
        event.target.value="";
    };
    const handlerSubmit = ()=>{
        if(value){
            addNewMessage(value);
            setValue('');
        }
    }
    const handlerEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.which == 13 && event.shiftKey == false) {
            event.preventDefault();
            handlerSubmit();
        }
    };

    return (
        <AddMessageWrapper>
            <TextArea
                onBlur={() => {changeUserIsWrites(false)}}
                onFocus={()=>{changeUserIsWrites(true)}}
                onChange={handlerChange}
                onKeyPress={handlerEnterPress}
                rows={4}
                value={value}  />
            <Button onClick={handlerSubmit}>Send</Button>
        </AddMessageWrapper>
    );
};

export default AddMessageForm;
