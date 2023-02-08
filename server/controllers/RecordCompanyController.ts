import { Response, Request } from "express";
import bcrypt from 'bcrypt';

// Helpers
import createToken from "../helpers/createToken";
import checkRecordExists from "../helpers/checkRecordExits";
import getToken from "../helpers/getToken";
import getRecordCompanyByToken from "../helpers/checkToken";

// Models
import RecordCompany from "../models/RecordCompany";

export default class RecordCompanyController {

    static async register(req: Request, res: Response) {
        const { name, email, site, password, confirmpassword } = req.body

        

        // Validations
        if(!name) {
            return res.status(422).json({
                message: "O nome e obrigatorio"
            })
        }

        if(!email) {
            return res.status(422).json({
                message: "O e-mail e obrigatorio"
            })
        }

        if(!site) {
            return res.status(422).json({
                message: "O site e obrigatorio"
            })
        }

        if(!password) {
            return res.status(422).json({
                message: "A senha e obrigatoria"
            })
        }

        if(!confirmpassword) {
            return res.status(422).json({
                message: "A confirmacao de senha e obrigatoria"
            })
        }

        if(password !== confirmpassword) {
            return res.status(422).json({
                message: "As senhas precisam ser iguais"
            })
        }

        // Create a password
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        const recordCompany = new RecordCompany({
            name,
            email,
            site,
            password: hashPassword
        })

        try {

            // Check record company is exists
            const existsRecordCompany: boolean = await checkRecordExists(email)
            
            if(existsRecordCompany) {
                return res.status(422).json({
                    message: "Ja existe uma gravadora com este e-mail"
                })
            }

            const newRecordCompany = await recordCompany.save()   

            await createToken({recordCompany: newRecordCompany, req: req, res: res})

        } catch (error: any) {
            
            return res.status(500).json({
                message: "Erro ao cadastrar, tente novamente  mais tarde"
            })

        }

    }

    static async login(req: Request, res: Response) {

        const { email, password } = req.body

        // Validations
        if(!email) {
            return res.status(422).json({
                message: "O campo de email precisa estar preenchido"
            })
        }

        if(!password) {
            return res.status(422).json({
                message: "O campo de senha precisa estar preenchido"
            })
        }

        // Check if exists record Company
        const recordCompany = await RecordCompany.findOne({email: email})

        if(!recordCompany) {
            return res.status(404).json({
                message: "Usuario nao encontrado"
            })
        }
        
        // Check if password match with db password
        const CheckPassword = await bcrypt.compare(password, recordCompany.password)

        if(!CheckPassword) {
            return res.status(422).json({
                message: "Senha invalida"
            })
        }

        await createToken({recordCompany, req, res})

    }

    static async editGet(req: Request, res: Response) {

        const token = getToken(req)

        const recordCompany = await getRecordCompanyByToken(token, res)

        if(!recordCompany) {
            return res.status(401).json({
                message: "Acesso negado"
            })
        }

        return res.status(200).json({
            recordCompany
        })        

    }

    static async editPatch(req: Request, res: Response) {

        const { name, email, site, password, confirmpassword } = req.body
        const token = getToken(req)

        const recordCompanyByToken = await getRecordCompanyByToken(token, res)

        if(!recordCompanyByToken) {
            return res.status(401).json({
                message: "Acesso negado"
            })
        }

        // Validations
        if(!name) {
            return res.status(422).json({
                message: "O nome e obrigatorio"
            })
        }

        if(!email) {
            return res.status(422).json({
                message: "O e-mail e obrigatorio"
            })
        }

        if(!site) {
            return res.status(422).json({
                message: "O site e obrigatorio"
            })
        }

        let recordCompany: {
            id: string,
            name: string,
            email: string,
            site: string,
            password?: string,
        } = {
            id: recordCompanyByToken._id,
            name,
            email,
            site
        }

        if(password) {
            if(!confirmpassword) {
                return res.status(422).json({
                    message: "A confirmacao de senha e obrigatoria"
                })
            }

            if(password !== confirmpassword) {
                return res.status(422).json({
                    message: "As senhas precisam ser iguais"
                })
            }

            // Create a password
            const salt = await bcrypt.genSalt(12)
            const hashPassword = await bcrypt.hash(password, salt)

            recordCompany.password = hashPassword

        }

        try{

            // return user updated data
            await RecordCompany.findOneAndUpdate(
                { _id: recordCompany.id },
                {$set: recordCompany},
                {new: true}
            )

            res.status(200).json({
                message: 'Usuário atualizado com sucesso'
            })

        }catch(err){

            return res.status(500).json({
                message: err
            })

        }        

    }

}