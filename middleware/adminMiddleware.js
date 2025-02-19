// middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(403).json({ message: 'No API key provided' });
    }

    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: 'Invalid API key' });
    }

    next();
};

module.exports = adminMiddleware;
