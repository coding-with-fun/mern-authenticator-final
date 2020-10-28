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
        avatar:
            "https://www.gravatar.com/avatar/00000000000000000000000000000000",
    });
    const [errorMessages, setErrorMessages] = useState({
        email: null,
        password: null,
    });
    const [serverError, setServerError] = useState(null);
    const [serverSuccess, setServerSuccess] = useState(null);
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [isRefresh, setIsRefresh] = useState(true);

    useEffect(() => {
        FetchDetails();
    }, []);

    const SignInUser = async (data, history) => {
        setIsRefresh(true);
        setErrorMessages(null);
        setServerError(null);
        if (await SignInFunction(data, setErrorMessages, setServerError)) {
            FetchDetails().then(history.push("/"));
        } else {
            setIsRefresh(false);
        }
    };

    const SignUpUser = async (data, history) => {
        setIsRefresh(true);
        setErrorMessages(null);
        setServerError(null);
        if (await SignUpFunction(data, setErrorMessages, setServerError)) {
            FetchDetails().then(history.push("/"));
        } else {
            setIsRefresh(false);
        }
    };

    const UpdateUser = async (data, history) => {
        setIsRefresh(true);
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
        } else {
            localStorage.removeItem("token");
            setIsRefresh(false);
            setVerifiedUser(false);
            setErrorMessages(null);
            setServerError(null);
            setServerSuccess(null);
            setUserData({
                avatar:
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000",
            });
            history.push("/");
        }
    };

    const DeleteUser = async (history) => {
        setIsRefresh(true);
        if (await DeleteFunction(setServerError)) {
            FetchDetails();
        } else {
            setIsRefresh(false);
        }
        localStorage.removeItem("token");
        setVerifiedUser(false);
        setErrorMessages(null);
        setServerError(null);
        setServerSuccess(null);
        setUserData({
            avatar:
                "https://www.gravatar.com/avatar/00000000000000000000000000000000",
        });
        history.push("/");
    };

    const FetchDetails = async () => {
        setIsRefresh(true);
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
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000",
            });
        }
        setIsRefresh(false);
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
                isRefresh,
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
