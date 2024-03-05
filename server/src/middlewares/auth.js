import Jwt from 'jsonwebtoken'

export const generateUserToken = async(existingUser) => {
    try {
        const {_id } = existingUser;
        // console.log("id on auth",_id)
        const payload = {
            userId: _id,
        }
        const token = Jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '3h' });
        return token;
    } catch (error) {
        console.error("Error generating user token:", error);
        throw new Error("Failed to generate user token");
    }
}


export const decodeToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        Jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.token = decodedToken;
            next();
        });
    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const generateAdminToken = async (email) => {
    try {
        const token = Jwt.sign(email, process.env.JWT_KEY);
        console.log('adminToken:', JSON.stringify(token));
        return token;
    } catch (error) {
        console.error("Error generating admin token:", error);
        throw new Error("Failed to generate admin token");
    }
}



export const isAuthenticated =(req, res, next) => {

    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler("Please Login to Access", 401));
    }

    const decodedData = Jwt.verify(token, process.env.JWT_KEY);
    req.user = User.findById(decodedData.id);
    next();
}