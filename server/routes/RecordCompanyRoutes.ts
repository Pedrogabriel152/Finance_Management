import express from 'express'

const router = express.Router()

// Controller
import RecordCompanyController from '../controllers/RecordCompanyController'

router.post('/register', RecordCompanyController.register)
router.post('/login', RecordCompanyController.login)

export default router