import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  APP_ENV: Joi.string().required(),
  PORT: Joi.number().default(8080).required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  LOG_LEVEL: Joi.string().required(),
  ENCRYPTION_KEY: Joi.string().required(),
  ENCRYPTION_ALGORITHM: Joi.string().required(),
  ENCRYPTION_IV_LENGTH: Joi.number().required(),
  BRAINTREE_MERCHANT_ID: Joi.string().required(),
  BRAINTREE_PUBLIC_KEY: Joi.string().required(),
  BRAINTREE_PRIVATE_KEY: Joi.string().required(),
  PAYPAL_CLIENT_ID: Joi.string().required(),
  PAYPAL_CLIENT_SECRET: Joi.string().required(),
});
