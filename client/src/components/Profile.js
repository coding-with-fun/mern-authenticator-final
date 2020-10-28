import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const {
        UpdateUser,
        DeleteUser,
        userData,
        errorMessages,
        serverError,
        serverSuccess,
        isRefresh,
    } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateUser({ userName, userEmail }, history).then(
            setUserName(""),
            setUserEmail("")
        );
    };

    const handleDelete = (e) => {
        e.preventDefault();
        DeleteUser(history);
    };

    useEffect(() => {
        setUserName(userData.name);
        setUserEmail(userData.email);
    }, [userData]);

    return (
        <div className="update__container">
            {isRefresh ? (
                <div className="spinner__container">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="update__body">
                    <div className="heading">Update Profile</div>
                    <hr />
                    {(serverError || serverSuccess) &&
                        (serverSuccess ? (
                            <div className="alert alert-success" role="alert">
                                {serverSuccess}
                            </div>
                        ) : (
                            <div className="alert alert-danger" role="alert">
                                {serverError}
                            </div>
                        ))}
                    <div className="img__container">
                        <img
                            src={userData.avatar || `../shared/Default.jpg`}
                            alt="Avatar"
                        />
                    </div>
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
                    </form>
                    <div className="btn__container update_btn__container">
                        <button
                            className="delete_btn"
                            onClick={(e) => handleDelete(e)}
                        >
                            Delete
                        </button>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            disabled={
                                userName === userData.name &&
                                userEmail === userData.email
                                    ? true
                                    : false
                            }
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
