import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
    AuthenticatedRoute,
    UnAuthenticatedRoute,
} from "../shared/PrivateRoute";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Body = () => {
    return (
        <div className="body__container">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <UnAuthenticatedRoute path="/signup">
                    <SignUp />
                </UnAuthenticatedRoute>
                <UnAuthenticatedRoute path="/signin">
                    <SignIn />
                </UnAuthenticatedRoute>
                <AuthenticatedRoute path="/profile">
                    <Profile />
                </AuthenticatedRoute>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </div>
    );
};

export default Body;
