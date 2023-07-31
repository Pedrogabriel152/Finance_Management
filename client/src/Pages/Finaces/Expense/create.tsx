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
import { IExpenseCreate } from "../../../Interfaces/IExpenseCreate";

// Context
import { useUserContext } from "../../../Context/UserContext";

// Toastify
import { toast } from "react-toastify";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { createExpenseVar } from "../../../Graphql/Expense/state";

const CreateExpense = () => {
    const { createExpense, getAuthentication } = useUserContext();
    const createResponse = useReactiveVar(createExpenseVar);
    const navigate = useNavigate();
    const [newExpense, setNewExpense] = useState<IExpenseCreate>({
        description: "",
        establishment: "",
        expires: "",
        installments: 0,
        installments_paid: 0,
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
            setNewExpense({
                ...newExpense,
                [e.target.name]: parseFloat(e.target.value.replace(/^0+(?!\.|$)/, ''))
            });
            return;
        }
        setNewExpense({
            ...newExpense,
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
            value: newExpense?.establishment? newExpense?.establishment : "",
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAA']
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Ex: teste",
            svg: "",
            type: "text",
            value: newExpense?.description? newExpense?.description : "",
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        },
        {
            label: "Mercadoria comprada: *",
            name: "merchandise_purchased",
            placeholder: "Ex: Tênis",
            svg: "",
            type: "text",
            value: newExpense?.merchandise_purchased,
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAA']
        },
        {
            label: "Quantidade de parcela: *",
            name: "installments",
            placeholder: "EX: 20",
            svg: "",
            type: "number",
            value: newExpense?.installments? newExpense?.installments : "",
            onChange: handleOnChange,
            mask: ['999999999']
        },
        {
            label: "Valor da parcela: *",
            name: "value_installment",
            placeholder: "Ex: 70,00",
            svg: "",
            type: "number",
            value: newExpense?.value_installment? newExpense?.value_installment : "",
            onChange: handleOnChange,
            mask: ['']
        },
        {
            label: "Quantidade de parcelas pagas: *",
            name: "installments_paid",
            placeholder: "Ex: 7",
            svg: "",
            type: "number",
            value: newExpense?.installments_paid? newExpense?.installments_paid : "",
            onChange: handleOnChange,
            mask: ['99999999']
        },
        {
            label: "Vencimento: *",
            name: "expires",
            placeholder: "Ex: 7",
            svg: "",
            type: "date",
            value: newExpense?.expires? newExpense?.expires : "",
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

        if(!newExpense.description || !newExpense.establishment || !newExpense.merchandise_purchased || !newExpense.value_installment || !newExpense.installments){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        if(newExpense.installments_paid > newExpense.installments) {
            toast.error("A quantidade de parcelas pagas tem que se ser menor ou igual ao total de parcelas");
            return;
        }

        createExpense(newExpense);

        if(createResponse?.code === 200) {
            toast.success(createResponse.message);
            navigate('/expenses/all/1')
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

export default CreateExpense;