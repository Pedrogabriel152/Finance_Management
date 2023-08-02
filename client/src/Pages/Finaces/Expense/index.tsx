import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Styled
import { BodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Context
import { useUserContext } from "../../../Context/UserContext";
import { useFinancesContext } from "../../../Context/Finances";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { getIncomeVar, updateIncomeVar } from "../../../Graphql/Incomes/state";
import { useGetIncome } from "../../../Graphql/Incomes/hooks";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import FormCreate from "../../../Components/FormCreate";

// Interfaces
import { IInput } from "../../../Interfaces/IInput";
import { IIncome } from "../../../Interfaces/IIncome";
import { IExpense } from "../../../Interfaces/IExpense";
import { useGetExpense } from "../../../Graphql/Expense/hooks";
import { getExpenseVar, updateExpenseVar } from "../../../Graphql/Expense/state";

const Expense = () => {
    const [expense, setExpense] = useState<IExpense>();
    const [installmentsPaids, setInstallmentsPaids] = useState<number>(0);
    const { getAuthentication } = useUserContext();
    const { updateExpense } = useFinancesContext();
    const navigate = useNavigate();
    const auth = getAuthentication();
    const {id} = useParams();
    useGetExpense(id? parseInt(id) : 0, auth?.user_id? auth.user_id:0);
    const getExpense = useReactiveVar(getExpenseVar);
    const updateResponse = useReactiveVar(updateExpenseVar);

    useEffect(() => {

        if(getExpense) {
            setExpense(getExpense);
            setInstallmentsPaids(getExpense.installments_paid);
        }
    }, [getExpense])

    if(!expense) {
        return <div></div>
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'number') {
            if(e.target.name === "installments_paid") {
                setInstallmentsPaids(parseInt(e.target.value));
            }     
            setExpense({
                ...expense,
                [e.target.name]: e.target.value.replace(/^0+(?!\.|$)/, '')
            });
            return;
        }
        setExpense({
            ...expense,
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
            value: expense?.establishment? expense?.establishment : "",
            onChange: handleOnChange
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Ex: teste",
            svg: "",
            type: "text",
            value: expense?.description? expense?.description : "",
            onChange: handleOnChange,
        },
        {
            label: "Mercadoria comprada: *",
            name: "merchandise_purchased",
            placeholder: "Ex: Tênis",
            svg: "",
            type: "text",
            value: expense?.merchandise_purchased,
            onChange: handleOnChange,
        },
        {
            label: "Quantidade de parcela: *",
            name: "installments",
            placeholder: "EX: 20",
            svg: "",
            type: "number",
            value: expense?.installments? expense?.installments : "",
            onChange: handleOnChange,
        },
        {
            label: "Valor da parcela: *",
            name: "value_installment",
            placeholder: "Ex: 70,00",
            svg: "",
            type: "number",
            value: expense?.value_installment? expense?.value_installment : "",
            onChange: handleOnChange,
        },
        {
            label: "Quantidade de parcelas pagas:",
            name: "installments_paid",
            placeholder: "Ex: 7",
            svg: "",
            type: "number",
            value: expense?.installments_paid? expense?.installments_paid : 0,
            disabled: true,
            onChange: handleOnChange,
        },
        {
            label: "Vencimento: *",
            name: "expires",
            placeholder: "Ex: 7",
            svg: "",
            type: "date",
            value: expense?.expires? expense?.expires : "",
            onChange: handleOnChange,
        },
    ];

    const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Acesso negado!');
            return;
        }

        if(!expense.description || !expense.establishment || !expense.expires || !expense.installments || !expense.merchandise_purchased){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        if(installmentsPaids > expense.installments){
            toast.error("O valor de parcelas não pode ser menor que o valor de parcelas pagas.");
            return;
        }

        updateExpense(expense.id, expense);

        if(updateResponse?.code === 200) {
            toast.success(updateResponse.message);
            navigate('/expenses/all/1')
            return;
        }

        toast.error(updateResponse?.message);
    }

    return (
        <>
        <NavBar />
        <BodyStyle>
            <FormCreate data={inputs} onSubmit={handleOnSubmit} text="editFinance" button="Salvar"/>
        </BodyStyle>
        <Footer />
        </>
    );
}

export default Expense;