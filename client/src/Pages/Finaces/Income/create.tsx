import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Style
import { BodyStyle, CreateStyle } from "../style";

// Component
import NavBar from "../../../Components/NavBar";
import Footer from "../../../Components/Footer";
import FormCreate from "../../../Components/FormCreate";

// Interface
import { IInput } from "../../../Interfaces/IInput";
import { IIncomeCreate } from "../../../Interfaces/IIncomeCreate";

// Context
import { useUserContext } from "../../../Context/UserContext";

// Toastify
import { toast } from "react-toastify";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { createIncomeVar } from "../../../Graphql/Incomes/state";

const CreateIncome = () => {
    const { createIncome, getAuthentication } = useUserContext();
    const createResponse = useReactiveVar(createIncomeVar);
    const navigate = useNavigate();
    const [newIncome, setNewIncome] = useState<IIncomeCreate>({
        description: "",
        establishment: "",
        expires: "",
        installments: 0,
        installments_received: 0,
        merchandise_purchased: "",
        value_installment: 0,
        user_id: 0,
    });
    const auth = getAuthentication();

    useEffect(() => {
        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Acesso negado!');
        }
    }, [auth]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'number') {
            setNewIncome({
                ...newIncome,
                [e.target.name]: e.target.value.replace(/^0+(?!\.|$)/, '')
            });
            return;
        }
        setNewIncome({
            ...newIncome,
            [e.target.name]: e.target.value
        });
    }

    const inputs: IInput[] = [
        {
            label: "Estabelecimento: *",
            name: "establishment",
            placeholder: "Ex: KSI",
            svg: "",
            type: "text",
            value: newIncome?.establishment? newIncome?.establishment : "",
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAA']
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Ex: teste",
            svg: "",
            type: "text",
            value: newIncome?.description? newIncome?.description : "",
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        },
        {
            label: "Mercadoria comprada: *",
            name: "merchandise_purchased",
            placeholder: "Ex: Tênis",
            svg: "",
            type: "text",
            value: newIncome?.merchandise_purchased,
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAA']
        },
        {
            label: "Quantidade de parcela: *",
            name: "installments",
            placeholder: "EX: 20",
            svg: "",
            type: "number",
            value: newIncome?.installments? newIncome?.installments : "",
            onChange: handleOnChange,
            mask: ['999999999']
        },
        {
            label: "Valor da parcela: *",
            name: "value_installment",
            placeholder: "Ex: 70,00",
            svg: "",
            type: "number",
            value: newIncome?.value_installment? newIncome?.value_installment : "",
            onChange: handleOnChange,
            mask: ['']
        },
        {
            label: "Quantidade de parcelas recebidas:",
            name: "installments_received",
            placeholder: "Ex: 7",
            svg: "",
            type: "number",
            value: newIncome?.installments_received? newIncome?.installments_received : "",
            onChange: handleOnChange,
            mask: ['99999999']
        },
        {
            label: "Vencimento: *",
            name: "expires",
            placeholder: "Ex: 7",
            svg: "",
            type: "date",
            value: newIncome?.expires? newIncome?.expires : "",
            onChange: handleOnChange,
            mask: ['']
        },

    ];

    const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Acesso negado!');
        }

        if(!newIncome.description || !newIncome.establishment || !newIncome.expires || !newIncome.installments || !newIncome.merchandise_purchased){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        if(newIncome.installments_received > newIncome.installments) {
            toast.error("A quantidade de parcelas recebidas tem que se ser menor ou igual ao total de parcelas");
            return;
        }

        createIncome(newIncome);

        if(createResponse?.code === 200) {
            toast.success(createResponse.message);
            navigate('/incomes/all/1')
            return;
        }

        toast.error(createResponse?.message);
    }

    return (
        <CreateStyle>
            <NavBar />
            <BodyStyle>
                <FormCreate data={inputs} onSubmit={handleOnSubmit} text="finance" button="Cadastrar"/>
            </BodyStyle>
            <Footer />
        </CreateStyle>
    );
}

export default CreateIncome;