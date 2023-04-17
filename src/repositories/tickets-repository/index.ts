import { prisma } from '@/config';
import { Body } from '@/protocols';
//import { object } from 'joi';

async function all(id: number) {
  //  console.log(id, 'all');
  return prisma.ticket.findFirst({
    where: { enrollmentId: id },
    include: {
      TicketType: true,
    },
  });
}
async function getType(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: { id: +ticketTypeId },
  });
}

async function allType() {
  return prisma.ticketType.findMany();
}

async function create(body: Body) {
  console.log(body, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

  return prisma.ticket.create({
    data: {
      ...body,
      status: 'RESERVED',
    },
  });
}

const ticketsRepository = {
  all,
  allType,
  create,
  getType,
};

export default ticketsRepository;
