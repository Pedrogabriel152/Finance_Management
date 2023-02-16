import express from 'express';
import checkToken from '../helpers/verifyToken';

const router = express.Router()

// Controller
import CDController from '../controllers/CDController';

router.get('/all', checkToken, CDController.getAll);
router.post('/add/cd', checkToken, CDController.createCD);
router.get('/edit/:cd_id', checkToken, CDController.editGet);
router.patch('/edit/:cd_id', checkToken, CDController.editPatch);
router.delete('/delete/:id', checkToken, CDController.delete);
router.get('/:record_id/mycds', checkToken, CDController.getMyCDs);

export default router