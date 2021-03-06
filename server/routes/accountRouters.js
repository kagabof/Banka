import express from "express";
import account from "../controllers/accountController";
import accountValid from "../middleware/accountValidation"
import checkUser from "../middleware/check-user";
const router = express.Router(); accountValid.validateAccountNumber


router.patch('/api/v2/account/:accountNumber',checkUser.checkStaffOrAdmin, accountValid.validateAccountNumber, account.activateDeactivateAccountNew);
router.post('/api/v2/accounts', checkUser.checkClient, accountValid.createAccountValidation, account.createAccountNew);
router.delete('/api/v2/accounts/:accountNumber',checkUser.checkStaffOrAdmin, accountValid.validateAccountNumber, account.accountDeleteNew);
router.get('/api/v2/account/:accountNumber', checkUser.checkClient,accountValid.validateAccountNumber, account.findAccountDetails);
router.get('/api/v2/user/:email/accounts', checkUser.checkStaffOrAdmin, accountValid.validateEmail, account.findAllAccountOfUser);
router.get('/api/v2/accounts', checkUser.checkStaffOrAdmin, account.findAllAccounts);
export default router;