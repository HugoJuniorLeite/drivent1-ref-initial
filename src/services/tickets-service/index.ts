//import { TicketStatus } from '@prisma/client';
//import { BAD_REQUEST } from 'http-status';
//import { number, object } from 'joi';
import httpStatus from 'http-status';
import enrollmentsService from '../enrollments-service';
import { badRequest, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Body } from '@/protocols';

async function getTicketsById(userId: number) {
  const enrollments = await enrollmentsService.getOneWithAddressByUserId(userId);

  //  console.log(enrollments.id, 'id sem descontruir');

  if (!enrollments.id) {
    throw notFoundError();
  }

  const result = await ticketsRepository.all(enrollments.id);

  //  console.log(result, 'getTicket');
  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicketsType() {
  const result = await ticketsRepository.allType();

  //  console.log(result, 'getType');
  if (!result) {
    //   console.log('caiu no if');
    throw notFoundError();
  }

  return result;
}

async function createTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) {
    return httpStatus.BAD_REQUEST;
  }

  const getEnrollmentId = await enrollmentRepository.findWithAddressByUserId(+userId);
  if (!getEnrollmentId) {
    throw badRequest();
  }

  const body = {
    ticketTypeId: +ticketTypeId,
    enrollmentId: +getEnrollmentId.id,
  } as Body;

  if (!body.ticketTypeId) {
    throw badRequest();
  }
  const ticketType = await ticketsRepository.allType();

  const ticketId = await ticketsRepository.create(body);

  const ticketT = await ticketsRepository.getType(Number(ticketId.ticketTypeId));

  if (!ticketType) {
    throw badRequest();
  }
  const response = {
    id: ticketId.id,
    status: ticketId.status,
    ticketTypeId: ticketId.ticketTypeId,
    enrollmentId: ticketId.enrollmentId,
    TicketType: { ...ticketT },
    createdAt: ticketId.createdAt,
    updatedAt: ticketId.updatedAt,
  };

  return response;
  // const result = await ticketsRepository.all(ticketTypeId);

  // console.log(result, 'SERVERCREATE');
  // if (result) {
  //   throw notFoundError();
  // }

  //const enrollments = await enrollmentsService.getOneWithAddressByUserId(userId);

  // const object = {
  //   ticketTypeId,
  //   enrollmentsId: getEnrollmentId.id,
  //   status = TicketStatus.RESERVED
  // };

  // const result1 = await ticketsRepository.create(object);

  // console.log(result1, 'create');

  // if (!result) {
  //   console.log('caiu no if create');
  //   throw notFoundError();
  // }

  //return result1;
}

const ticketsService = {
  getTicketsById,
  getTicketsType,
  createTicket,
};

export default ticketsService;
