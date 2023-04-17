import { invalidDataError, notFoundError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository';

async function filterPaymentsById(id: number) {
  if (!id) {
    throw invalidDataError(null);
  }
  const payment = await paymentsRepository.all(id);

  // console.log(payment,"service")

  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

async function create(ticketTypeId: number) {
  const result = await paymentsRepository.create(ticketTypeId);

  //  console.log(result, 'SERVERCREATE');
  // if (!result) {
  //   throw notFoundError();
  // }

  return result;
}

const paymentsService = {
  filterPaymentsById,
  create,
};

export default paymentsService;
