import { Request, Response } from "express";

// Model
import CD from "../models/CD";

// Helpers
import getRecordCompanyByToken from "../helpers/checkToken";
import getToken from "../helpers/getToken";

export default class CDController {

    public static async createCD(req: Request, res: Response) {

        const { name, price, number_of_tracks } = req.body;

        // Validations
        if(!name) {
            return res.status(422).json({
                message: "O nome e obrigatorio"
            });
        }

        if(!price) {
            return res.status(422).json({
                message: "O preco e obrigatorio"
            });
        }

        if(!number_of_tracks) {
            return res.status(422).json({
                message: "A quantidade de musicas e obrigatoria"
            })
        }

        // Check record Company if exist
        const token = getToken(req);
        const recordCompany: any = await getRecordCompanyByToken(token, res);

        if(!recordCompany){
            res.status(404).json({
                message: "Gravadora nao encontrada"
            });
        }

        const cd = new CD(
            recordCompany.id,
            name,
            price,
            number_of_tracks
        );

        try {

            const newCd = await cd.create(req, res)

            return res.status(200).json({
                message: "CD cadastrado com sucesso"
            });
            
        } catch (error: any) {
            
            return res.status(500).json({
                message: error
            });

        }
    }

    public static async getAll(req: Request, res: Response) {
        const cds = await CD.getAll();

        res.status(200).json({
            cds
        });
    }

    public static async editGet(req: Request, res: Response) {

        const {cd_id} = req.params;

        const cd: any = await CD.getByID(parseInt(cd_id));

        if(Object.keys(cd).length <= 0){
            return res.status(200).json({
                message: 'CD não encontardo'
            });
        }

        return res.status(200).json({
            cd
        })

    }

    public static async editPatch(req: Request, res: Response) {

        const {cd_id} = req.params;

        const { name, price, number_of_tracks } = req.body;

          // Validations
          if(!name) {
            return res.status(422).json({
                message: "O nome e obrigatorio"
            });
        }

        if(!price) {
            return res.status(422).json({
                message: "O preco e obrigatorio"
            });
        }

        if(!number_of_tracks) {
            return res.status(422).json({
                message: "A quantidade de musicas e obrigatoria"
            });
        }

        // Check record Company if exist
        const token = getToken(req);
        const recordCompany: any = await getRecordCompanyByToken(token, res);

        if(!recordCompany){
            res.status(404).json({
                message: "Gravadora nao encontrada"
            });
        }        

        const cd = new CD(
            recordCompany.id,
            name,
            price,
            number_of_tracks
        );

        const status = await cd.update(parseInt(cd_id));

        console.log(status)
        
        if(!status) {
            return res.status(500).json({
                message: 'Erro ao atualizar o cd'
            });
        }

        return res.status(200).json({
            message: 'CD atualizado com sucesso'
        });

    }

    public static async delete(req: Request, res: Response) {

        const {id} = req.params;

        // Check record Company if exist
        const token = getToken(req);
        const recordCompany: any = await getRecordCompanyByToken(token, res);

        if(!recordCompany){
            res.status(404).json({
                message: "Gravadora nao encontrada"
            });
        } 

        // Check cd if exist
        const cd: any = await CD.getByID(parseInt(id));

        if(Object.keys(cd).length <= 0) {
            return res.status(404).json({
                message: 'Cd não encontrado'
            });
        }

        const status = await CD.delete(parseInt(id));

        if(!status) {
            return res.status(500).json({
                message: 'Erro ao excluir cd, tente novamente!'
            });
        }

        return res.status(200).json({
            message: 'Cd deletado com sucesso'
        });

    }

    static async getMyCDs(req: Request, res: Response) {

        const {record_id} = req.params;

        const cds = await CD.getAllById(parseInt(record_id));

        return res.status(200).json({
            cds
        })

    }

}