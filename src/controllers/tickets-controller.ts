import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsAll = await ticketsService.getTicketsAll();

    return res.status(httpStatus.OK).send(ticketsAll);
  } catch (error) {
    console.log(1, 'controller');
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
