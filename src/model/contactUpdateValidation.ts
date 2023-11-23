import Joi from "joi";

export const contactUpdateValidation = Joi.object({
    contactId:Joi.string().required(),
    dataStore:Joi.string().required(),
    firstName:Joi.string(),
    lastName:Joi.string(),
    email:Joi.string(),
    phone:Joi.string(),
})