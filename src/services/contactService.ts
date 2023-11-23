// import fetch from 'node-fetch'
import axios from "axios";
import { crmHeaders, dbPool } from "../config/config";
import {Request,NextFunction} from 'express'
import {ApiError} from '../utils/ApiError'
import { DbError } from "../utils/DbError";
export const createContact = async (firstName: String, lastName: String, email: String, phone: String, dataStore: String) => {

  if (dataStore == "CRM")
    return createContactInCRM(firstName, lastName, email, phone);
  else if (dataStore == "DATABASE")
    return createContactInDB(firstName, lastName, email, phone);
};

export const getContact = async (contactId: String, dataStore: String) => {
  if (dataStore == "CRM") return getContactFromCRM(contactId);
  else if (dataStore == "DATABASE") return getContactFromDB(contactId)
};

export const updateContact = async (
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  contactId:String,
  dataStore: String
) => {
  if (dataStore == "CRM") return updateContactInCRM(firstName, lastName, email, phone,contactId);
  else if (dataStore == "DATABASE") return updateContactInDB(firstName, lastName, email, phone,contactId)
};

export const deleteContact = async (contactId: String, dataStore: String) => {
  if (dataStore == "CRM") return deleteContactFromCRM(contactId);
  else if (dataStore == "DATABASE") return deleteContactFromDB(contactId);
};

// -----------------         CRM Functions         -----------------------

export const createContactInCRM = async (
  firstName: String,
  lastName: String,
  email: String,
  phone: String
) => {
    try {
        const res = await axios.post(
            `${process.env.BASE_URL}`,
            {
              contact: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
              },
            },
            { headers: crmHeaders }
          );
          
          console.log("res : ")
          return res.data;
    } catch (error:any) { 
        if(error.response)
            throw new ApiError(error.response.data.errors.code,error.response.data.errors.message,"")
        
    }
  
};

export const getContactFromCRM = async (contactId: String) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}${contactId}`, {
            headers: crmHeaders,
          });
          console.log("res ", res.data);
          return res.data; 
    } catch (error:any) {
        if(error.response)
            throw new ApiError(error.response.data.errors.code,error.response.data.errors.message,"")
    }
  
};

export const updateContactInCRM = async (
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  contactId:String
) => {
    try {
        const res = await axios.put(
            `${process.env.BASE_URL}${contactId}`,
            {
              contact: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
              },
            },
            { headers: crmHeaders }
          );
          console.log("res ", res.data);
          return res.data;
    } catch (error:any) {
        if(error.response)
            throw new ApiError(error.response.data.errors.code,error.response.data.errors.message,"")
    }
  
};

export const deleteContactFromCRM = async (contactId: String) => {
    try {
        const res = await axios.delete(`${process.env.BASE_URL}${contactId}`, {
            headers: crmHeaders,
          });
          return res.data;  
    } catch (error:any) {
        if(error.response)
            throw new ApiError(error.response.data.errors.code,error.response.data.errors.message,"")
    }
 
};

// DB Functions

export const createContactInDB = async (
  firstName: String,
  lastName: String,
  email: String,
  phone: String
) => {
  try {
    const res = await insertContactInDB(firstName, lastName, email, phone);
    return res;
  } catch (error: any) {
    console.log("crete contact err : ", error);
    if (error.code == "ER_NO_SUCH_TABLE") {
      await dbPool.query(`CREATE TABLE contacts (contactId integer PRIMARY KEY AUTO_INCREMENT,
            firstName TEXT,
            lastName TEXT,
            email VARCHAR(255) UNIQUE,
            phone VARCHAR (10) UNIQUE)`);
      const res = await insertContactInDB(firstName, lastName, email, phone);
      return res;
    }else{
        throw new DbError(400,error.message)
    }
    
  }
};

export const getContactFromDB = async (contactId: String) => {
    try {
        const contact = await dbPool.query(
            `SELECT * FROM contacts WHERE contactId = ?`,
            [contactId]
          );
          return contact[0];
    } catch (error:any) {
        throw new DbError(400,error.message)
    }
  
};
export const updateContactInDB = async (
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  contactId: String
) => {
    try {
        const res = await dbPool.query(`UPDATE contacts SET firstName =?, lastName =?, email =?, phone =? WHERE contactId =?`,[firstName,lastName,email,phone,contactId])
   return res
    } catch (error:any) {
        throw new DbError(400,error.message)
    }
   
};

export const deleteContactFromDB = async (contactId: String) => {
    try {

        const contact = await dbPool.query(
            `DELETE FROM contacts WHERE contactId = ?`,
            [contactId]
          );
          return contact;

    } catch (error:any) {
        throw new DbError(400,error.message)
    }
  
};

const insertContactInDB = async (
  firstName: String,
  lastName: String,
  email: String,
  phone: String
) => {
    try {

        if(!isValidEmail(email.toString())) throw new DbError(400,"Enter Valid Email")
        if(!isValidPhoneNumber(phone.toString())) throw new DbError(400,"Enter Valid Phone Number")

        const contact = await dbPool.query(
            `INSERT INTO contacts (firstName, lastName, email, phone) VALUES (?,?,?,?)`,
            [firstName, lastName, email, phone]);
          return contact; 

    } catch (error:any) {
        throw new DbError(400,error.message)
    }
  
};

function isValidEmail(email:string) {
    // This is a basic email validation regex, you might want to use a more comprehensive one
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPhoneNumber(phoneNumber:string) {
    // This regex allows for digits, optional spaces, dashes, and parentheses
    const phoneRegex = /^[0-9\s\-\(\)]+$/;
    return phoneRegex.test(phoneNumber);
  }