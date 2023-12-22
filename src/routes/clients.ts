import { Router } from 'express';
import ClientsController from '../controllers/Clients';
import { validId, validResponse } from '../middlewares/validates';
import loginAndAdmin from '../middlewares/loginAndAdmin';

const router = Router();

router.post('/', ClientsController.store);
router.get('/', loginAndAdmin, ClientsController.findAllClients);
router.get('/:id', loginAndAdmin, ClientsController.show);
router.patch('/:id', validId, validResponse, ClientsController.update);

export default router;
('');
