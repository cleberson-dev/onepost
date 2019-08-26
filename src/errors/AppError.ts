abstract class AppError<T> {
  protected _name: string;

  protected _status: number;

  protected _type: T;

  public message: string;

  public constructor(name: string, type: T, message: string) {
    this._name = name;
    this.message = message;
    this._type = type;
    this._status = 400;
  }

  protected abstract delegateStatusCode(): void;

  public get name(): string {
    return this._name;
  }

  public get status(): number {
    return this._status;
  }
};

export default AppError;
