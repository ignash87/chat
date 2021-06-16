import React, {useRef, useState} from 'react';
import {Button, Input} from 'antd';

const { TextArea } = Input;

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
        addNewMessage(value);
        setValue('');
    }

    return (
        <div>
            <TextArea onBlur={()=> {changeUserIsWrites(false)}} onFocus={()=>{changeUserIsWrites(true)}} rows={4} onChange={handlerChange} value={value}  />
            <Button onClick={handlerSubmit}>Send</Button>
        </div>
    );
};

export default AddMessageForm;
