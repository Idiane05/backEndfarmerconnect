import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(400).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error decoding token', error: error.message });
    }
}

export default authMiddleware;
