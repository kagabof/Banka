import jwt from "jsonwebtoken";

const mid = (req,res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        const email = decoded.emails;
        console.log(`find ${email} .......`);
        next();
    } catch(error) {
        return res.status(401).json({
            status: 401,
            error: "user failed"
        });
    }
};

export default mid;