import express from 'express';

const router = express.Router();

// Controller
import RecordCompanyController from '../controllers/RecordCompanyController';
import imageupload from '../helpers/imageUpload';

router.post('/register', RecordCompanyController.register);
router.post('/login', RecordCompanyController.login);
router.get('/edit', RecordCompanyController.editGet);
router.patch('/edit', imageupload.single("image"), RecordCompanyController.editPatch);
router.get('/checkrecordcompany', RecordCompanyController.checkRecordCompany)

export default router