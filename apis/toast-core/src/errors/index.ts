import {
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';

export { AuthenticationError, ValidationError, ForbiddenError, UserInputError };

export class NotFoundError extends UserInputError {
  constructor(resourceType: string, id?: string) {
    if (id) {
      super(`Couldn't find a ${resourceType} for ${id}`);
    } else {
      super(`Couldn't find that ${resourceType}`);
    }
  }
}
