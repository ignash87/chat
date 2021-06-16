import React  from 'react';
import styled from "@emotion/styled";

export const InputField = styled.input`
        width: 330px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        display: block;
        padding: 0 10px;
        z-index: 2;
        position: relative;
        background-color: transparent;
        &.notValid{
                border-color: red;
        }
`;

// @ts-ignore
const FormInputField = ({ field, form: { touched, errors } }) => (
    <>
        <InputField {...field} className={touched[field.name] &&
        errors[field.name] ? "notValid" : ""} type={field.name === "password" ? "password" : "text"} />
        {
            touched[field.name] &&
            errors[field.name] &&
            <div className="error">{errors[field.name]}</div>
        }
    </>
)

export default FormInputField
