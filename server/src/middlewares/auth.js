import Jwt from 'jsonwebtoken'

export const generateUserToken = async(existingUser) =>{
    const {_id } = existingUser;
    const jwtSecretKey = '9rXq5bF2nS7zQ8';
    const payload = {
        userId: _id,
    }
    const token = Jwt.sign(payload, jwtSecretKey,{ expiresIn: '1h' });
    return token
}

export const decodeToken = async(req, res, next)=>{
    const token = req.header('Authorization').replace('Bearer ', '');
    Jwt.verify(token, '9rXq5bF2nS7zQ8', (err, decodedToken) =>{
        if(err){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.token = decodedToken;
        next();
    } )
}

export const generateAdminToken = async (email) =>{
    const jwtSecretKey = '9rXq5bF2nS7zQ8';
    const token = Jwt.sign(email, jwtSecretKey)
    console.log('adminToken:', JSON.stringify(token));
    return token;
} 