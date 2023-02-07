import React, { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

// CSS
import styles from './Register.module.css';

// FORM
import Input from "../../Layout/Input/Input";

// API
import api from "../../../utils/api";

interface RecordCompany {
    name: string | ''
    email: string | ''
    site: string | ''
    password: string | ''
    confirmpassword: string | ''
}

const Login = () => {

    const [recordCompany, setRecordCompany] = useState<RecordCompany>({name: '', email: '', confirmpassword: '', password: '', site: ''})

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecordCompany({...recordCompany, [e.target.name]: e.target.value})
        console.log(e.target.name)
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        api.post("recordcompany/register", recordCompany)
    }

    return (
        <div className={styles.containner}>
            <h1>Registrar</h1>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    handleOnChange={handleOnChange}
                    name="name"
                    placeholder="Digite o nome da gravadora"
                    text="Nome da Gravadora"
                    type="text"
                    value={recordCompany.name}
                />
                <Input 
                    handleOnChange={handleOnChange}
                    name="email"
                    placeholder="Digite o email da gravadora"
                    text="E-mail da Gravadora"
                    type="email"
                    value={recordCompany.email}
                />
                <Input 
                    handleOnChange={handleOnChange}
                    name="site"
                    placeholder="Digite o site da gravadora"
                    text="Site da Gravadora"
                    type="text"
                    value={recordCompany.site}
                />

                <input type="submit" value="Cadastrar" />
            </form>

            <p>Já tem uma conta? <Link to="/login">Clique aqui</Link></p>
        </div>
    )
}

export default Login;