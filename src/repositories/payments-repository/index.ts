import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function all(id: number) {
  //  console.log(id, 'all');
  return prisma.payment.findFirst({
    where: { ticketId: id },
  });
}

async function create(id: number) {
  //  console.log(id, 'all');
  // return prisma.payment.create({
  //   data:  ticketId: id ,
  // });
}

const paymentsRepository = {
  all,
  create,
};

export default paymentsRepository;
