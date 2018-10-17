import {
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';

export { AuthenticationError, ValidationError, ForbiddenError, UserInputError };

export class NotFoundError extends UserInputError {
  constructor(resourceType, id) {
    if (id) {
      super(`Couldn't find a ${resourceType} for ${id}`);
    } else {
      super(`Couldn't find that ${resourceType}`);
    }
  }
}
