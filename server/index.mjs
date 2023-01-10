import express from "express";
import session from "express-session";
import flash from "express-flash";
import path from "path"
import os from "os"
import cors from 'cors'

const app = express()

// IMPORT DAS ROTAS
import authRoute from "./routes/AuthRoutes.mjs";

// RECEBENDO DADO EM JSON
app.use(express.json())

// RECEBER RESPOSTA DO BODY
// app.use(
//     express.urlencoded({
//         extended: true
//     })
// )

// SESSION MIDDLEWARE
// app.use(
//     session({
//        name: "session",
//        secret: "uahsgvdhasgdhakskdgyaiebsdhisgdbasnndgasuijjdakvcshnbsaiydgbaskhdgaiusjdjasidcasdkbskdgasdjasyashgf",
//        resave: true,
//        saveUninitialized: true,
//        cookie: {
//         secure: false,
//         maxAge: 360000,
//         expires: new Date(Date.now() + 360000)
//        }
//     })
// )

// FLASH MESSAGES
// app.use(flash())

// USANDO O CORS
app.use(cors())

// SER SESSION TO RES
// app.use((req, res, next) => {

//     if(req.session.userid) {
//         res.locals.session = req.session
//     }

//     next()
// })

// ROUTES

app.use('/', authRoute)

app.listen(3001, () => console.log('Estamos no back-end'))