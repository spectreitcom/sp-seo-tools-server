import { Injectable } from '@nestjs/common';
import { CheckingQueryQueueService } from '../../application/ports/checking-query-queue.service';
import { CheckingQueryProducer } from './procucers/checking-query.producer';

@Injectable()
export class AppCheckingQueryQueueService implements CheckingQueryQueueService {
  constructor(private readonly checkingQueryProducer: CheckingQueryProducer) {}

  async checkQueries() {
    await this.checkingQueryProducer.add();
  }
}
