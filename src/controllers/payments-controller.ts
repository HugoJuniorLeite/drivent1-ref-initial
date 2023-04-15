import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
//import ticketsService from '@/services/tickets-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    //  const ticketsAll = await ticketsService.getTicketsAll()

    return res.status(httpStatus.OK).send('ok');
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
