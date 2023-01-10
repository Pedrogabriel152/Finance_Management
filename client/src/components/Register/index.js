import React, { useState, useEffect } from "react";
import '../../css/all.css';
import axios from 'axios';
import Navegacao from "../Navegacao";
import Rodape from "../Rodape"

function Register(){

    const [ name, setName ] = useState()
    const [ cpf, setCpf ] = useState()
    const [ password, setPassword ] = useState()
    const [ confirmpassword, setConfirmpassword ] = useState()

    const cadastrar = () => {  

        if(password !== confirmpassword){
            alert("Senhas precião ser iguais")
            return
        }

        axios.post('http://localhost:3001/register', {
            name: name,
            cpf: cpf,
            password: password
        })
        .then( response => {
            console.log(response)
        })
        .catch(err => console.log(err))

    }

    return(
        <div>
           <Navegacao />

            <div className="register-container">
                <h1>Registrar:</h1>
                <div className="register-form">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" name="name" placeholder="Digite seu nome" onChange={e => setName(e.target.value)}/>
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" placeholder="Digite seu cpf" onChange={e => setCpf(e.target.value)}/>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" placeholder="Digite a senha" onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="confirmpassword">Confirmação a Senha:</label>
                    <input type="password" name="confirmpassword" placeholder="Confirme a senha" onChange={e => setConfirmpassword(e.target.value)}/>
                    <button onClick={cadastrar}>Cadastrar</button>

                    <p>Já tem uma conta <a href="/login">Clique aqui!</a></p>
                </div>
            </div>

            <Rodape />
        </div>
    );
}

export default Register;