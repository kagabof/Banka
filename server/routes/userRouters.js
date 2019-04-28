import express from "express";
import user from "../controllers/userController";
import checkUser from "../middleware/check-user.js";
import userValid from "../middleware/userValidations"
import dotenv from 'dotenv';
import 'babel-polyfill';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./../../swagger.json";

dotenv.config();


const router = express.Router();
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
router.post('/api/v2/auth/signup', userValid.createUserValidation, checkUser.validatePassword, user.createClientNew);
router.post('/api/v2/auth/signup/staff', checkUser.checkAdmin, userValid.createUserValidation, user.createStaffNew);
router.post('/api/v2/auth/signup/admin', checkUser.checkAdmin, userValid.createUserValidation, user.createAdminNew);
router.post('/api/v2/auth/signin', userValid.signInValidation, user.signInNew);
router.delete('/api/v2/auth/:email/delete', checkUser.checkAdmin, user.deleteUser);
export default router;