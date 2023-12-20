import { Router } from 'express';
import ClientsController from '../controllers/Clients';
import { validId, validResponse } from '../middlewares/validates';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.post('/', ClientsController.store);
router.get('/', loginRequired, ClientsController.findAllClients);
router.get('/:id', validId, validResponse, ClientsController.show);
router.patch('/:id', validId, validResponse, ClientsController.update);

export default router;
