import Axios from "axios";

let BASE_URL = "/user";

if (process.env.NODE_ENV !== "production") {
    BASE_URL = process.env.REACT_APP_SERVER_URL + BASE_URL;
}

export const UserSignUp = async (body) => {
    const URL = BASE_URL + "/signup";

    return await Axios.post(URL, body);
};

export const UserSignIn = async (body) => {
    const URL = BASE_URL + "/signin";

    return await Axios.post(URL, body);
};

export const UserUpdate = async (body, token) => {
    const URL = BASE_URL + "/update";
    const headers = {
        "x-auth-token": token,
    };

    return await Axios.patch(URL, body, { headers: headers });
};

export const UserDelete = async (token) => {
    const URL = BASE_URL + "/delete";
    const headers = {
        "x-auth-token": token,
    };

    return await Axios.delete(URL, { headers: headers });
};

export const UserDetails = async (token) => {
    const URL = BASE_URL + "/details";
    const headers = {
        "x-auth-token": token,
    };

    return await Axios.get(URL, { headers: headers });
};
