"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUpdateValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.contactUpdateValidation = joi_1.default.object({
    contactId: joi_1.default.string().required(),
    dataStore: joi_1.default.string().required()
});
