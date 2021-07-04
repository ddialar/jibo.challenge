import Joi from 'joi'

export const nluText = Joi.string().required()
export const nluUtterance = Joi.string().required()
// REFACTOR Research how to make more flexible the model definition
export const nluModel = Joi.string().pattern(/^model[ABC]$/).required()
