import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createContact, getAllContacts, getContact } from './controller';
import { createContactValidation } from './validation';

const router = Router();

router.get('/', getAllContacts);
router.get('/:id', getContact);
router.post('/', validateRequest(createContactValidation), createContact);

const contactRoutes = router;

export default contactRoutes;
