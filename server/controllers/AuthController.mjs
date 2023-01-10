import bcrypt from 'bcrypt'
import pool from '../db/conn.mjs'

class AuthController{

    static registerPost(req, res){

        const { name, cpf, password } = req.body

        let checkIfCPFExists

        let user

        console.log(name)

        let SQL = `SELECT cpf FROM usuario WHERE cpf = ?`

        
        pool.query(SQL,cpf, (err, data) => {
            if(err){
                console.log(err)
            }

            const dados = data[0]

            console.log(dados)

            if(dados){
                res.json({
                    error: "Usuario já existe"
                })
                return
            }   
            
        })

        // CRIAR A SENHA
        const salt = bcrypt.genSaltSync(10)
        const hashedPassoword = bcrypt.hashSync(password, salt)

        SQL = `INSERT INTO usuario (nome, cpf, senha) VALES(?,?,?)`

        console.log(password)

        const data = [name, cpf, hashedPassoword]
        
        pool.query(SQL, data, (err, result) => {
            
            if(err){
                console.log(err)
                return
            }
            
            res.json({
                acao: "Realizada com sucesso"
            })
        })

    }

}

export default AuthController