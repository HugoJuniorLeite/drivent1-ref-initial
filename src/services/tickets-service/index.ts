import enrollmentsService from '../enrollments-service';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsById(userId: number) {
  const enrollments = await enrollmentsService.getOneWithAddressByUserId(userId);

  console.log(enrollments.id, 'id sem descontruir');

  // if (!enrollments.id) {
  //   console.log('caiu no if do ticket');
  //   throw notFoundError();
  // }

  const result = await ticketsRepository.all(enrollments.id);

  console.log(result, 'getTicket');
  if (!result) {
    console.log('caiu no if do ticket');
    throw notFoundError();
  }

  return result;
}

async function getTicketsType() {
  const result = await ticketsRepository.allType();

  console.log(result, 'getType');
  if (!result) {
    console.log('caiu no if');
    throw notFoundError();
  }

  return result;
}

const ticketsService = {
  getTicketsById,
  getTicketsType,
};

export default ticketsService;
