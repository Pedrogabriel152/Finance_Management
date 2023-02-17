import { Response, Request } from "express";

// Model
import Author from "../models/Author";

class AuthorController {

    static async createAuthor(req: Request, res: Response) {

        const {name} = req.body;

        // Validations
        if(!name) {
            return res.status(422).json({
                message: "O nome é obrigatório"
            });
        }

        try {
            const author = new Author(name);

            await author.create(req,res);

        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao cadastrar, tente novamente  mais tarde"
            }); 
        }

    }

    public static async editGet(req: Request, res: Response) {

        const { id } = req.params;

        try {
            
            const author = await Author.getById(parseInt(id));

            if(!author) {
                return res.status(404).json({
                    message: "Autor não encontrado"
                });
            }

            return res.status(200).json({
                author
            })

        } catch (error: any) {
            return res.status(500).json({
                message: "Erro no servidor, tente novamente mais tarde"
            });
        }

    }

    public static async editPatch(req: Request, res: Response) {

        const { name } = req.body;
        const { id } = req.params;

         // Validations
         if(!name) {
            return res.status(422).json({
                message: "O nome é obrigatório"
            });
        }

        try {

            await Author.update(req,res,parseInt(id), name);

        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao atualizar, tente novamente  mais tarde"
            }); 
        }

    }

}


export default AuthorController;