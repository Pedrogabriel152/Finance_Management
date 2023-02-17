import pool from "../db/conn";

class Music 
{

    private name: string;
    private duration: string;


    public constructor(name: string, duration: string) {
        this.name = name;
        this.duration = duration;
    }

    public async create(id_author: number) {

        const SQL = 'INSERT INTO music(name, duration) VALUES(?, ?)';
        const SQL2 = 'INSERT INTO music_author(id_music, id_author) VALUES(?, ?)';

        const data = [this.name, this.duration];

        try {

            pool.query(SQL, data);

            const musicLast: any = await Music.getLastId(); 

            const music_id = musicLast.id_music? musicLast.id_music : 1;

            const data2 = [music_id, id_author];

            pool.query(SQL2, data2);

            const music = {
                name: this.name,
                duration: this.duration
            };

            return music;


        } catch (error: any) {
            
            return false;

        }

    }

    public static async getLastId() {

        const SQL = 'SELECT id_music FROM music ORDER BY id_music DESC LIMIT 1';

        let id_music;

        await new Promise((resolve, reject) => {
            pool.query(SQL, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            id_music = res[0];
        })
        .catch((err: any) => {
            id_music = false;
        })

        return id_music;

    }

    public static async getAll() {
        const SQL = 'SELECT * FROM music';

        let musics;

        await new Promise((resolve, reject) => {
            pool.query(SQL, (_err: any, datas: any) => {
                if(_err){
                    reject('');
                };
                resolve(datas);
            });
        }).then((res: any) => {
            musics = res;
        })
        .catch((err: any) => {
            musics = {};
        })

        return musics;
    }
}

export default Music