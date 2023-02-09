import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

// Layouts
import Input from "../../Layout/Input/Input";

// CSS
import styles from '../Register/Register.module.css';

interface RecordCompany {
    email: string
    password: string
}

const Login = () => {

    const [recordCompany, setRecordCompany] = useState<RecordCompany>({email: '',password: ''})
    const { login } = useAuth()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecordCompany({...recordCompany, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Salvando Company no banco
        login(recordCompany)
    }

    return (
        <div className={styles.containner}>
            <h1>Login</h1>
        
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    handleOnChange={handleOnChange}
                    name="email"
                    placeholder="Digite seu e-mail"
                    text="E-mail"
                    type="email"
                    value={recordCompany.email}
                />

                <Input 
                    handleOnChange={handleOnChange}
                    name="password"
                    placeholder="Digite sua senha"
                    text="Senha"
                    type="password"
                    value={recordCompany.password}
                />

                <input type="submit" value="Entrar" />
            </form>

            <p>Cadastre-se <Link to="/login">Clique aqui</Link></p>
        </div>
    )
}

export default Login