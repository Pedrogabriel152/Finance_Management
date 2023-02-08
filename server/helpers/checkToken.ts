import { verify, JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'

// Models
import RecordCompany from '../models/RecordCompany'

// Get user by jwt token
const getRecordCompanyByToken = async (token: string | null, res: Response)=> {

    if(!token) {
        return res.status(401).json({
            message: 'Acesso negado'
        })
    }

    const decoded = verify(token, 'aidhoiashdaoishdj')

    if(typeof decoded === "string") {
        return res.status(401).json({message: "Acesso negado"})
    }

    const recordCompanyId = decoded.id

    const recordCompany = await RecordCompany.findById(recordCompanyId).select('-password')

    return recordCompany
    
}

export default getRecordCompanyByToken