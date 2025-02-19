import { AvailableKeywordsQuantity } from '../available-keywords-quantity';

describe('AvailableKeywordsQuantity', () => {
  describe('isExceeded', () => {
    it('should return false when used keywords quantity is less than max keywords quantity', () => {
      const availableKeywordsQty = new AvailableKeywordsQuantity(3, 10);
      expect(availableKeywordsQty.isExceeded()).toBeFalsy();
    });
    it('should return true when used keywords quantity is equals max keywords quantity', () => {
      const availableKeywordsQty = new AvailableKeywordsQuantity(10, 10);
      expect(availableKeywordsQty.isExceeded()).toBeTruthy();
    });
    it('should return true when used keywords quantity is greater than max keywords quantity', () => {
      const availableKeywordsQty = new AvailableKeywordsQuantity(12, 10);
      expect(availableKeywordsQty.isExceeded()).toBeTruthy();
    });
  });
});
