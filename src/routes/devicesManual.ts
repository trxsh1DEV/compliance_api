import { Router } from 'express';
import Devices from '../controllers/DevicesManual';

const router = Router();

router.post('/', Devices.store);
router.get('/', Devices.index);

export default router;
