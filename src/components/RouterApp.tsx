import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import Chat from "./Chat";
import Header from "./Header";
import {useSelector} from "react-redux";
import {selectIsLoading, selectUser} from "../store/store";
import Loader from "./Loader";

function RouterApp() {
    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoading)
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" >
                    {isLoading ? <Loader/> : (user ? <Chat/> : <Redirect to="/login"/>)}
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/registration" component={RegistrationForm} />
            </Switch>
        </Router>
    );
}

export  default RouterApp


