import { Router } from 'express';
import ClientsController from '../controllers/Clients';

const router = Router();

router.post('/', ClientsController.store);

export default router;
