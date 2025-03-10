import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development')
    .required(),
  DATABASE_URL: Joi.string().required(),
  ADMIN_JWT_SECRET: Joi.string().required(),
  ADMIN_JWT_TOKEN_AUDIENCE: Joi.string().required(),
  ADMIN_JWT_TOKEN_ISSUER: Joi.string().required(),
  ADMIN_JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  USER_JWT_SECRET: Joi.string().required(),
  USER_JWT_TOKEN_AUDIENCE: Joi.string().required(),
  USER_JWT_TOKEN_ISSUER: Joi.string().required(),
  USER_JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
  STRIPE_RANK_TRACKER_ENDPOINT_SECRET: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_RANK_TRACKER_SUCCESS_URL: Joi.string().required(),
  STRIPE_RANK_TRACKER_CANCEL_URL: Joi.string().required(),
  RANK_TRACKER_DASHBOARD: Joi.string().required(),
  BRIGHT_DATA_TOKEN: Joi.string().required(),
  BRIGHT_DATA_BASE_URL: Joi.string().required(),
  BRIGHT_DATA_CUSTOMER: Joi.string().required(),
  BRIGHT_DATA_ZONE: Joi.string().required(),
});
