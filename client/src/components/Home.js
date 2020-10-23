import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const { userData, verifiedUser } = useContext(UserContext);

    return (
        <div className="home__container">
            Hello {verifiedUser ? userData?.name : "Guest!!"}
        </div>
    );
};

export default Home;
