import express from "express";
import user from "../controllers/userController";
import checkUser from "../middleware/check-user.js";
import userValid from "../middleware/userValidations"
import dotenv from 'dotenv';
import 'babel-polyfill';
dotenv.config();


const router = express.Router();

//router.get('/api/v1/user/getall', checkUser, user.getAllUsers);
//router.post('/api/v1/auth/signup', userValid.createUserValidation, user.createUser);
//router.post('/api/v1/auth/signin', userValid.signInValidation ,user.signIn);

router.post('/api/v2/auth/signup', userValid.createUserValidation, user.createClientNew);
router.post('/api/v2/auth/signup/staff',checkUser.checkAdmin, userValid.createUserValidation, user.createStaffNew);
router.post('/api/v2/auth/signup/admin', checkUser.checkAdmin, userValid.createUserValidation, user.createAdminNew);
router.post('/api/v2/auth/signin', userValid.signInValidation, user.signInNew);
router.delete('/api/v2/auth/:email/delete', checkUser.checkAdmin, user.deleteUser);
export default router;