const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
//this is a middleware where we will be checking admin is logged in or not for protected routes that should be accessible  
//only if the admin is logged in to the system

const authenticate = (req, res, next) => {
    const token = req.cookies.authToken; // Get token from cookie
    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized access. No token found." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            const message =
                err.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid token.';
            return res.status(403).json({ error: message });
        }
        req.user = user; // Attach user info to the request object
        next();
    });
};

module.exports =  authenticate;