import User from "../models/user.js";

export const userInformation = (req, res) => {
    try {
        const decorded = req.decorded;
        const user = User.findById(decorded.userId).select("-password");

        if (!user)
          return res
            .status(404)
            .json({ message: "No user found", success: false });

        return res.status(200).json({
            message: "successful",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server issue" +error,
            success: false
        })
    }
}