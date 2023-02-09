import React, { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

// CSS
import styles from './Register.module.css';

// FORM
import Input from "../../Layout/Input/Input";

// API
import api from "../../../utils/api";

// Interfaces
import IRecordCompany from "../../../interfaces/IRecordCompany";
import useAuth from "../../../Hooks/useAuth";

const Register = () => {

    const [recordCompany, setRecordCompany] = useState<IRecordCompany>({name: '', email: '', confirmpassword: '', password: '', site: ''})
    const { register } = useAuth()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecordCompany({...recordCompany, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Salvando Company no banco
        register(recordCompany)
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

                <Input 
                    handleOnChange={handleOnChange}
                    name="password"
                    placeholder="Digite uma senha"
                    text="Senha"
                    type="password"
                    value={recordCompany.password}
                />

                <Input 
                    handleOnChange={handleOnChange}
                    name="confirmpassword"
                    placeholder="Confimer sua senha"
                    text="Confirme sua senha"
                    type="password"
                    value={recordCompany.confirmpassword}
                />

                <input type="submit" value="Cadastrar" />
            </form>

            <p>Já tem uma conta? <Link to="/login">Clique aqui</Link></p>
        </div>
    )
}

export default Register;