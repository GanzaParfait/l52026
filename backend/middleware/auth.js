const jwt = require('jsonwebtoken');

const JWT_SECRET = "l52026_secret_key"; // In production, use environment variables

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token from "Bearer {token}"
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
}