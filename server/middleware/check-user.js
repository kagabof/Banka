import jwt from "jsonwebtoken";

class CheckUser{
    checkClient(req, res, next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'secret');
            req.userData = decoded;
            next();
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "you need to login first"
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
                    error: "you need to login as an admin in order have access!"
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "you need to login as an admin in order have access!"
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
                    error: "you need to be login as a staff member in order have access"
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "you need to be login as a staff member in order have access!"
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
                    error: "you need to login as staff member or an admin in order have access!"
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                error: "you need to login as staff member or an admin in order have access!"
            });
        }
    }
    validatePassword(req,res,next) {
        let password = (req.body.password)
        let checkSize = password.split(' ').length;

        if (checkSize === 1 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length > 4){
                next();
            }else{
                return res.status(400).json({
                    status: 400,
                    error: "incorect password format! ex: Fofo1@"
                })
            }

    }
}
const check = new CheckUser();
export default check;