import transaction from "../controllers/transactionController";
import express from "express";
import tansactionValid from "../middleware/transactionValidation";
import transactionValid from "../middleware/transactionValidation";
import checkUser from "../middleware/check-user";
const router = express.Router();


router.post('/api/v2/transactions/:accountNumber/debit',checkUser.chechStaff, tansactionValid.debiteCreaditAccountValidation, transaction.debiteAccountNew);
router.post('/api/v2/transactions/:accountNumber/credit', checkUser.chechStaff, tansactionValid.debiteCreaditAccountValidation, transaction.creditAccountNew);
router.get('/api/v2/accounts/:accountNumber/transactions',checkUser.checkClient, transactionValid.validateAccountNumber, transaction.getAllTransactionForAnAccount);
router.get('/api/v2/accounts/:accountNumber/transactions/:transactionId',checkUser.checkClient, transactionValid.validateAccountNumberAndTransactionId, transaction.getAllTransactionForAnAccountSpecificTransaction);
export default router;