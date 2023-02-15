import pool from "../db/conn";
import { Request, Response } from 'express';

class CD
{
    private record_id: number;
    private name: string;
    private price: number;
    private number_of_tracks: number;

    public constructor(record_id: number, name: string, price: number, number_of_tracks: number){
        this.name = name;
        this.record_id = record_id;
        this.price = price;
        this.number_of_tracks = number_of_tracks;
    }

    public async create(req: Request, res: Response) {
        const SQL = 'INSERT INTO cd(name, price, number_of_tracks, record_company_id) VALUES(?,?,?,?)';

        const data = [this.name, this.price, this.number_of_tracks, this.record_id];

        try {

            pool.query(SQL, data);

            const newCD = {
                record_id: this.record_id,
                name: this.name,
                price: this.price,
                number_of_tracks: this.number_of_tracks,
            };

            return newCD;

        } catch (error: any) {
            
            return res.status(500).json({
                message: 'Erro ao cadastrar'
            });

        }
    }

    public static async getAll(){

        const SQL = 'SELECT * FROM cd';

        let cds;

        await new Promise((resolve, reject) => {
            pool.query(SQL, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            cds = res;
        })
        .catch((err: any) => {
            cds = [];
        });

        return cds;
    }

};

export default CD;