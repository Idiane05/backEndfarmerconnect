import express from 'express';
import { getContacts, deleteContact, createContact } from '../controllers/ContactController.js';
const contactRouter = express.Router();

contactRouter.post('/createContact', createContact);
contactRouter.get('/getContact', getContacts);
contactRouter.delete('/removeContact/:id', deleteContact);

export default contactRouter;
