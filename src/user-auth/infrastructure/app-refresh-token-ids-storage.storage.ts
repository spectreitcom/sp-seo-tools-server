import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { RefreshTokenIdsStorageStorage } from '../application/ports/refresh-token-ids-storage.storage';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppRefreshTokenIdsStorage
  implements RefreshTokenIdsStorageStorage, OnApplicationShutdown
{
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      username: this.configService.get<string>('REDIS_USERNAME'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      tls: {
        host: this.configService.get<string>('REDIS_HOST'),
      },
    });
  }

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.client.set(this.getKey(userId), tokenId);
  }

  async invalidate(userId: string): Promise<void> {
    await this.client.del(this.getKey(userId));
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.client.get(this.getKey(userId));
    return storedId === tokenId;
  }

  private getKey(userId: string): string {
    return `user-${userId}`;
  }

  onApplicationShutdown() {
    this.client.quit();
  }
}
