import Joi from "joi";

export const contactValidation = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.string().required(),
    dataStore:Joi.string().required(),
})