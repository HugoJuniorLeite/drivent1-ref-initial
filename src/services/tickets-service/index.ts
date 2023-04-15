import { notFoundError } from '@/errors';

import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsAll() {
  const result = await ticketsRepository.all();

  console.log(result, 'retorno find');

  if (!result) {
    throw notFoundError();
  }

  return;
}

const ticketsService = {
  getTicketsAll,
};

export default ticketsService;
