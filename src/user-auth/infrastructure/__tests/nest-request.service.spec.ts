import { AppRequestService } from '../app-request.service';

describe('NestRequestService', () => {
  let nestRequestService: AppRequestService;

  beforeEach(() => {
    nestRequestService = new AppRequestService();
  });

  describe('extractToken', () => {
    it('should return the token', () => {
      const authHeader = 'Bearer TOKEN';
      expect(nestRequestService.extractToken(authHeader)).toEqual('TOKEN');
    });
    it('should return null when token does not exists', () => {
      const authHeader = 'Bearer';
      const authHeader2 = 'TOKEN';
      const authHeader3 = 'Bearer ';

      expect(nestRequestService.extractToken(authHeader)).toBeNull();
      expect(nestRequestService.extractToken(authHeader2)).toBeNull();
      expect(nestRequestService.extractToken(authHeader3)).toBeNull();
    });
  });
});
