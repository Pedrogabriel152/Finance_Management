import { ChangeEvent, useState } from "react";
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
import { toast } from "react-toastify";
import { api } from "../../../utils/api";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if(localStorage.getItem('@auth')){
            localStorage.removeItem('@auth');
        }
        console.log("User => ", user)
        api.get('/sanctum/csrf-cookie').then(response => {
            api.post('/api/login', {
                email: user.email,
                password: user.password
            })
            .then(async (res: any) => {
                try{
                    localStorage.setItem('@auth', JSON.stringify(res.data));
                }catch(error: any){
                    console.log(error);
                }
                navigate('/');
            })
            .catch((error: any) => {
                toast.error(error.response.data.message);
            })
        });
        
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