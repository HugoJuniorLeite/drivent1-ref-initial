import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const id = +ticketId;

  console.log(id, typeof id, 'id');
  console.log(ticketId, 'ticketId getPayments');
  try {
    const paymentsById = await paymentsService.filterPaymentsById(id);

    console.log(paymentsById);
    return res.status(httpStatus.OK).send(paymentsById);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;
  console.log(ticketTypeId, 'ticketId', userId, 'userId');
  try {
    const ticket = await paymentsService.create(ticketTypeId);

    return res.status(httpStatus.OK).send(createPayment);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
