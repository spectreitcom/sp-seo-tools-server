// todo: write tests

describe('Analysis', () => {
  describe('create', () => {
    it('should create an analysis when user has active testing mode and not exceeded monthly limit', () => {});
    it('should create an analysis when user has active subscription and not exceeded monthly limit', () => {});
    it("should not create an analysis when user doesn't have neither active subscription nor active testing mode", () => {});
    it('should not create an analysis when user has active testing mode but exceeded monthly limit', () => {});
    it('should not create an analysis when user has active subscription but exceeded monthly limit', () => {});
  });
  describe('updateProcessId', () => {
    it('should update processId', () => {});
  });
});
