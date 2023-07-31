import { ChangeEvent, useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import { BodyStyle } from "../style";
import { IIncome } from "../../../Interfaces/IIncome";
import { useGetIncome } from "../../../Graphql/Incomes/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { getIncomeVar } from "../../../Graphql/Incomes/state";
import FormCreate from "../../../Components/FormCreate";
import { IInput } from "../../../Interfaces/IInput";
import { useUserContext } from "../../../Context/UserContext";
import { toast } from "react-toastify";

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
            min: 1,
            value: income?.establishment? income?.establishment : "",
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAA']
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Ex: teste",
            svg: "",
            type: "text",
            min: 1,
            value: income?.description? income?.description : "",
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA']
        },
        {
            label: "Mercadoria comprada: *",
            name: "merchandise_purchased",
            placeholder: "Ex: Tênis",
            svg: "",
            type: "text",
            min: 1,
            value: income?.merchandise_purchased,
            onChange: handleOnChange,
            mask: ['AAAAAAAAAAAAAA']
        },
        {
            label: "Quantidade de parcela: *",
            name: "installments",
            placeholder: "EX: 20",
            svg: "",
            type: "number",
            min: 1,
            value: income?.installments? income?.installments : "",
            onChange: handleOnChange,
            mask: ['999999999']
        },
        {
            label: "Valor da parcela: *",
            name: "value_installment",
            placeholder: "Ex: 70,00",
            svg: "",
            type: "number",
            min: 1,
            value: income?.value_installment? income?.value_installment : "",
            onChange: handleOnChange,
            mask: ['']
        },
        {
            label: "Quantidade de parcelas recebidas:",
            name: "installments_received",
            placeholder: "Ex: 7",
            svg: "",
            type: "number",
            min: 1,
            value: income?.installments_received? income?.installments_received : "",
            onChange: handleOnChange,
            mask: ['99999999']
        },
        {
            label: "Vencimento: *",
            name: "expires",
            placeholder: "Ex: 7",
            svg: "",
            type: "date",
            min: 1,
            value: income?.expires? income?.expires : "",
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
            return;
        }

        if(!income.description || !income.establishment || !income.expires || !income.installments || !income.merchandise_purchased){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        if(installmentsReceived < income.installments){
            toast.error("O valor de parcelas não pode ser menor que o valor de parcelas pagas.");
            return;
        }
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