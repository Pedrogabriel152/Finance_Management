import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Logo from "../../Components/Logo";
import { ContainerInterno, Container } from "./style";

// Interfaces
import { IForm } from "../../Interfaces/IForm";
import { IInput } from "../../Interfaces/IInput";

// Components
import Form from "../../Components/Form";
import IconesRodape from "../../Components/Icones";
import AbaLateral from "../../Components/AbaLateral";
import { useUserContext } from "../../Context/UserContext";
import { useReactiveVar } from "@apollo/client";
import { auteicacaoVar } from "../../Graphql/User/state";

const Login = () => {
    const { loading, login, SaveLocalStorage } = useUserContext();
    const [user, setUser] = useState<any>({});

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(user.email, user.password);
        SaveLocalStorage();
    }

    const inputs: IInput[] = [
        {
            svg: 'HiUserCircle',
            placeholder: 'E-mail',
            name: "email",
            type: "email",
            value: user.email,
            onChange: handleOnChange
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Senha',
            name: "password",
            type: "password",
            value: user.password,
            onChange: handleOnChange
        }
    ];

    const form: IForm = {
        inputs: inputs,
        link: 'Esqueceu a senha?',
        text: 'Login',
        submit: handleSubmit
    }

    return(
        <Container>
            <AbaLateral text="Login"/>
            <div>
                <ContainerInterno>
                    <Logo/>
                    <h1>LOGIN</h1>
                    <Form inputs={form.inputs} link={form.link} text={form.text} submit={handleSubmit}/>
                </ContainerInterno>
                <IconesRodape />
            </div>
        </Container>
    );
}

export default Login;