import { BaseError } from '../error/base.error';
import { CustomError } from '../error/custom.error';
import { BaseWarning } from '../warning/base.warning';
import { IApiResponse, IApiSuccessResponse } from './api-response.interface';

export class ApiSuccessResponse<T> implements IApiSuccessResponse<T> {
  private readonly _data: T;
  private readonly _dataDescription: string;

  get data(): T {
    return this._data;
  }

  get dataDescription(): string {
    return this._dataDescription;
  }

  constructor(data: T, description: string) {
    this._data = data;
    this._dataDescription = description;
  }
}

export class ApiResponse<
  T = any,
  E extends Error = Error,
  W extends BaseWarning = BaseWarning
> implements IApiResponse<T, E, W>
{
  success: boolean | undefined;
  data: T | unknown;
  dataDescription: string | undefined;
  warnings: W[] = [];
  error: E | null = null;

  constructor(init: Partial<IApiResponse<T, E, W>>) {
    Object.assign(this, init);
  }

  public static send<
    T,
    E extends Error = Error,
    W extends BaseWarning = BaseWarning
  >(response: ApiSuccessResponse<T> | E | unknown, warnings: W[]) {
    let error: any;
    const success = response instanceof ApiSuccessResponse;

    if (response instanceof BaseError) {
      error = response;
    } else if (response instanceof Error) {
      if (response?.message) {
        error = new CustomError(response.message, response?.stack);
      }
    }

    return new ApiResponse<T, E | CustomError, W>({
      success,
      data: success ? response?.data : null,
      dataDescription: success ? response?.dataDescription : undefined,
      warnings,
      error: !success ? error : null,
    });
  }
}
