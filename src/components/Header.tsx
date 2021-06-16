import React from 'react';
import styled from "@emotion/styled";
import {Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../store/store";
import axios from "axios";
import {actionLogoutUser} from "../store/rootReducer";

const Sign = styled.div`
   
    span {
        padding-right: 25px;
    }
    button {
        color: #484848;
        padding: 0 5px;
        margin : 0 10px
    }
    button:hover {
        color: #000;
    }
`;
const HeaderWrapper = styled.div`
    box-shadow: 0px 5px 10px -1px rgba(34, 60, 80, 0.2);
    display: flex;
    justify-content: space-between;
    padding: 30px;
    margin-bottom: 15px;
`;


const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const logOutHandler = async () => {
        const response = await axios.get('/user/logout',{
            withCredentials: true,
            responseType: "json"
        });
        const data = await response.data;
        console.log(data)
        dispatch(actionLogoutUser());
    };
    return (
        <HeaderWrapper>
            { user &&
                <div>
                    {user?.lastName} {user?.firstName}
                </div>
            }

            <Sign>
                {!user ?
                    <>
                        <button>
                            <NavLink to="/login" activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }}>
                                Log In
                            </NavLink>
                        </button>
                        <button>
                            <NavLink to="/registration" activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }}>
                                Sign Up
                            </NavLink>
                        </button>
                    </>
                    :
                    <button onClick={logOutHandler}>
                        <Link to="/" >
                            Log Out
                        </Link>
                    </button>
                }
            </Sign>
        </HeaderWrapper>

    );
};

export default Header;
