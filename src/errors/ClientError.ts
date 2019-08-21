import AppError from './AppError';

export enum ClientErrors {
  NotFound = 'NOT_FOUND',
  NotThePostOwner = 'NOT_POST_OWNER',
  InvalidUsernamePassword = 'INVALID_USERNAME_PASSWORD',
  InvalidToken = 'INVALID_TOKEN',
  TokenRequired = 'TOKEN_REQUIRED',
  MalformedRequest = 'MALFORMED_REQUEST',
  AlreadyPosted = 'ALREADY_POSTED'
};

class ClientError extends AppError<ClientErrors> {
  public constructor(type: ClientErrors, message: string) {
    super(type, message);
    this.delegateStatusCode();
    this._name = 'ClientError';
  }

  protected delegateStatusCode(): void {
    switch (this._type) {
      case ClientErrors.NotFound:
        this._status = 404;
        break;
      case ClientErrors.NotThePostOwner:
        this._status = 403;
        break;
      case ClientErrors.InvalidUsernamePassword:
      case ClientErrors.InvalidToken:
      case ClientErrors.TokenRequired:
        this._status = 401;
        break;
      case ClientErrors.MalformedRequest:
      case ClientErrors.AlreadyPosted:
      default:
        this._status = 400;
    }
  }
}

export default ClientError;
