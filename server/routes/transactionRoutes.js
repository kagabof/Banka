import transaction from "./../controllers/transactionController";
import express from "express";
const router = express.Router();


router.post('/api/v1/transactions/:account/debit', transaction.debiteAccount);
router.post('/api/v1/transactions/:account/credit', transaction.creditAccount);
router.get('/api/v1/transactions/getall', transaction.getAllTransaction);
router.get('/api/v1/transactions/:accountNumber', transaction.getAllTransactionFoAccount);

export default router;