import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.json({ success: false, message: 'Invalid token' });
    }
}

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        User.findById(decoded.id).then(user => {
            if (!user || user.role !== 'admin') {
                return res.json({ success: false, message: 'Admin access required' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.json({ success: false, message: 'Invalid token' });
    }
}

export { auth, adminAuth };