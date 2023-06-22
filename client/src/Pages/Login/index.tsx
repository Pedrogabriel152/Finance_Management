import React, { ChangeEvent, useState } from "react";
import Logo from "../../Components/Logo";
import { ContainerInterno, Container } from "./style";
import Form from "../../Components/Form";
import { IForm } from "../../Interfaces/IForm";
import { IInput } from "../../Interfaces/IInput";
import IconesRodape from "../../Components/Icones";
import { Link } from "react-router-dom";
import AbaLateral from "../../Components/AbaLateral";

const Login = () => {
    const [email, setEmail] = useState<string>('');

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    }

    const inputs: IInput[] = [
        {
            svg: 'HiUserCircle',
            placeholder: 'E-mail',
            name: "email",
            type: "email",
            value: email,
            onChange: handleOnChange
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Senha',
            name: "password",
            type: "password",
            value: email,
            onChange: handleOnChange
        }
    ];
    // RiLockPasswordFill

    const form: IForm = {
        inputs: inputs,
        link: 'Esqueceu a senha?',
        text: 'Login'
    }

    return(
        <Container>
            <AbaLateral text="Login"/>
            <div>
                <ContainerInterno>
                    <Logo/>
                    <h1>LOGIN</h1>
                    <Form inputs={form.inputs} link={form.link} text={form.text}/>
                </ContainerInterno>
                <IconesRodape />
            </div>
        </Container>
    );
}

export default Login;