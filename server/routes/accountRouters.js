import express from "express";
import account from "../controllers/accountController";
import accountValid from "../middleware/accountValidation"
const router = express.Router(); accountValid.validateAccountNumber

router.post('/api/v1/accounts',accountValid.createAccountValidation, account.createAccount);
router.patch('/api/v1/account/:accountNumber',accountValid.validateAccountNumber, account.activateDeactivateAccount);
router.delete('/api/v1/accounts/:accountNumber', accountValid.validateAccountNumber, account.accountDelete);
router.get('/api/v1/account/:accountNumber', accountValid.validateAccountNumber, account.findAnAccount);
router.get('/api/v1/account', account.findAllAccounts);

export default router;