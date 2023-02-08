import express from 'express';
import checkToken from '../helpers/verifyToken';

const router = express.Router()

// Controller
import CDController from '../controllers/CDController';

router.get('/all', checkToken, CDController.getAll)
router.post('/add/cd', checkToken, CDController.createCD)

export default router