import { combineReducers } from "redux";
import { ChatMessageType } from "../types";
import { AppDispatch } from "./store";
import api from "../http";

const USER_LOGOUT = 'USER_LOGOUT',
    USER_LOGIN = 'USER_LOGIN',
    MESSAGE_ADD = 'MESSAGE_ADD',
    ERROR_CLEAR = 'ERROR_CLEAR',
    ERROR_LOGIN = 'ERROR_LOGIN';

type ActionLoginUserType = {
    type: string
    payload?: UserLoginResponseType
}
type ActionTypeMessage = {
    type: string
    payload?: ChatMessageType
}

type ActionErrorType = {
    type: string
    payload?: string
}

type UserLoginResponseType = {
    firstName: string
    lastName: string
    email: string
    id: number
}

export type UserLoginRequestType = {
    email: string
    password: string
}

type InitialStateType = {
    user: null | UserLoginResponseType
    messages: ChatMessageType[]
    error: null | {login: string}
}

let initialState: InitialStateType = {
    user: null,
    messages: [],
    error: null
};

const rootReducer = combineReducers({
    user,
    messages,
    error
});

function user(state: InitialStateType["user"] = initialState.user, action : ActionLoginUserType) {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload;
        case USER_LOGOUT:
            return null
        default:
            return state;
    }
}

function error(state: InitialStateType["error"] = initialState.error, action : ActionErrorType) {
    switch (action.type) {
        case ERROR_LOGIN:
            return {...state, ...{login: action.type}}
        case ERROR_CLEAR:
            return null
        default:
            return state;
    }
}

function messages(state: InitialStateType["messages"] = initialState.messages, action: ActionTypeMessage) {
    switch (action.type) {
        case MESSAGE_ADD:
            return [...state, action.payload];
        default:
            return state;
    }
}
function actionErrorLogin(messageError: string) {
    return {
        type: ERROR_LOGIN,
        payload: messageError,
    };
}
export function actionErrorClear() {
    return {
        type: ERROR_CLEAR
    };
}

function actionLoginUser(value: UserLoginResponseType) {
    return {
        type: USER_LOGIN,
        payload: value,
    };
}

export function loginUser (dataUser: UserLoginRequestType){
    return async (dispatch: AppDispatch) => {
        try {
            const response = await api.post('/user/login', dataUser);
            const status = response.status;
            const {user, token} = await response.data;

            localStorage.setItem('token', token);
            if( status === 200 ) return dispatch(actionLoginUser(user));
        } catch(err) {
            dispatch(actionErrorLogin(err.response.data.message))

            console.log(err)
        }
    }
}

export function getInitialUser(){
    return async (dispatch: AppDispatch)=>{
        try {
            if(localStorage.getItem('token')){
                const response = await api.get('/user/userAuth');
                const { user } = await response.data;
                dispatch(actionLoginUser(user));
            }
        } catch (err){
            console.log(err)
        }

    }
}

export function actionLogoutUser() {
    return {
        type: USER_LOGOUT
    };
}

export default rootReducer;
