import { ApiResponse, ApiSuccessResponse } from '../src';

describe('index', () => {
  describe('ApiSuccessResponse', () => {
    it('should instantiate successfully', () => {
      const apiSuccess: ApiSuccessResponse<string> =
        new ApiSuccessResponse<string>('Hello World', 'Data description');
      expect(apiSuccess).toBeInstanceOf(ApiSuccessResponse);
    });
  });

  describe('ApiResponse', () => {
    it('should send correct response on success', () => {
      const apiSuccess: ApiSuccessResponse<string> =
        new ApiSuccessResponse<string>('Hello World', 'Data description');
      const apiResponse = ApiResponse.send(apiSuccess, []);
      expect(apiResponse.data).toEqual(apiSuccess.data);
    });

    it('should send correct response on error', () => {
      try {
        throw new Error('Test Error');
      } catch (e) {
        expect((e as Error)?.message).toEqual(
          ApiResponse.send(e, [])?.error?.message
        );
      }
    });
  });
});
