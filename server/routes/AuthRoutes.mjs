import express from "express";
import AuthController from "../controllers/AuthController.mjs";

const router = express.Router()

router.post('/register', AuthController.registerPost)
router.get('/register',(req, res) => {
    res.json({conteuddo:'Hola mindoasdad'})
})

export default router;