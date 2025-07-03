import e from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const TOKEN_SECRET = process.env.TOKEN_SECRET || "q2Gj72jshS8@d!48sjdD12kdsA";

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(username + email + password)

        const user = await User.findOne({ email });

        if (user) {
          return res.status(401).json({
            message: "User already exists",
            success: false,
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({
            message: "success",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
                success: false,
            });
        }

        console.log(TOKEN_SECRET);
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      TOKEN_SECRET,
      { expiresIn: "2d" }
    );

        
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token
    });

      } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error,
            success: false,
        });
       
      }
    }

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
          return res.status(404).json({
            message: "there is no token exit",
            success: false,
          });
        }

        res.clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        return res.status(200).json({
          message: "logout successfuly",
          success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error !!",
            success: false
        })
    }
}
