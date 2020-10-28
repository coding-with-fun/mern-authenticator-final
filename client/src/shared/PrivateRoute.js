import React from "react";
import { Redirect, Route } from "react-router-dom";

export function AuthenticatedRoute({ children, ...rest }) {
    let isVerified;

    const localToken = localStorage.getItem("token");

    if (localToken) {
        isVerified = true;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isVerified ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export function UnAuthenticatedRoute({ children, ...rest }) {
    let isVerified;

    const localToken = localStorage.getItem("token");

    if (localToken) {
        isVerified = true;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !isVerified ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
