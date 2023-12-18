import { Router } from 'express';
import ClientsController from '../controllers/Clients';

const router = Router();

router.post('/', ClientsController.store);
router.get('/', ClientsController.index);
router.get('/:id', ClientsController.show);

export default router;
