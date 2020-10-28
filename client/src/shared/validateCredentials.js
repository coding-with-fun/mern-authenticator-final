import validateEmail from "./validateEmail";

const validateCredentials = (data, setErrorMessages, type) => {
    if (!validateEmail(data.userEmail)) {
        setErrorMessages({ email: "Please enter a valid email address." });
        return false;
    } else {
        if (type === "UpdateProfile") {
            if (!data.userName) {
                setErrorMessages({
                    name: "Please enter a user name.",
                });
                return false;
            }
        } else {
            if (data.userPassword.length < 5) {
                setErrorMessages({
                    password: "Password must be at least 5 chars long.",
                });
                return false;
            } else {
                if (type === "SignUp") {
                    if (!data.userName) {
                        setErrorMessages({
                            name: "Please enter a user name.",
                        });
                        return false;
                    } else {
                        if (data.userConfirmPassword.length < 5) {
                            setErrorMessages({
                                confirmPassword:
                                    "Confirmation password must be at least 5 chars long.",
                            });
                            return false;
                        } else {
                            if (
                                data.userPassword !== data.userConfirmPassword
                            ) {
                                setErrorMessages({
                                    password: "Passwords does not match.",
                                });
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    return true;
};

export default validateCredentials;
