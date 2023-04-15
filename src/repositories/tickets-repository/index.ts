import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function all(/*data: Prisma.SessionUncheckedCreateInput*/) {
  console.log('teste2');

  return prisma.ticket.findMany();
}

const ticketsRepository = {
  all,
};

export default ticketsRepository;
