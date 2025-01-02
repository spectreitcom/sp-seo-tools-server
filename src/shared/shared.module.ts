import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Module({
  exports: [DatabaseModule],
})
export class SharedModule {}
