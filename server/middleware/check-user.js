import jwt from "jsonwebtoken";

const mid = (req,res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            status: 401,
            error: "user failed"
        });
    } 
};

export default mid;