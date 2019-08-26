import AppError from './AppError';

export enum ValidationErrors {
  DuplicateValue = 'DUPLICATE_VALUE',
  MissingParameter = 'MISSING_PARAMETER',
  OutOfRange = 'OUT_OF_RANGE',
  InvalidType = 'INVALID_TYPE',
  PasswordsDontMatch = 'PASSWORDS_DONT_MATCH'
}

class ValidationError extends AppError<ValidationErrors> {
  public constructor(type: ValidationErrors, message: string) {
    super('ValidationError', type, message);
    this.delegateStatusCode();
  }

  protected delegateStatusCode(): void {
    switch (this._type) {
      default:
        this._status = 400;
    }
  }
};

export default ValidationError;
