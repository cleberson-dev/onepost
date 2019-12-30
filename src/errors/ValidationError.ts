import AppError from './AppError';

export enum ValidationErrors {
  DuplicateValue = 'DUPLICATE_VALUE',
  MissingParameter = 'MISSING_PARAMETER',
  OutOfRange = 'OUT_OF_RANGE',
  InvalidType = 'INVALID_TYPE',
  PasswordsDontMatch = 'PASSWORDS_DONT_MATCH',
  IncorrectUsernamePassword = 'INCORRECT_USERNAME_PASSWORD',
  ValidationError = 'VALIDATION_ERROR'
}

interface FieldError {
  name: string;
  message: string;
}

class ValidationError extends AppError {
  private _fields: FieldError[];

  public constructor(type: ValidationErrors, fields: FieldError[]) {
    super('ValidationError', type, 'Erro de Validação');
    this.delegateStatusCode();
    this._fields = fields;
  }

  public get fields(): FieldError[] {
    return this._fields;
  }

  protected delegateStatusCode(): void {
    switch (this._type) {
      default:
        this._status = 400;
    }
  }
};

export default ValidationError;
