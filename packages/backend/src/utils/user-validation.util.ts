/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(50).alphanum().required()
});

export const changePassSchema = Joi.object({
  oldPassword: Joi.string().min(5).max(50).alphanum().required(),
  newPassword: Joi.string().min(5).max(50).alphanum().required()
});

export const resetPassRequestSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetPassSchema = Joi.object({
  newPassword: Joi.string().min(5).max(50).alphanum().required()
});
