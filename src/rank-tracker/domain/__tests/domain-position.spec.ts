import { DomainPositionFactory } from '../factories/domain-position.factory';
import { randomUUID } from 'crypto';

describe('DomainPosition', () => {
  it('should update status', () => {
    const domainPosition = DomainPositionFactory.create(
      randomUUID(),
      randomUUID(),
    );
    domainPosition.updateStatus('DONE');
    expect(domainPosition.getStatus()).toEqual('DONE');
  });
});
