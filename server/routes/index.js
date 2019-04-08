import express from "express";
import user from "./../controllers/userController";
import account from "./../controllers/accountController";
import transaction from "./../controllers/transactionController";

const router = express.Router();

router.post('/api/v1/signup', user.createUser);
router.post('/api/v1/signin', user.signIn);
router.post('/api/v1/createAccount', account.createAccount);
router.patch('/api/v1/activateDeactivateAccount', account.activateDeactivateAccount);
router.delete('/api/v1/accountDelete/:id', account.accountDelete);
router.post('/api/v1/:account/debit', transaction.debiteAccount);
router.post('/api/v1/:account/credit', transaction.creditAccount);
export default router;
