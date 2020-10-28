import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignIn = () => {
    const { SignInUser, errorMessages, serverError } = useContext(UserContext);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        SignInUser({ userEmail, userPassword }, history).then(
            setUserEmail(""),
            setUserPassword("")
        );
    };

    return (
        <div className="signIn__container">
            <div className="signIn__body">
                <div className="heading">Sign In</div>
                <hr />
                {serverError && (
                    <div className="alert alert-danger" role="alert">
                        {serverError}
                    </div>
                )}
                <form>
                    <div className="form-group">
                        <label htmlFor="userEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="userEmail"
                            aria-describedby="emailHelp"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            autoFocus
                        />
                        <small id="emailHelp" className="form-text">
                            {errorMessages?.email}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="userPassword"
                            aria-describedby="passwordHelp"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <small id="passwordHelp" className="form-text">
                            {errorMessages?.password}
                        </small>
                    </div>
                </form>
                <div className="btn__container">
                    <button onClick={(e) => handleSubmit(e)}>Sign In</button>
                </div>
                <div className="path_to_signin">
                    Do not have a account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
