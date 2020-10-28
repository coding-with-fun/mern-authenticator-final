import React, { useContext } from "react";
import Logo from "../assets/authentication.png";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const { userData, setVerifiedUser } = useContext(UserContext);

    const token = localStorage.getItem("token");
    const history = useHistory();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setVerifiedUser(false);
        history.push("/");
    };

    return (
        <div className="navbar__container">
            <Link to="/" className="logo">
                <img src={Logo} alt="Logo" />
            </Link>
            <div className="dropdown">
                <button className="dropdown-toggle" data-toggle="dropdown">
                    <img src={userData.avatar} alt="Avatar" />
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    {token ? (
                        <>
                            <Link to="/profile" className="dropdown-item">
                                Profile
                            </Link>
                            <div
                                className="dropdown-item signOut"
                                onClick={() => handleSignOut()}
                            >
                                Sign Out
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="dropdown-item">
                                Sign In
                            </Link>
                            <Link to="/signup" className="dropdown-item">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
