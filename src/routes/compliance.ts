import { Router } from 'express';
import Compliance from '../controllers/Compliance';
import loginAndAdmin from '../middlewares/loginAndAdmin';

const router = Router();

router.post('/', loginAndAdmin, Compliance.store);
router.get('/latest/', Compliance.latestCompliance);
router.get('/calculate/:id', Compliance.complianceCalculate);
router.get('/:id', loginAndAdmin, Compliance.show);
router.patch('/:id', loginAndAdmin, Compliance.update);
router.delete('/:id', loginAndAdmin, Compliance.delete);

export default router;
