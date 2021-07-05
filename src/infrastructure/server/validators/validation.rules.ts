import Joi from 'joi'

export const nluText = Joi.string().required()
export const nluUtterance = Joi.string().required()
export const nluModel = Joi.string().required()
