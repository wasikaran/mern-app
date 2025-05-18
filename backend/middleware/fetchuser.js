const jwt = require('jsonwebtoken');
const JWT_SECRET = '$wasiisabadassboy$';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    console.log("📌 Token received in header:", token);

    if (!token) {
        console.log("❌ No token received");
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log("✅ Token verified, user ID:", data.user.id);
        next();
    } catch (error) {
        console.log("❌ Token verification failed", error.message);
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }
};

module.exports = fetchuser;
