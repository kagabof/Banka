import express from "express";
import account from "../controllers/accountController";

const router = express.Router();

router.post('/api/v1/accounts', account.createAccount);
router.patch('/api/v1/account/:accountNumber', account.activateDeactivateAccount);
router.delete('/api/v1/accounts/:accountNumber', account.accountDelete);
router.get('/api/v1/account/:accountNumber', account.findAnAccount);
router.get('/api/v1/account', account.findAllAccounts);

export default router;