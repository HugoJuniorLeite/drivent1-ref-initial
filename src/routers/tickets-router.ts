import { Router } from 'express';
import { createTicket, getTicketsById, getTicketsType } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getTicketsById)
  .get('/types', getTicketsType)
  .post('/', createTicket);

export { ticketsRouter };
