import express from "express";
import user from "./../controllers/userController";
import account from "./../controllers/accountController";

const router = express.Router();

router.post('/api/v1/signup', user.createUser);
router.post('/api/v1/signin', user.signIn);
router.post('/api/v1/createAccount', account.createAccount);


export default router;
