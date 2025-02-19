import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development')
    .required(),
  DATABASE_URL: Joi.string().required(),
  SERP_API_BASE_URL: Joi.string().required(),
  SERP_API_API_KEY: Joi.string().required(),
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
});
