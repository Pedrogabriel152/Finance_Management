import express from 'express';

// Helpers
import checkToken from '../helpers/verifyToken';

const router = express.Router()

// Controller
import MusicController from '../controllers/MusicController';

router.post('/add',checkToken, MusicController.createMusic );
router.get('/all', checkToken, MusicController.getAll)

export default router