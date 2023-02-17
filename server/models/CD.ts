import pool from "../db/conn";
import { Request, Response } from 'express';

class CD
{
    private record_id: number;
    private name: string;
    private price: number;
    private number_of_tracks: number;
    private image: string;

    public constructor(record_id: number, name: string, price: number, number_of_tracks: number, image: string){
        this.name = name;
        this.record_id = record_id;
        this.price = price;
        this.number_of_tracks = number_of_tracks;
        this.image = image;
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
                image: this.image
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

    public static async getByID(cd_id: number) {
        
        const SQL = "SELECT cd.cd_id, cd.name, cd.price, cd.number_of_tracks, cd.image, record_company.id FROM cd INNER JOIN record_company ON cd.record_company_id = record_company.id AND cd.cd_id = ?";

        const params = [cd_id];

        let cds;

        await new Promise((resolve, reject) => {
            pool.query(SQL,params, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            cds = res;
        })
        .catch((err: any) => {
            cds = {};
        });

        return cds;
    }

    public async update(id: number) {

        // Check cd if exist
        const cd: any = await CD.getByID(id);

        if(Object.keys(cd).length <= 0) {
            return false;
        }

        let SQL = "UPDATE cd SET name = ?, price = ?, number_of_tracks = ? WHERE cd_id = ?";

        let data = [this.name, this.price, this.number_of_tracks, id];

        if(this.image) {
            let SQL = "UPDATE cd SET name = ?, price = ?, number_of_tracks = ?, image = ? WHERE cd_id = ?";

            let data = [this.name, this.price, this.number_of_tracks, this.image, id];
        }

        let status;
        console.log(data)
        await new Promise((resolve, reject) => {
            pool.query(SQL, data, (_err: any) => {
                if(_err){
                    console.log(_err)
                    reject(false);
                };

                resolve(true);
            })
        })
        .then((res: any) => {
            status = res
            console.log(res)
        })
        .catch((err: any) => {
            status = false
        })
        return status;

    }

    public static async delete(id: number) {

        const SQL = 'DELETE FROM cd WHERE cd_id = ?';
        const data = [id];

        let status;

        await new Promise((resolve, reject) => {
            pool.query(SQL, data, (_err: any) => {
                if(_err){
                    console.log(_err)
                    reject(false);
                };

                resolve(true);
            })
        })
        .then((res: any) => {
            status = res
        })
        .catch((err: any) => {
            status = false
        })
        return status;

    }

    public static async getAllById(id: number) {

        const SQL = 'SELECT * FROM cd WHERE record_company_id = ?';
        const params = [id]

        let cds;

        await new Promise((resolve, reject) => {
            pool.query(SQL, params, (_err: any, data: any) => {
                if(_err){
                    console.log(_err)
                    reject([]);
                };

                resolve(data);
            })
        })
        .then((res: any) => {
            cds = res
        })
        .catch((err: any) => {
            cds = err
        })
        return cds;

    }

};

export default CD;