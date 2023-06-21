import React, { ChangeEvent, useState } from "react";
import Logo from "../../Components/Logo";
import { Container } from "./style";
import Form from "../../Components/Form";
import { IForm } from "../../Interfaces/IForm";
import { IInput } from "../../Interfaces/IInput";

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
            <Logo/>
            <Form inputs={form.inputs} link={form.link} text={form.text}/>
        </Container>
    );
}

export default Login;