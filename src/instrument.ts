import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: 'https://69e35430c29d702e6af28060f490e02b@o4509037644546049.ingest.de.sentry.io/4509037646970960',
  profileSessionSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
