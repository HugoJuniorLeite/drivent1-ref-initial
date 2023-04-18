import { NOTFOUND } from 'dns';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { badRequest } from '@/errors';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const id = +ticketId;
  const { userId } = req;
  const user_id = +userId;
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const paymentsById = await paymentsService.filterPaymentsById(id, user_id);

    return res.status(httpStatus.OK).send(paymentsById);
  } catch (error) {
    if (error.name === 'BadRequest') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'NotFoundError') {
      console.log(error.name, 'errorrrrrrrrrrrrrrrrr');

      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    const ticket = await paymentsService.create(ticketTypeId);

    return res.status(httpStatus.OK).send(createPayment);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
