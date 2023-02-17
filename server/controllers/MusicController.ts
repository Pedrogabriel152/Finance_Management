import { Request, Response } from "express";

// Model
import Music from "../models/Music";

// Helpers
import getRecordCompanyByToken from "../helpers/checkToken";
import getToken from "../helpers/getToken";

export default class MusicController {

    static async createMusic(req: Request, res: Response) {

        const { name, duration, author } = req.body

        // Check record Company if exist
        const token = getToken(req)
        const recordCompany = await getRecordCompanyByToken(token, res)

        if(!recordCompany){
            res.status(404).json({
                message: "Gravadora nao encontrada"
            })
        }

        // Vallidations
        if(!name){
            return res.status(422).json({
                message: "O nome e obrigatorio"
            })
        }

        if(!duration){
            return res.status(422).json({
                message: "A duracao e obrigatoria"
            })
        }

        if(!author){
            return res.status(422).json({
                message: "O autor e obrigatorio"
            })
        }

        // const music = new Music({
        //     name,
        //     duration,
        //     author,
        //     recordCompany
        // })

        try {

            // const newMusic = await music.save()

            // console.log(newMusic)

            res.status(200).json({
                message: "Musica cadastrada com sucesso"
            })
            
        } catch (error: any) {
            return res.status(500).json({
                message: error
            })
        }


    }

}