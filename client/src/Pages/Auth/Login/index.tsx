import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Logo";

// Styles
import { ContainerInternoLogin, Container } from "../style";

// Interfaces
import { IForm } from "../../../Interfaces/IForm";
import { IInput } from "../../../Interfaces/IInput";

// Components
import Form from "../../../Components/Form";
import IconesRodape from "../../../Components/Icones";
import AbaLateral from "../../../Components/AbaLateral";
import { useUserContext } from "../../../Context/UserContext";

const Login = () => {
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
                <ContainerInternoLogin>
                    <Logo tipo="login"/>
                    <h1>LOGIN</h1>
                    <Form inputs={form.inputs} link={form.link} text={form.text} submit={handleSubmit}/>
                </ContainerInternoLogin>
                <IconesRodape />
            </div>
        </Container>
    );
}

export default Login;