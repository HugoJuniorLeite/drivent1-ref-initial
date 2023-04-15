import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function all(userId: number) {
  console.log('teste2');

  return prisma.ticket.findFirst({
    where: { id: userId },
  });
}

const ticketsRepository = {
  all,
};

export default ticketsRepository;
