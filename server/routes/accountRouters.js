import express from "express";
import account from "../controllers/accountController";
import accountValid from "../middleware/accountValidation"
import checkUser from "../middleware/check-user";
const router = express.Router(); accountValid.validateAccountNumber

//router.post('/api/v1/accounts',accountValid.createAccountValidation, account.createAccount);
//router.patch('/api/v1/account/:accountNumber',accountValid.validateAccountNumber, account.activateDeactivateAccount);
//router.delete('/api/v1/accounts/:accountNumber', accountValid.validateAccountNumber, account.accountDelete);
//router.get('/api/v1/account/:accountNumber', accountValid.validateAccountNumber, account.findAnAccount);
//router.get('/api/v1/account', account.findAllAccounts);

router.patch('/api/v2/account/:accountNumber', accountValid.validateAccountNumber, account.activateDeactivateAccountNew);
router.post('/api/v2/accounts', accountValid.createAccountValidation, account.createAccountNew);
router.delete('/api/v2/accounts/:accountNumber', accountValid.validateAccountNumber, account.accountDeleteNew);
router.get('/api/v2/account/:accountNumber', checkUser, account.findAccountDetails);
router.get('/api/v2/user/:email/accounts', accountValid.validateEmail, account.findAllAccountOfUser);
router.get('/api/v2/accounts', account.findAllAccounts);
export default router;