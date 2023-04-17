import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createPayment, getPayments } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayments).post('/process', createPayment);

export { paymentsRouter };
