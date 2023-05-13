import { Warning } from './warning.interface';

export class BaseWarning implements Warning {
  constructor(
    public readonly warningCode: string,
    public readonly warningDescription: string
  ) {}
}
