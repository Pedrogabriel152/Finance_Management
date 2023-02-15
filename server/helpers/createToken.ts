import { sign } from 'jsonwebtoken';

// Interface
import ICreateToken from '../interfaces/ICreateToken';

const createToken = async ({recordCompany, req, res}: ICreateToken)=> {

    const token = await sign({
        name: recordCompany.name,
        id: recordCompany.id
    }, "aidhoiashdaoishdj");

    res.status(200).json({
        token
    });

};

export default createToken;