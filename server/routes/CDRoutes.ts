import express from 'express';

// Middleware
import checkToken from '../helpers/verifyToken';
import imageupload from '../helpers/imageUpload';

const router = express.Router()

// Controller
import CDController from '../controllers/CDController';

router.get('/all', checkToken, CDController.getAll);
router.post('/add/cd', checkToken, CDController.createCD);
router.get('/edit/:cd_id', checkToken, CDController.editGet);
router.patch('/edit/:cd_id', checkToken, imageupload.single("image"), CDController.editPatch);
router.delete('/delete/:id', checkToken, CDController.delete);
router.get('/:record_id/mycds', checkToken, CDController.getMyCDs);

export default router