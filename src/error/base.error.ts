export abstract class BaseError<T> extends Error {
  code: T;
  errorDescription: string | undefined;

  protected constructor(
    code: T,
    _enum: Record<any, any>,
    description?: string
  ) {
    super(_enum[code]);
    this.code = code;
    this.errorDescription = description;
  }
}

export enum BaseErrorCodes {
  NotFound = 'NOT FOUND',
}
