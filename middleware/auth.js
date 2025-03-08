import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: ' authorization denied, Login Again'
                });
        }
        const token_decode = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(498).json({ success: false, message: error.message });
    }
};

export default authMiddleware;
