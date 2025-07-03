import jwt from 'jsonwebtoken'
import User from '../models/user';

const TOKEN_SECRET = process.env.TOKEN_SECRET || "q2Gj72jshS8@d!48sjdD12kdsA";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message:"No token provided",success: false });

    try {
        const decorded = jwt.verify(token, TOKEN_SECRET);
        req.decorded = decorded
        next()
    } catch (error) {
        return res.status(401).json({message: "Invalid token", success: false})
    }
}