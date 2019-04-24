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
            return res.status(403).json({
                status: 403,
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
    validatePassword(req,res,next) {
        let pws = (req.body.password)
        var pw = pws.trim();
        if (/[A-Z]/.test(pw) &&
            /[a-z]/.test(pw) &&
            /[0-9]/.test(pw) &&
                /[^A-Za-z0-9]/.test(pw) &&
            pw.length > 4){
                next();
            }else{
                return res.status(400).json({
                    status: 400,
                    error: "incorect password format"
                })
            }

    }
}
const check = new CheckUser();
export default check;