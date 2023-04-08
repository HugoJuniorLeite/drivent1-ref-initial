import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest, authenticateToken } from '@/middlewares';
import enrollmentsService from '@/services/enrollments-service';
import { Cep, Test } from '@/protocols';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  const dados = req.body;
  const userId: number = req.userId;

  const params = { userId, ...dados };

  try {
    await enrollmentsService.createOrUpdateEnrollmentWithAddress(params);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const cep = req.query as Cep;

  try {
    const address = await enrollmentsService.getAddressFromCEP(cep);

    return res.status(httpStatus.OK).send({
      bairro: address.bairro,
      cidade: address.localidade,
      complemento: address.complemento,
      logradouro: address.logradouro,
      uf: address.uf,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }
}
