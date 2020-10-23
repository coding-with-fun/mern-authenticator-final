import {
    UserDelete,
    UserSignIn,
    UserSignUp,
    UserUpdate,
} from "../api/user.api";
import validateCredentials from "../shared/validateCredentials";

export const SignInFunction = async (
    data,
    setErrorMessages,
    setServerError
) => {
    try {
        if (validateCredentials(data, setErrorMessages, "SignIn")) {
            const userData = await UserSignIn({
                email: data.userEmail,
                password: data.userPassword,
            });
            localStorage.setItem("token", userData.data.token);

            return true;
        }
    } catch (error) {
        console.error(error.response);
        setServerError(error.response.data.error[0].msg);
    }
};

export const SignUpFunction = async (
    data,
    setErrorMessages,
    setServerError
) => {
    try {
        if (validateCredentials(data, setErrorMessages, "SignUp")) {
            const userData = await UserSignUp({
                name: data.userName,
                email: data.userEmail,
                password: data.userPassword,
                confirmPassword: data.userConfirmPassword,
            });
            localStorage.setItem("token", userData.data.token);

            return true;
        }
    } catch (error) {
        console.error(error.response);
        setServerError(error.response.data.error[0].msg);
    }
};

export const UpdateFunction = async (
    data,
    setErrorMessages,
    setServerError,
    setServerSuccess
) => {
    try {
        const token = localStorage.getItem("token");
        if (validateCredentials(data, setErrorMessages, "UpdateProfile")) {
            const userData = await UserUpdate(
                {
                    name: data.userName.trim(),
                    email: data.userEmail,
                },
                token
            );
            localStorage.setItem("token", userData.data.token);
            setServerSuccess("Profile updated successfully!!");

            return true;
        }
    } catch (error) {
        console.error(error.response);
        setServerError(error.response.data.error[0].msg);
    }
};

export const DeleteFunction = async (setServerError) => {
    try {
        const token = localStorage.getItem("token");
        await UserDelete(token).then(localStorage.removeItem("token"));

        return true;
    } catch (error) {
        console.error(error.response);
        setServerError(error.response.data.error[0].msg);
    }
};
