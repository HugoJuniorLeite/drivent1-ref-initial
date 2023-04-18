import { badRequest, invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function filterPaymentsById(id: number, userId: number) {
  if (!id) {
    throw badRequest();
  }

  const getTicket = await ticketsRepository.getTicketId(+id);

  const enrollmentId = await enrollmentRepository.getEnrolment(+getTicket.enrollmentId);

  // const enrolmentId = enrollmentRepository.getEnrolment(+id);
  // console.log(enrolmentId, "enrolmenttttttttttttttttttt");

  // const result = enrollmentRepository.findWithAddressByUserId((await enrolmentId).userId);
  // if(!result){
  //   throw unauthorizedError()
  // }
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
