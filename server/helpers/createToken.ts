import { sign } from 'jsonwebtoken';

// Interface
import ICreateToken from '../interfaces/ICreateToken';

const createToken = async ({recordCompany, req, res}: ICreateToken)=> {

    const token = await sign({
        name: recordCompany.name,
        id: recordCompany._id
    }, "aidhoiashdaoishdj");

    console.log(recordCompany)

    res.status(200).json({
        message: "Usuario cadastrado com sucesso",
        token
    })

}

export default createToken;