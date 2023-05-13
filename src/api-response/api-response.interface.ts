import { BaseWarning } from '../warning/base.warning';

export interface IApiSuccessResponse<T> {
  data: T | unknown;
  dataDescription: string | undefined;
}

export interface IApiErrorResponse<E extends Error> {
  error: E | null;
}

export interface IApiResponse<T, E extends Error, W extends BaseWarning>
  extends IApiSuccessResponse<T>,
    IApiErrorResponse<E> {
  // Server acknowledgement
  success: boolean | undefined;
  warnings: W[];
}
