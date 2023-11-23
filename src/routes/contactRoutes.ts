import {Router} from 'express'
import { 
    createContactController, getContactController, updateContactController, deleteContactController 
} from '../controller/contactController'

const router = Router()

router.route("/createContact").post(createContactController)
router.route("/getContact").post(getContactController)
router.route("/updateContact").post(updateContactController)
router.route("/deleteContact").post(deleteContactController)

export default router