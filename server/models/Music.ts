import pool from "../db/conn";

class Music 
{

    private name: string;
    private duration: string;


    public constructor(name: string, duration: string) {
        this.name = name;
        this.duration = duration;
    }
}

export default Music