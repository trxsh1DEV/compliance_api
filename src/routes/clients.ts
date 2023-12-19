import { Router } from 'express';
import ClientsController from '../controllers/Clients';

const router = Router();

router.post('/', ClientsController.store);
router.get('/', ClientsController.findAllClients);
router.get('/:id', ClientsController.show);
router.patch('/:id', ClientsController.update);

export default router;
