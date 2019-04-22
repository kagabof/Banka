import transaction from "../controllers/transactionController";
import express from "express";
import tansactionValid from "../middleware/transactionValidation";
import transactionValid from "../middleware/transactionValidation";
const router = express.Router();


//router.post('/api/v1/transactions/:account/debit', tansactionValid.debiteCreaditAccountValidation, transaction.debiteAccount);
router.post('/api/v1/transactions/:account/credit', tansactionValid.debiteCreaditAccountValidation, transaction.creditAccount);
router.get('/api/v1/transactions/getall', transaction.getAllTransaction);
router.get('/api/v1/transactions/:accountNumber', transactionValid.validateAccountNumber, transaction.getAllTransactionForAccount);


router.post('/api/v2/transactions/:accountNumber/debit', tansactionValid.debiteCreaditAccountValidation, transaction.debiteAccountNew);
//router.post('/api/v2/transactions/:accountNumber/credit', tansactionValid.debiteCreaditAccountValidation, transaction.creditAccountNew);
export default router;