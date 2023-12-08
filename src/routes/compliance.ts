import { Router } from 'express';
import Compliance from '../controllers/Compliance';

const router = Router();

// router.get('/:id', Compliance.complianceCalculate);
router.post('/', Compliance.store);
router.get('/latest/:id', Compliance.latestCompliance);
router.get('/calculate/:id', Compliance.complianceCalculate);

export default router;
