import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envSchema from '../env-schema';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RankTrackerModule } from './rank-tracker/application/rank-tracker.module';
import { BullModule } from '@nestjs/bullmq';
import { SearchEngineModule } from './search-engine/application/search-engine.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AdminAuthModule } from './admin-auth/application/admin-auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserAuthModule } from './user-auth/application/user-auth.module';
import { RankTrackerSubscriptionModule } from './rank-tracker-subscription/application/rank-tracker-subscription.module';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { SerpAnalyzerSubscriptionModule } from './serp-analyzer-subscription/application/serp-analyzer-subscription.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 60,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    EventEmitterModule.forRoot(),
    CqrsModule.forRoot(),
    DatabaseModule,
    ScheduleModule.forRoot(),
    RankTrackerModule,
    SearchEngineModule,
    AdminAuthModule,
    UserAuthModule,
    RankTrackerSubscriptionModule,
    SerpAnalyzerSubscriptionModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
