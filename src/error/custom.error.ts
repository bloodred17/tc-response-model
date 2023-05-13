export class CustomError extends Error {
  errorMessage: string;
  data: any = null;

  constructor(message: string, data?: any) {
    super(message);
    this.errorMessage = message;
    if (data) {
      this.data = data;
    }
  }
}
