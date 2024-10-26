import jwt from "jsonwebtoken";


// The authMiddleware function is used to verify the token sent by the user. The function checks if the token is valid and if it is, it decodes the token and attaches the user object to the request object. If the token is invalid, the function returns an error message.
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied! Unauthorized user",
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
}