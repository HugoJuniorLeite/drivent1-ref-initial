import { ApplicationError } from '@/protocols';

export function notFoundError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'No result for this search!',
  };
}
export function badRequest(): ApplicationError {
  return {
    name: 'BadRequest',
    message: 'Bad Request!',
  };
}
