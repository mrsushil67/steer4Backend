const jwt = require('jsonwebtoken');

const authorizedUser = async(req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ status: "401", message: "Token not provided" });
    }

    if (!process.env.JWTSECRET) {
        return res.status(500).json({ status: "500", message: "Server configuration error: JWT_SECRET is missing" });
    }

    try {
        const user = jwt.verify(token, process.env.JWTSECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: "401", message: "Invalid token for access" });
    }
}

module.exports = {
    authorizedUser,
}