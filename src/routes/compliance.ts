import { Router } from 'express';
import Compliance from '../controllers/Compliance';
import loginAndAdmin from '../middlewares/loginAndAdmin';

const router = Router();

// router.get('/:id', Compliance.complianceCalculate);
router.post('/', loginAndAdmin, Compliance.store);
router.get('/latest/:id', Compliance.latestCompliance);
router.get('/calculate/:id', Compliance.complianceCalculate);
router.get('/:id/:complianceId', Compliance.show);
// router.get('/', Compliance.index);

export default router;
