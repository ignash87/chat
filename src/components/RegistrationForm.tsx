import React from "react";

import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from '@emotion/styled'
import FormInputField from "./FormInputField";
import {useHistory} from "react-router";

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

export default function RegistrationForm() {
    const history = useHistory();

    const registrationSchema = Yup.object({
        firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(5, "Must be 5 characters or more")
            .required("Required"),
    });

    const submitHandler = async (dataUser: FormikValues, actions:  FormikHelpers<any>) => {
        const response = await axios.post("http://localhost:4000/user/registration",dataUser, {
            withCredentials: true,
        });

        const status = response.status;

        if (status === 201) {
            history.push("/login");
        } else {
            const data = await response.data;
            actions.setFieldError("login", data.message);
        }
    };

    return (
        <FormWrapper>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                }}
                validationSchema={registrationSchema}
                onSubmit={(value, actions) => {
                    submitHandler(value, actions);
                }}
            >
                {(props) => (
                    <Form>
                        <h3>Registration</h3>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component={FormInputField} />

                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component={FormInputField} />

                        <label htmlFor="email">Email Address</label>
                        <Field
                            name="email"
                            type="email"
                            component={FormInputField}
                        />

                        <label htmlFor="password">Password</label>
                        <Field name="password" component={FormInputField} />
                        <Button
                            type="submit"
                            disabled={!(props.isValid && props.dirty)}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
}
