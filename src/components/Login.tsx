import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import {Field, Form, Formik, FormikValues} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import FormInputField from "../components/FormInputField";
import styled from "@emotion/styled";
import {selectErrorLogin, selectUser} from "../store/store";
import {actionErrorClear, loginUser, UserLoginRequestType} from "../store/rootReducer";

const Button = styled.button`
    align-content: center;
    border-radius: 3px;
    padding: 6px 20px;
    background-color: #49abdf;
    color #fff;
    &:hover{
        background-color: #3cd0f5;
    }
    &:disabled {
        background-color: rgb(138 230 253);
    }
`;
const FormWrapper = styled.section`
    display: flex;
    justify-content: center;
    position: relative;
    form{
        margin-top: 30px;
    }
    & h3{
        font-size: 1.3rem;
        font-weight: 500;
        margin: 30px 0;
        text-align: left
    }
    & label{
        margin-top: 15px;
        margin-bottom: 3px;
    }
    & form{
        display: flex;
        flex-direction: column;
    }
    & button{
        align-self: flex-end;
        margin-top: 15px;
    }
    .error{
        color: red;
        font-size: 0.8rem;
    }
    .errorMessage{
        position: absolute;
        background-color: #e89650;
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0;
        transition: 0.5s ease;
        overflow: hidden;
    }
    .showError{
        height: 35px
    }
 
`;

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);
    const errorMessage = useSelector(selectErrorLogin)

    const errorField = useRef<null | HTMLDivElement>(null);

    const registrationSchema = Yup.object({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    });

    useEffect(() => {
        if (user) history.push("/");
    }, [user]);

    useEffect(() => {
        if (errorMessage) {
            errorField.current?.classList.add("showError");
            setTimeout(() => {
                            errorField.current?.classList.remove("showError");
                            dispatch(actionErrorClear())
                        }, 2000);
        }
    }, [errorMessage]);

    const submitHandler = async (dataUser: FormikValues) => {
        dispatch(loginUser(dataUser as UserLoginRequestType))
        // const response = await API.post("/login", dataUser, {
        //     withCredentials: true,
        // });
        // const status = response.status;
        //
        // if (status === 200) {
        //
        //     history.push("/");
        //
        // } else {
        //
        //     const data = await response.data;
        //     setErrorMessage(() => {
        //         setTimeout(() => {
        //             errorField.current?.classList.add("showError");
        //         }, 100);
        //
        //         return data.message;
        //     });
        //
        // }
    };

    // useEffect(() => {
    //     if (user?.userLogin) history.push("/");
    // }, [user, history]);

    return (
        <FormWrapper>
            {errorMessage && (
                <div ref={errorField} className="errorMessage">
                    {errorMessage}
                </div>
            )}
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={registrationSchema}
                onSubmit={(value, actions) => {
                    submitHandler(value);
                }}
            >
                {(props) => (
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field name="email" component={FormInputField} />

                        <label htmlFor="password">Password</label>
                        <Field
                            name="password"
                            type="password"
                            component={FormInputField}
                        />
                        <Button
                            type="submit"
                            disabled={!(props.isValid && props.dirty)}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
}
export  default  Login
