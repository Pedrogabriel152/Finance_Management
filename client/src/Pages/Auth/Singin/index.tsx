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
import { toast } from "react-toastify";
import { api } from "../../../utils/api";

const Singin = () => {
    const { authentication } = useUserContext();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        if(authentication?.code == 200){
            navigate('/');
            toast.success('Bem vindo ao Accounting');
        }
    }, [authentication])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'phone'){
            const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
            var str = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
            const result = str.replace(regex, "($1)$2-$3");
            setUser({
                ...user,
                [e.target.name]: result
            });
            return;
        }

        if(e.target.name == 'cpf'){
            const result = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
            setUser({
                ...user,
                [e.target.name]: result
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
            cpf: user.cpf,
            address: user.address,
            password: user.password,
            phone: user.phone
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
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        },
        {
            svg: 'MdEmail',
            placeholder: 'E-mail',
            name: "email",
            type: "email",
            value: user.email,
            onChange: handleOnChange,
            mask: ['']
        },
        {
            svg: 'HiIdentification',
            placeholder: 'CPF',
            name: "cpf",
            type: "text",
            value: user.cpf,
            onChange: handleOnChange,
            mask: ['999.999.999-99']
        },
        {
            svg: 'FaMapMarkedAlt',
            placeholder: 'Endereço',
            name: "address",
            type: "text",
            value: user.address,
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        },
        {
            svg: 'MdOutlinePhoneIphone',
            placeholder: 'Telefone',
            name: "phone",
            type: "tel",
            value: user.phone,
            onChange: handleOnChange,
            mask: ['(99) 9 9999-9999', '(99) 9999-9999']
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Senha',
            name: "password",
            type: "password",
            value: user.password,
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        },
        {
            svg: 'RiLockPasswordFill',
            placeholder: 'Confirme sua senha',
            name: "confirmPassword",
            type: "password",
            value: user.confirmPassword,
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
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