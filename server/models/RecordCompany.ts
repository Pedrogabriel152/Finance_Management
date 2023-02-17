import pool from "../db/conn";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import RecordCompanyClass from '../interfaces/class/RecordComapnyClass';

// Helpers
import createToken from '../helpers/createToken';

class RecordCompany implements RecordCompanyClass
{
    private name: String;
    private email: String;
    private site: String;
    private password: String;

    public constructor(name: String, email: String, site: String, password: String) {
        this.name = name;
        this.email = email;
        this.site = site;
        this.password = password;
    }

    public async register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        const SQL = "INSERT INTO record_company(name, site, email, password) VALUES(?,?,?,?)";
        
        const data = [this.name, this.site, this.email, this.password];

        try {

            pool.query(SQL, data);

            const newRecordCompany = {
                name: this.name,
                email: this.email,
                site: this.site,
                password: this.password
            };

            await createToken({recordCompany: newRecordCompany, req: req, res: res})

        } catch (error: any) {
            
            return res.status(500).json({
                message: 'Erro ao cadastrar'
            });

        }
        
    }

    public static async findOne(email: String): Promise<any> {
        const SQL = "SELECT * FROM record_company WHERE email = ? LIMIT 1";

        const data = [email];

        let recordCompany;

        await new Promise((resolve, reject) => {
            pool.query(SQL, data, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            recordCompany = res[0];
        })
        .catch((err: any) => {
            recordCompany = false;
        })

        return recordCompany;
    }

    public static async update(recordCompany: any): Promise<boolean>{
        const {id, name, email, site, image, password} = recordCompany;
        let SQL: string;

        SQL = 'UPDATE record_company SET name = ?, email = ?, site = ?, image = ? WHERE id = ?';

        if(password){

            const data = [name, email,site, image, password, id];

            SQL = 'UPDATE record_company SET name = ?, email = ?, site = ?, image = ?, password = ? WHERE id = ?';

            const status: boolean = await new Promise((resolve, reject) => {
                pool.query(SQL, data, (_err: any) => {
                    if(_err){
                        reject(false);
                        return false;
                    };
    
                    console.log(data)
                    resolve(true);
                    return true;
                });
            })
            return status;
        }

        const data = [name, email,site, image, id];

        const status: boolean = await new Promise((resolve, reject) => {
            pool.query(SQL, data, (_err: any) => {
                if(_err){
                    reject(false);
                    return false;
                };

                resolve(true);
                return true;
            });
        })
        return status;                
    }

    public static async findById(id: number){
        const SQL = "SELECT * FROM record_company WHERE id = ?";

        const data = [id];
        
        let recordCompany;

        await new Promise((resolve, reject) => {
            pool.query(SQL, data, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            recordCompany = res[0];
        })
        .catch((err: any) => {
            recordCompany = false;
        })

        return recordCompany;
    }
} 

export default RecordCompany