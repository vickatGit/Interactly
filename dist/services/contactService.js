"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactFromDB = exports.updateContactInDB = exports.getContactFromDB = exports.createContactInDB = exports.deleteContactFromCRM = exports.updateContactInCRM = exports.getContactFromCRM = exports.createContactInCRM = exports.deleteContact = exports.updateContact = exports.getContact = exports.createContact = void 0;
// import fetch from 'node-fetch'
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const createContact = (firstName, lastName, email, phone, dataStore) => __awaiter(void 0, void 0, void 0, function* () {
    if (dataStore == "CRM")
        return (0, exports.createContactInCRM)(firstName, lastName, email, phone);
    else if (dataStore == "DATABASE")
        return (0, exports.createContactInDB)(firstName, lastName, email, phone);
});
exports.createContact = createContact;
const getContact = (contactId, dataStore) => __awaiter(void 0, void 0, void 0, function* () {
    if (dataStore == "CRM")
        return (0, exports.getContactFromCRM)(contactId);
});
exports.getContact = getContact;
const updateContact = (firstName, lastName, email, phone, dataStore) => __awaiter(void 0, void 0, void 0, function* () {
    if (dataStore == "CRM")
        return (0, exports.updateContactInCRM)(firstName, lastName, email, phone);
});
exports.updateContact = updateContact;
const deleteContact = (contactId, dataStore) => __awaiter(void 0, void 0, void 0, function* () {
    if (dataStore == "CRM")
        return (0, exports.deleteContactFromCRM)(contactId);
});
exports.deleteContact = deleteContact;
//CRM Functions
const createContactInCRM = (firstName, lastName, email, phone) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(`${process.env.BASE_URL}`, {
        contact: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: String
        }
    }, { headers: config_1.crmHeaders });
    console.log("res ", res.data);
    return res.data;
});
exports.createContactInCRM = createContactInCRM;
const getContactFromCRM = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${process.env.BASE_URL}${contactId}`, { headers: config_1.crmHeaders });
    console.log("res ", res.data);
    return res.data;
});
exports.getContactFromCRM = getContactFromCRM;
const updateContactInCRM = (firstName, lastName, email, phone) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.put(`${process.env.BASE_URL}`, {
        contact: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: String
        }
    }, { headers: config_1.crmHeaders });
    console.log("res ", res.data);
    return res.data;
});
exports.updateContactInCRM = updateContactInCRM;
const deleteContactFromCRM = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.delete(`${process.env.BASE_URL}${contactId}`, { headers: config_1.crmHeaders });
    console.log("res ", res.data);
    return res.data;
});
exports.deleteContactFromCRM = deleteContactFromCRM;
// DB Functions
const createContactInDB = (firstName, lastName, email, phone) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield config_1.dbPool.query(`
    INSERT INTO contacts (firstName, lastName, email, phone)
    VALUES (?,?,?,?)`, [firstName, lastName, email, phone]);
    return contact;
});
exports.createContactInDB = createContactInDB;
const getContactFromDB = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield config_1.dbPool.query(`SELECT * FROM contacts WHERE contactId = ?`, [contactId]);
    return contact[0];
});
exports.getContactFromDB = getContactFromDB;
const updateContactInDB = (firstName, lastName, email, phone, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    // const contact = await dbPool.query(`
    // INSERT INTO contacts (firstName, lastName, email, phone)
    // VALUES (?,?,?,?)`,
    // [firstName,lastName,email,phone]
    // )
});
exports.updateContactInDB = updateContactInDB;
const deleteContactFromDB = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield config_1.dbPool.query(`DELETE FROM contacts WHERE contactId = ?`, [contactId]);
    return contact;
});
exports.deleteContactFromDB = deleteContactFromDB;
