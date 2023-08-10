import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Interfaces
import { IForm } from "../../../Interfaces/IForm";
import { IInput } from "../../../Interfaces/IInput";

// Components
import Logo from "../../../Components/Logo";
import Form from "../../../Components/Form";
import IconesRodape from "../../../Components/Icones";
import AbaLateral from "../../../Components/AbaLateral";

// Styles
import { Container, ContainerInternoSingin } from "../style";

// Context
import { useUserContext } from "../../../Context/UserContext";

// Toastify
import { toast } from "react-toastify";

// Utils
import { api } from "../../../utils/api";
import { formartCPF, formatPhone } from "../../../utils/formater";

const Singin = () => {
    const { getAuthentication } = useUserContext();
    const navigate = useNavigate();
    const auth = getAuthentication();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        if(auth?.code == 200){
            navigate('/');
            toast.success('Bem vindo ao Accounting');
        }
    }, [auth]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'phone'){
            const phone = formatPhone(e.target.value);
            setUser({
                ...user,
                [e.target.name]: phone
            });
            return;
        }

        if(e.target.name == 'cpf'){
            const newCPF = formartCPF(e.target.value);
            setUser({
                ...user,
                [e.target.name]: newCPF
            })
            return;
        }
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validations
        if(!user.name){
            toast.error("O nome é obrigatório");
            return;
        }
        if(!user.email){
            toast.error("O email é obrigatório");
            return;
        }
        if(!user.cpf){
            toast.error("O cpf é obrigatório");
            return;
        }
        if(!user.phone){
            toast.error("O telefone é obrigatório");
            return;
        }
        if(!user.address){
            toast.error("O endereço é obrigatório");
            return;
        }
        if(!user.password){
            toast.error("A senha é obrigatória");
            return;
        }
        if(user.password !== user.confirmPassword){
            toast.error("As senhas precisam ser iguais");
            return;
        }

        api.post('/api/register', {
            email: user.email,
            name: user.name,
            cpf: user.cpf.replace(/\D/g, ''),
            address: user.address,
            password: user.password,
            phone: user.phone.replace(/\D/g, '')
        })
        .then((res: any) => {
            if(localStorage.getItem('@auth')){
                localStorage.removeItem('@auth');
            }
            localStorage.setItem('@auth', JSON.stringify(res.data));
            navigate('/');
            toast.success('Bem vindo ao sistema');
        })
        .catch((error: any) => {
            toast.error(error.response.data.message);
        })
    }

    const inputs: IInput[] = [
        {
            svg: 'HiUserCircle',
            placeholder: 'Nome',
            name: "name",
            type: "text",
            value: user.name,
            onChange: handleOnChange,
        },
        {
            svg: 'MdEmail',
            placeholder: 'E-mail',
            name: "email",
            type: "email",
            value: user.email,
            onChange: handleOnChange,
        },
        {
            svg: 'HiIdentification',
            placeholder: 'CPF',
            name: "cpf",
            type: "text",
            value: user.cpf,
            onChange: handleOnChange,
        },
        {
            svg: 'FaMapMarkedAlt',
            placeholder: 'Endereço',
            name: "address",
            type: "text",
            value: user.address,
            onChange: handleOnChange,
        },
        {
            svg: 'MdOutlinePhoneIphone',
            placeholder: 'Telefone',
            name: "phone",
            type: "tel",
            value: user.phone,
            onChange: handleOnChange,
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Senha',
            name: "password",
            type: "password",
            value: user.password,
            onChange: handleOnChange,
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Confirme sua senha',
            name: "confirmPassword",
            type: "password",
            value: user.confirmPassword,
            onChange: handleOnChange,
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