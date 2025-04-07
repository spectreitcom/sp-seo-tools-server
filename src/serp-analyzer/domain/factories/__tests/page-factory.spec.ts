import { PageFactory } from '../page-factory';
import { randomUUID } from 'crypto';
import { Page } from '../../page';

describe('PageFactory', () => {
  describe('create', () => {
    it('should return instance of Page', () => {
      const page = PageFactory.create(
        'https://localhost:8080',
        3,
        randomUUID(),
      );
      expect(page).toBeInstanceOf(Page);
    });
  });
});
