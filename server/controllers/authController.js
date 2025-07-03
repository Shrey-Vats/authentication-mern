import e from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

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

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

      } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
      }
    }