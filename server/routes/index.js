import express from "express";
import user from "./../controllers/userController";

const router = express.Router();

router.post('/api/v1/signup', user.createUser);
router.post('/api/v1/signin', user.signIn);

export default router;
