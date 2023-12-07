import { Router } from 'express';
import Compliance from '../controllers/Compliance';

const router = Router();

router.post('/', Compliance.store);
router.get('/:id', Compliance.complianceCalculate);

export default router;
