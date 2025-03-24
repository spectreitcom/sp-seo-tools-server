import { DomainFactory } from '../domain.factory';
import { randomUUID } from 'crypto';
import { Domain } from '../../domain';

describe('DomainFactory', () => {
  describe('create', () => {
    it('should create DomainFactory instance', () => {
      const domain = DomainFactory.create('example.com', randomUUID());
      expect(domain).toBeInstanceOf(Domain);
    });
  });
});
