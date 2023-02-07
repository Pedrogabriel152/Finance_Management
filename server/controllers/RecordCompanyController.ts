import { Response, Request } from "express";

export default class RecordCompanyController {

    static async register(req: Request, res: Response) {
        const { name, email, site, password, confirmpassword } = req.body

        // Validations
        if(!name) {
            return res.status(422).json({
                message: "O nome e obrigatorio"
            })
        }
    }

}