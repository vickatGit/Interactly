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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactController = exports.updateContactController = exports.getContactController = exports.createContactController = void 0;
const contactService_1 = require("../services/contactService");
const contactValidationModel_1 = require("../model/contactValidationModel");
const contactUpdateValidation_1 = require("../model/contactUpdateValidation");
const createContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = contactValidationModel_1.contactValidation.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422);
        next(error);
    }
    const data = yield (0, contactService_1.createContact)(req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.dataStore);
    res.status(200).send({
        data: data
    });
});
exports.createContactController = createContactController;
const getContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = contactUpdateValidation_1.contactUpdateValidation.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422);
        next(error);
    }
    const data = yield (0, contactService_1.getContact)(req.body.contactId, req.body.dataStore);
    res.status(200).send({
        data: data
    });
});
exports.getContactController = getContactController;
const updateContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = contactValidationModel_1.contactValidation.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422);
        next(error);
    }
    const data = yield (0, contactService_1.updateContact)(req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.dataStore);
    res.status(200).send({
        data: data
    });
});
exports.updateContactController = updateContactController;
const deleteContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = contactUpdateValidation_1.contactUpdateValidation.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422);
        next(error);
    }
    const data = yield (0, contactService_1.deleteContact)(req.body.contactId, req.body.dataStore);
    res.status(200).send({
        data: data
    });
});
exports.deleteContactController = deleteContactController;
