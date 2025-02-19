import { Domain } from '../domain';
import { randomUUID } from 'crypto';

export class DomainFactory {
  static create(text: string, userId: string) {
    return new Domain(randomUUID(), text, userId);
  }
}
