import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// GraphQL
import { useGetUser } from "../../Graphql/User/hooks";
import { useReactiveVar } from "@apollo/client";
import { editUserVar, getUserVar } from "../../Graphql/User/state";

// Toastify
import { toast } from "react-toastify";

// Utils
import { formartCPF, formatPhone } from "../../utils/formater";

// Styled
import { DataBodyStyle } from "../Tables/style";
import { BodyStyle } from "../Home/style";

// Interfaces
import { IInput } from "../../Interfaces/IInput";
import { IUser } from "../../Interfaces/IUser";

// Context
import { useUserContext } from "../../Context/UserContext";

// Components
import ModalLoading from "../../Components/ModalLoading";
import FormCreate from "../../Components/FormCreate";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";

const Profile = () => {
    const [user, setUser] = useState<IUser>();
    useGetUser();
    const { getAuthentication, updateUser } = useUserContext();
    const getUser = useReactiveVar(getUserVar);
    const auth = getAuthentication();
    const navigate = useNavigate();
    const updateResponse = useReactiveVar(editUserVar);

    useEffect(() => {
        if(auth.code !== 200){
            navigate('/');
            toast.error('Acesso negado');
            return;
        }
    }, [auth]);

    useEffect(() => {
        if(getUser) {
            setUser(getUser);
        }
    }, [getUser]);

    useEffect(() => {
        if(updateResponse?.code === 200){
            toast.success(updateResponse.message);
            return;
        }
        toast.error(updateResponse?.message);
    }, [updateResponse]);

    if(!user){
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

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
            const result = formartCPF(e.target.value);
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

        if(user.password) {
            if(!user.confirmPassword){
                toast.error("A confirmação de senha é obrigátoria");
                return;
            }
            if(user.password !== user.confirmPassword){
                toast.error("As senhas precisam ser igauis");
                return;
            }
        }

        updateUser(user);

        if(updateResponse?.code === 200) {
            toast.success(updateResponse.message);
            return;
        }
        toast.error(updateResponse?.message);
    }

    const inputs: IInput[] = [
        {
            label: "Nome:",
            svg: 'HiUserCircle',
            placeholder: 'Nome',
            name: "name",
            type: "text",
            value: user.name,
            onChange: handleOnChange,
        },
        {
            label: "E-mail:",
            svg: 'MdEmail',
            placeholder: 'E-mail',
            name: "email",
            type: "email",
            value: user.email,
            onChange: handleOnChange,
        },
        {
            label: "CPF:",
            svg: 'HiIdentification',
            placeholder: 'CPF',
            name: "cpf",
            type: "text",
            value: formartCPF(user.cpf),
            onChange: handleOnChange,
        },
        {
            label: "Endereço:",
            svg: 'FaMapMarkedAlt',
            placeholder: 'Endereço',
            name: "address",
            type: "text",
            value: user.address,
            onChange: handleOnChange,
        },
        {
            label: "Telefone:",
            svg: 'MdOutlinePhoneIphone',
            placeholder: 'Telefone',
            name: "phone",
            type: "tel",
            value: formatPhone(user.phone),
            onChange: handleOnChange,
        },
        {
            label: "Senha:",
            svg: 'RiLockPasswordFill',
            placeholder: 'Senha',
            name: "password",
            type: "password",
            value: user.password? user.password : '',
            onChange: handleOnChange,
        },
        {
            label: "Confirme a senha:",
            svg: 'RiLockPasswordFill',
            placeholder: 'Confirme sua senha',
            name: "confirmPassword",
            type: "password",
            value: user.confirmPassword? user.confirmPassword : '',
            onChange: handleOnChange,
        }
    ];

    return (
        <>
        <NavBar />
        <BodyStyle>
            <FormCreate data={inputs} text={"editFinance"} onSubmit={handleSubmit} button="Salvar"/>
        </BodyStyle>
        <Footer />
        </>
        
    );
}

export default Profile;