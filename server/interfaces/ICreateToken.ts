import RecordCompany from '../models/RecordCompany';
import { Request, Response } from 'express';

interface ICreateToken {
    recordCompany: any
    req: Request
    res: Response
}

export default ICreateToken