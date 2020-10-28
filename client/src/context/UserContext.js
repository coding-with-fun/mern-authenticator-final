import React, { createContext, useEffect, useState } from "react";
import { UserDetails } from "../api/user.api";
import {
    DeleteFunction,
    SignInFunction,
    SignUpFunction,
    UpdateFunction,
} from "./UserAuth";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: "",
    });
    const [errorMessages, setErrorMessages] = useState({
        email: null,
        password: null,
    });
    const [serverError, setServerError] = useState(null);
    const [serverSuccess, setServerSuccess] = useState(null);
    const [verifiedUser, setVerifiedUser] = useState(false);

    useEffect(() => {
        FetchDetails();
    }, []);

    const SignInUser = async (data, history) => {
        setErrorMessages(null);
        setServerError(null);
        if (await SignInFunction(data, setErrorMessages, setServerError)) {
            FetchDetails().then(history.push("/"));
        }
    };

    const SignUpUser = async (data, history) => {
        setErrorMessages(null);
        setServerError(null);
        if (await SignUpFunction(data, setErrorMessages, setServerError)) {
            FetchDetails().then(history.push("/"));
        }
    };

    const UpdateUser = async (data) => {
        setErrorMessages(null);
        setServerError(null);
        setServerSuccess(null);
        if (
            await UpdateFunction(
                data,
                setErrorMessages,
                setServerError,
                setServerSuccess
            )
        ) {
            FetchDetails();
        }
    };

    const DeleteUser = async (history) => {
        if (await DeleteFunction(setServerError)) {
            FetchDetails().then(
                history.push("/"),
                localStorage.removeItem("token"),
                setVerifiedUser(false)
            );
        }
    };

    const FetchDetails = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const userDetails = await UserDetails(token);
            setUserData({
                name: userDetails?.data.user.name,
                email: userDetails?.data.user.email,
                avatar: userDetails?.data.user.avatar,
            });
            setVerifiedUser(true);
        } else {
            setUserData({
                avatar:
                    "//www.gravatar.com/avatar/aaee2964ee764dbc53cea54b81cc996f?s=200&r=pg&d=mm",
            });
        }
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                verifiedUser,
                setVerifiedUser,
                errorMessages,
                serverError,
                setErrorMessages,
                serverSuccess,
                SignInUser,
                SignUpUser,
                UpdateUser,
                DeleteUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
