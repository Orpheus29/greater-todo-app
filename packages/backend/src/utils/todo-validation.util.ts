import Joi from 'joi';

export const createTodo = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().required(),
  done: Joi.valid(true, false),
  isPrivate: Joi.valid(true, false)
});

export const updateTodo = Joi.object({
  title: Joi.string().max(100),
  description: Joi.string(),
  done: Joi.valid(true, false),
  isPrivate: Joi.valid(true, false)
});

export const todoQueryFilters = Joi.object({
  search: Joi.string().allow(''),
  done: Joi.valid('true', 'false'),
  isPrivate: Joi.valid('true', 'false'),
  page: Joi.string().regex(/^\d+$/).required(),
  take: Joi.string().regex(/^\d+$/).required()
});
