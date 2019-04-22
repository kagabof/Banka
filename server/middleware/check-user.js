import jwt from "jsonwebtoken";
import newdb from "../db/db";

class CheckUser{
    checkClient(req, res, next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'secret');
            req.userData = decoded;
            const email = decoded.emails;
            console.log(`find ${email} .......`);
            next();
        } catch (error) {
            return res.status(401).json({
                status: 401,
                error: "user failed"
            });
        }
    }

    checkAdmin(req,res, next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'secret');
            req.userData = decoded;

            if (decoded.isadmin === true) {
                next();
            }else{
                return res.status(403).json({
                    status: 403,
                    error: "you need to be an admin in order have access"
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "login or signup first!"
            });
        }
        
    }
    chechStaff(req,res, next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'secret');
            req.userData = decoded;

            if (decoded.type === "staff") {
                next();
            } else {
                return res.status(403).json({
                    status: 403,
                    error: "you need to be a staff member in order have access"
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "login or signup first!"
            });
        }
        
    }
    checkStaffOrAdmin(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'secret');
            req.userData = decoded;

            if (decoded.type === "staff" || decoded.isadmin=== true) {
                next();
            } else {
                return res.status(403).json({
                    status: 403,
                    error: "you need to be a staff member or an admin in order have access"
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "login or signup first!"
            });
        }
    }
}
const check = new CheckUser();
export default check;