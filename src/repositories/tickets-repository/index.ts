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
async function ticketByEnrolment(enrolmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrolmentId,
    },
  });
}

async function getType(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: { id: +ticketTypeId },
  });
}
async function getTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function allType() {
  return prisma.ticketType.findMany();
}

async function create(body: Body) {
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
  ticketByEnrolment,
  getTicketId,
};

export default ticketsRepository;
