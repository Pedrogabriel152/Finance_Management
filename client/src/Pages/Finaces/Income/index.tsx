import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Styled
import { BodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Context
import { useUserContext } from "../../../Context/UserContext";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { getIncomeVar } from "../../../Graphql/Incomes/state";
import { useGetIncome } from "../../../Graphql/Incomes/hooks";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import FormCreate from "../../../Components/FormCreate";

// Interfaces
import { IInput } from "../../../Interfaces/IInput";
import { IIncome } from "../../../Interfaces/IIncome";

const Income = () => {
    const [income, setIncome] = useState<IIncome>();
    const [installmentsReceived, setInstallmentsReceived] = useState<number>(0);
    const { createIncome, getAuthentication } = useUserContext();
    const navigate = useNavigate();
    const auth = getAuthentication();
    const {id} = useParams();
    useGetIncome(id? parseInt(id) : 0, auth?.user_id? auth.user_id:0);
    const getIncome = useReactiveVar(getIncomeVar);

    useEffect(() => {

        if(getIncome) {
            setIncome(getIncome);
            setInstallmentsReceived(getIncome.installments_received);
        }
    }, [getIncome])

    if(!income) {
        return <div></div>
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'number') {
            if(e.target.name === "installments_received") {
                setInstallmentsReceived(parseInt(e.target.value));
            }     
            setIncome({
                ...income,
                [e.target.name]: e.target.value.replace(/^0+(?!\.|$)/, '')
            });
            return;
        }
        setIncome({
            ...income,
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
            value: income?.establishment? income?.establishment : "",
            onChange: handleOnChange
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Ex: teste",
            svg: "",
            type: "text",
            value: income?.description? income?.description : "",
            onChange: handleOnChange,
        },
        {
            label: "Mercadoria comprada: *",
            name: "merchandise_purchased",
            placeholder: "Ex: Tênis",
            svg: "",
            type: "text",
            value: income?.merchandise_purchased,
            onChange: handleOnChange,
        },
        {
            label: "Quantidade de parcela: *",
            name: "installments",
            placeholder: "EX: 20",
            svg: "",
            type: "number",
            value: income?.installments? income?.installments : "",
            onChange: handleOnChange,
        },
        {
            label: "Valor da parcela: *",
            name: "value_installment",
            placeholder: "Ex: 70,00",
            svg: "",
            type: "number",
            value: income?.value_installment? income?.value_installment : "",
            onChange: handleOnChange,
        },
        {
            label: "Vencimento: *",
            name: "expires",
            placeholder: "Ex: 7",
            svg: "",
            type: "date",
            value: income?.expires? income?.expires : "",
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

        if(!income.description || !income.establishment || !income.expires || !income.installments || !income.merchandise_purchased){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        if(installmentsReceived > income.installments){
            toast.error("O valor de parcelas não pode ser menor que o valor de parcelas pagas.");
            return;
        }
        console.log(income);
    }

    return (
        <>
        <NavBar />
        <BodyStyle>
            <FormCreate data={inputs} onSubmit={handleOnSubmit} text="finance" button="Salvar"/>
        </BodyStyle>
        <Footer />
        </>
    );
}

export default Income;