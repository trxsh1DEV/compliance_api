import { Router } from 'express';
import Devices from '../controllers/Devices';

const router = Router();

router.post('/', Devices.index);

export default router;
