import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
    const { SignUpUser, errorMessages, serverError } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        SignUpUser(
            { userName, userEmail, userPassword, userConfirmPassword },
            history
        ).then(
            setUserName(""),
            setUserEmail(""),
            setUserPassword(""),
            setUserConfirmPassword("")
        );
    };

    return (
        <div className="signUp__container">
            <div className="signUp__body container">
                <div className="heading">Sign Up</div>
                <hr />
                {serverError && (
                    <div className="alert alert-danger" role="alert">
                        {serverError}
                    </div>
                )}
                <form>
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="displayName"
                            aria-describedby="nameHelp"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            autoFocus
                        />
                        <small id="nameHelp" className="form-text">
                            {errorMessages?.name}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="userEmail"
                            aria-describedby="emailHelp"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            aria-describedby="confirmPasswordHelp"
                            value={userConfirmPassword}
                            onChange={(e) =>
                                setUserConfirmPassword(e.target.value)
                            }
                        />
                        <small id="confirmPasswordHelp" className="form-text">
                            {errorMessages?.confirmPassword}
                        </small>
                    </div>
                </form>
                <div className="btn__container">
                    <button onClick={(e) => handleSubmit(e)}>Sign Up</button>
                </div>
                <div className="path_to_signin">
                    Already have a account? <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
