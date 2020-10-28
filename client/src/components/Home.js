import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const { userData, verifiedUser, isRefresh } = useContext(UserContext);

    return isRefresh ? (
        <div className="spinner__container">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ) : (
        <div className="home__container">
            <>
                Hello {verifiedUser ? userData?.name : "Guest"}!!
                {verifiedUser ? null : (
                    <div className="home__link_to_signin">
                        Please <Link to="/signin">sign in</Link> to continue...
                    </div>
                )}
            </>
        </div>
    );
};

export default Home;
