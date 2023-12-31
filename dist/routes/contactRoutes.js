"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controller/contactController");
const router = (0, express_1.Router)();
router.route("/createContact").post(contactController_1.createContactController);
router.route("/getContact").post(contactController_1.getContactController);
router.route("/updateContact").post(contactController_1.updateContactController);
router.route("/deleteContact").post(contactController_1.deleteContactController);
exports.default = router;
