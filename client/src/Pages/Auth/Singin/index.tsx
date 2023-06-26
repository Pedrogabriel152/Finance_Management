import React, { ChangeEvent, FormEvent, useState } from "react";
import { IForm } from "../../../Interfaces/IForm";
import { IInput } from "../../../Interfaces/IInput";
import Logo from "../../../Components/Logo";
import Form from "../../../Components/Form";
import { Container, ContainerInternoSingin } from "../style";
import IconesRodape from "../../../Components/Icones";
import AbaLateral from "../../../Components/AbaLateral";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";

const Singin = () => {
    const { login } = useUserContext();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(user.email, user.password);
        navigate('/');
    }

    const inputs: IInput[] = [
        {
            svg: 'HiUserCircle',
            placeholder: 'Nome',
            name: "name",
            type: "text",
            value: user.name,
            onChange: handleOnChange
        },
        {
            svg: 'MdEmail',
            placeholder: 'E-mail',
            name: "email",
            type: "email",
            value: user.email,
            onChange: handleOnChange
        },
        {
            svg: 'HiIdentification',
            placeholder: 'CPF',
            name: "cpf",
            type: "text",
            value: user.cpf,
            onChange: handleOnChange
        },
        {
            svg: 'FaMapMarkedAlt',
            placeholder: 'Endereço',
            name: "address",
            type: "text",
            value: user.address,
            onChange: handleOnChange
        },
        {
            svg: 'MdOutlinePhoneIphone',
            placeholder: 'Telefone',
            name: "phone",
            type: "email",
            value: user.phone,
            onChange: handleOnChange
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Senha',
            name: "password",
            type: "password",
            value: user.password,
            onChange: handleOnChange
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Confirme sua senha',
            name: "confirmPassword",
            type: "password",
            value: user.confirmPassword,
            onChange: handleOnChange
        }
    ];

    const form: IForm = {
        inputs: inputs,
        link: 'Já possui uma conta?',
        text: 'Register',
        submit: handleSubmit
    }

    return(
        <Container>
            <AbaLateral text="Register"/>
            <div>
                <ContainerInternoSingin>
                    <Logo tipo="Register"/>
                    <h1>SING IN</h1>
                    <Form inputs={form.inputs} link={form.link} text={form.text} submit={handleSubmit}/>
                </ContainerInternoSingin>
                <IconesRodape />
            </div>
        </Container>
    );
}

export default Singin;