import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function all(id: number) {
  console.log(id, 'all');
  return prisma.ticket.findFirst({
    where: { enrollmentId: id },
    include: {
      TicketType: true,
    },
  });
}

async function allType() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  all,
  allType,
};

export default ticketsRepository;
