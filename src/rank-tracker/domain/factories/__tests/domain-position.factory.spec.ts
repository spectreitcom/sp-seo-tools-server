import { DomainPositionFactory } from '../domain-position.factory';
import { randomUUID } from 'crypto';
import { DomainPosition } from '../../domain-position';

describe('DomainPositionFactory', () => {
  describe('create', () => {
    it('should create DomainPositionInstance', () => {
      const domainPosition = DomainPositionFactory.create(
        randomUUID(),
        randomUUID(),
      );
      expect(domainPosition).toBeInstanceOf(DomainPosition);
    });
  });
});
