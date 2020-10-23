// For users related stuffs.

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");

require("colors");
require("dotenv").config();

const router = express.Router();
const User = require("../models/User");
const userAuth = require("../middleware/auth");

/**
 * @route         POST /user/signup
 * @description   Register user
 * @access        Public
 */
router.post(
    "/signup",
    [
        check("name", "Name is required.").notEmpty(),
        check("email", "Please include a valid email.").isEmail(),
        check("password")
            .notEmpty()
            .withMessage("Please enter password.")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 5 chars long."),
        check("confirmPassword")
            .notEmpty()
            .withMessage("Please enter confirmation password.")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 5 chars long."),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    error: errors.array(),
                });
            }

            const { name, email, password, confirmPassword } = req.body;

            // TODO Confirm passwords
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: false,
                    error: [
                        {
                            msg: "Passwords do not match.",
                        },
                    ],
                });
            }

            // TODO Check if user exists
            const existingUser = await User.findOne({
                email,
            });
            if (existingUser) {
                return res.status(400).json({
                    status: false,
                    error: [
                        {
                            msg: "User already exists.",
                        },
                    ],
                });
            }

            // TODO Encrypt password
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            // TODO Get Gravatar URL
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });

            const newUser = new User({
                name,
                email,
                avatar,
                password: hashPassword,
            });

            // * Save new user
            await newUser.save();

            // TODO Return JWT
            const payload = {
                user: {
                    id: newUser._id,
                },
            };
            jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
                if (error) throw error;

                return res.status(200).json({
                    status: true,
                    token,
                    success: [
                        {
                            msg: "User created successfully.",
                        },
                    ],
                });
            });
        } catch (error) {
            console.log(`${error.message}`.red);
            return res.status(500).json({
                status: false,
                error: [
                    {
                        msg: "Internal server error!!",
                    },
                ],
            });
        }
    }
);

/**
 * @route         POST /user/signin
 * @description   Sign in for user
 * @access        Public
 */
router.post(
    "/signin",
    [
        check("email", "Please include a valid email.").isEmail(),
        check("password")
            .notEmpty()
            .withMessage("Please enter password.")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 chars long."),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    error: errors.array(),
                });
            }

            const { email, password } = req.body;

            // TODO Check if user exists
            const existingUser = await User.findOne({
                email,
            });

            if (!existingUser) {
                return res.status(400).json({
                    status: false,
                    error: [
                        {
                            msg: "User does not exist.",
                        },
                    ],
                });
            }

            // TODO Verify credentials
            const verifyUser = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!verifyUser) {
                return res.status(400).json({
                    status: false,
                    error: [
                        {
                            msg: "Invalid credentials.",
                        },
                    ],
                });
            }

            // TODO Return JWT
            const payload = {
                user: {
                    id: existingUser._id,
                },
            };
            jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
                if (error) throw error;

                return res.status(200).json({
                    status: true,
                    token,
                    success: [
                        {
                            msg: "User signed in successfully.",
                        },
                    ],
                });
            });
        } catch (error) {
            console.log(`${error.message}`.red);
            return res.status(500).json({
                status: false,
                error: [
                    {
                        msg: "Internal server error!!",
                    },
                ],
            });
        }
    }
);

/**
 * @route         PATCH /user/update
 * @description   Update user
 * @access        Private
 */
router.patch("/update", userAuth, async (req, res) => {
    try {
        const userID = req.user.id;
        const updates = req.body;
        const options = {
            new: true,
        };

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            updates,
            options
        );

        const payload = {
            user: {
                id: updatedUser._id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
            if (error) throw error;

            return res.status(200).json({
                status: true,
                token,
                success: [
                    {
                        msg: "User updated successfully.",
                    },
                ],
            });
        });
    } catch (error) {
        console.log(`${error.message}`.red);
        return res.status(500).json({
            status: false,
            error: [
                {
                    msg: "Internal server error!!",
                },
            ],
        });
    }
});

/**
 * @route         DELETE /user/delete
 * @description   Delete user
 * @access        Private
 */
router.delete("/delete", userAuth, async (req, res) => {
    try {
        const userID = req.user.id;

        await User.findByIdAndDelete(userID);

        return res.status(200).json({
            status: true,
            success: [
                {
                    msg: "User deleted successfully.",
                },
            ],
        });
    } catch (error) {
        console.log(`${error.message}`.red);
        return res.status(500).json({
            status: false,
            error: [
                {
                    msg: "Internal server error!!",
                },
            ],
        });
    }
});

/**
 * @route         GET /user/details
 * @description   Get user details
 * @access        Private
 */
router.get("/details", userAuth, async (req, res) => {
    try {
        const userID = req.user.id;

        const existingUser = await User.findById(userID);

        return res.status(200).json({
            status: true,
            user: {
                name: existingUser.name,
                email: existingUser.email,
                avatar: existingUser.avatar,
            },
            success: [
                {
                    msg: "Fetched user's details successfully.",
                },
            ],
        });
    } catch (error) {
        console.log(`${error.message}`.red);
        return res.status(500).json({
            status: false,
            error: [
                {
                    msg: "Internal server error!!",
                },
            ],
        });
    }
});

module.exports = router;
