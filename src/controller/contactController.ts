import { Request, Response, NextFunction } from "express";
import {
  createContact,
  getContact,
  deleteContact,
  updateContact,
} from "../services/contactService";
import { contactValidation } from "../model/contactValidationModel";
import { contactUpdateValidation } from "../model/contactUpdateValidation";
import { ApiError } from "../utils/ApiError";
import { DbError } from "../utils/DbError";

export const createContactController = async ( req: Request, res: Response, next: NextFunction) => {

  const { error, value } = contactValidation.validate(req.body, { abortEarly: false, });

  if (error) {res.status(422).send({errors:error});}

  try {

    const data = await createContact(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.dataStore
    );

    res.status(200).send({data: data,});

  } catch (error:any) {

    if (error instanceof ApiError) res.status(error.code).send({errors:error})
    else if (error instanceof DbError) res.status(error.code).send({error:error.message});
    else res.status(500).send({errors:error.message});

  }
};

export const getContactController = async ( req: Request, res: Response, next: NextFunction) => {

  const { error, value } = contactUpdateValidation.validate(req.body, {abortEarly: false,});

  if (error) {res.status(422).send({errors:error});}

  try {

    const data = await getContact(req.body.contactId, req.body.dataStore);
    res.status(200).send({data: data});

  } catch (error:any) {

    if (error instanceof ApiError) res.status(error.code).send({errors:error})
    else if (error instanceof DbError) res.status(error.code).send({error:error.message});
    else res.status(500).send({errors:error.message});

  }
  
};

export const updateContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { error, value } = contactUpdateValidation.validate(req.body, {abortEarly: false,});

  if (error) {res.status(422).send({errors:error});}

  try {

    const data = await updateContact(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        req.body.contactId,
        req.body.dataStore
      );

      res.status(200).send({ data: data});

  } catch (error:any) {

    if (error instanceof ApiError) res.status(error.code).send({errors:error})
    else if (error instanceof DbError) res.status(error.code).send({error:error.message})
    else res.status(500).send({errors:error.message});

  }
 
};

export const deleteContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { error, value } = contactUpdateValidation.validate(req.body, { abortEarly: false,});

  if (error) {res.status(422).send({errors:error});}
  
  try {

    const data = await deleteContact(req.body.contactId, req.body.dataStore);
    res.status(200).send({
        data: data,
    });

  } catch (error:any) {

    if (error instanceof ApiError) res.status(error.code).send({errors:error})
    else if (error instanceof DbError) res.status(error.code).send({error:error.message})
    else res.status(500).send({errors:error.message});

  }
  
};
