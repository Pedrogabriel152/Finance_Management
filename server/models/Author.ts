import pool from "../db/conn";
import { Response, Request } from "express";

class Author {

    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public async create(req: Request, res: Response) {

        const SQL = 'INSERT INTO author(name) VALUES(?)';

        const data = [this.name];
        
        try {

            pool.query(SQL, data);

            return res.status(200).json({
                message: "Autor cadastrado com sucesso"
            })

        } catch (error: any) {
            
            return res.status(500).json({
                message: 'Erro ao cadastrar'
            });

        }

    }

    public static async getById(id: number) {

        const SQL = 'SELECT * FROM author WHERE id_author = ?';

        const data = [id];

        let author;

        await new Promise((resolve, reject) => {
            pool.query(SQL, data, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            author = res[0];
        })
        .catch((err: any) => {
            author = false;
        })

        return author;

    }

    public static async update(req: Request, res: Response, id: number, name: string) {

        const SQL = 'UPDATE author SET name = ? WHERE id_author = ?';

        const data = [name, id];
        
        try {

            pool.query(SQL, data);

            return res.status(200).json({
                message: "Autor atualizado com sucesso"
            })

        } catch (error: any) {
            
            return res.status(500).json({
                message: 'Erro ao cadastrar'
            });

        }

    }

}

export default Author;