import express from "express";
import user from "../controllers/userController";
import checkUser from "../middleware/check-user.js";
import userValid from "../middleware/userValidations"
const router = express.Router();

router.get('/api/v1/user/getall', checkUser, user.getAllUsers);
router.post('/api/v1/auth/signup', userValid.createUserValidation, user.createUser);
router.post('/api/v1/auth/signin', userValid.signInValidation ,user.signIn);
export default router;