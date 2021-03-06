import {
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

export { AuthenticationError, ValidationError, ForbiddenError, UserInputError };
export const InternalError = ApolloError;

export class NotFoundError extends UserInputError {
  constructor(resourceType: string, id?: string) {
    if (id) {
      super(`Couldn't find a ${resourceType} for ${id}`);
    } else {
      super(`Couldn't find that ${resourceType}`);
    }
  }
}

export class UnsubscribedError extends ApolloError {
  constructor(wasSubscribed: boolean = true) {
    super('Your subscription is inactive or has expired.', 'UNSUBSCRIBED', {
      wasSubscribed,
    });
  }
}
