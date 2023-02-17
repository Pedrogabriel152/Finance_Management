import { Request, Response } from "express";

// Model
import Music from "../models/Music";
import Author from "../models/Author";

// Helpers
import getRecordCompanyByToken from "../helpers/checkToken";
import getToken from "../helpers/getToken";

export default class MusicController {

    static async createMusic(req: Request, res: Response) {

        const { name, duration } = req.body;

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

        const music = new Music(name, duration)

        try {

            const authorLast: any = await Author.getLastId();

            const id_author = authorLast.id_author? authorLast.id_author : 1;

            const newMusic = await music.create(id_author)

            res.status(200).json({
                message: "Musica cadastrada com sucesso"
            })
            
        } catch (error: any) {
            return res.status(500).json({
                message: error
            })
        }


    }

    public static async getAll(req: Request, res: Response) {

        const musics = await Music.getAll();

        return res.status(200).json({
            musics
        })

    }

}