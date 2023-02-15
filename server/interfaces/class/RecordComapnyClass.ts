import { Request, Response } from 'express';
interface RecordCompanyClass {
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};

export default RecordCompanyClass;