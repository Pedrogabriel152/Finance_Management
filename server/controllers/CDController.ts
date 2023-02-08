import { Request, Response } from "express";

// Model
import CD from "../models/CD";

// Helpers
import getRecordCompanyByToken from "../helpers/checkToken";
import getToken from "../helpers/getToken";

export default class CDController {

    static async createCD(req: Request, res: Response) {

        const { name, price, number_of_tracks } = req.body

        // Validations
        if(!name) {
            return res.status(422).json({
                message: "O nome e obrigatorio"
            })
        }

        if(!price) {
            return res.status(422).json({
                message: "O preco e obrigatorio"
            })
        }

        if(!number_of_tracks) {
            return res.status(422).json({
                message: "A quantidade de musicas e obrigatoria"
            })
        }

        // Check record Company if exist
        const token = getToken(req)
        const recordCompany = await getRecordCompanyByToken(token, res)

        if(!recordCompany){
            res.status(404).json({
                message: "Gravadora nao encontrada"
            })
        }

        const cd = new CD({
            name,
            price,
            number_of_tracks,
            recordCompany
        })

        try {

            const newCd = await cd.save()

            console.log(newCd)

            return res.status(200).json({
                message: "CD cadastrado com sucesso"
            })
            
        } catch (error: any) {
            
            return res.status(500).json({
                message: error
            })

        }
    }

    static async getAll(req: Request, res: Response) {

    }

}