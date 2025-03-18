import { Injectable } from '@nestjs/common';
import { HashingService } from '../application/ports/hashing.service';
import { hash, genSalt, compare } from 'bcryptjs';

@Injectable()
export class BcryptHashingService implements HashingService {
  async hash(plainText: string): Promise<string> {
    const salt = await genSalt();
    return hash(plainText, salt);
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText);
  }
}
