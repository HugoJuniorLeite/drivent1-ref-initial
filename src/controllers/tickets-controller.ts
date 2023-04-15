import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketsAll = await ticketsService.getTicketsById(userId);

    return res.status(httpStatus.OK).send(ticketsAll);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
