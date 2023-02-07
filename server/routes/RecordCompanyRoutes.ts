import express from 'express'

const router = express.Router()

// Controller
import RecordCompanyController from '../controllers/RecordCompanyController'

router.get('/register', RecordCompanyController.register)

export default router