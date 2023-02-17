import express from 'express';

// Helpers
import checkToken from '../helpers/verifyToken';

const router = express.Router()

// Controller
import AuthorController from "../controllers/AuthorController";

router.post('/add',checkToken, AuthorController.createAuthor );
router.get('/edit/:id', checkToken, AuthorController.editGet);
router.patch('/edit/:id', checkToken, AuthorController.editPatch);

export default router