import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { badRequest, notFoundError } from '@/errors';

export async function getTicketsById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketsAll = await ticketsService.getTicketsById(userId);

    return res.status(httpStatus.OK).send(ticketsAll);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsType = await ticketsService.getTicketsType();

    return res.status(httpStatus.OK).send(ticketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    //ticket type e userId

    const ticket = await ticketsService.createTicket(+ticketTypeId, +userId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === badRequest) {
      return res.sendStatus(400);
    }
    if (error.name === notFoundError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
