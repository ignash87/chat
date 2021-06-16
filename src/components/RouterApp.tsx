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
import {selectUser} from "../store/store";

function RouterApp() {
    const user = useSelector(selectUser)
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={user ? Chat : Login} />
                <Route path="/login" component={Login} />
                <Route path="/registration" component={RegistrationForm} />
            </Switch>
        </Router>
    );
}

export  default RouterApp


