import { notFoundError } from '@/errors';

import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsById(userId: number) {
  const result = await ticketsRepository.all(userId);

  console.log(result, 'retorno find');

  if (!result) {
    throw notFoundError();
  }

  return;
}

const ticketsService = {
  getTicketsById,
};

export default ticketsService;
