import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Style
import { BodyStyle, CreateStyle } from "./style";

// Component
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import FormCreate from "../../Components/FormCreate";

// Interface
import { IInput } from "../../Interfaces/IInput";
import { IJobCreate } from "../../Interfaces/IJobCreate";

// Context
import { useUserContext } from "../../Context/UserContext";

// Toastify
import { toast } from "react-toastify";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { createExpenseVar } from "../../Graphql/Expense/state";

const CreateExpense = () => {
    const { createJob, getAuthentication } = useUserContext();
    const createResponse = useReactiveVar(createExpenseVar);
    const navigate = useNavigate();
    const [newExpense, setNewExpense] = useState<IJobCreate>({
        description: "",
        establishment: "",
        started: "",
        user_id: 0,
        wage: '',
    });


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'number') {
            setNewExpense({
                ...newExpense,
                [e.target.name]: e.target.value.replace(/^0+(?!\.|$)/, '')
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
            placeholder: "Estabelecimento",
            svg: "",
            type: "text",
            value: newExpense?.establishment? newExpense?.establishment : "",
            onChange: handleOnChange
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Descrição",
            svg: "",
            type: "text",
            value: newExpense?.description? newExpense?.description : "",
            onChange: handleOnChange
        },
        {
            label: "Salário: *",
            name: "wage",
            placeholder: "Salário",
            svg: "",
            type: "number",
            value: newExpense?.wage,
            onChange: handleOnChange
        },
        {
            label: "Quando iniciou: *",
            name: "started",
            placeholder: "Entrou em",
            svg: "",
            type: "date",
            value: newExpense?.started? newExpense?.started : "",
            onChange: handleOnChange
        },
        {
            label: "Quando saiu:",
            name: "leave",
            placeholder: "Saiu em",
            svg: "",
            type: "date",
            value: newExpense?.leave? newExpense?.leave : "",
            onChange: handleOnChange
        },

    ];

    const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth = getAuthentication();

        if(!newExpense.description || !newExpense.establishment || !newExpense.started || !newExpense.wage){
            toast.error("Todos os campos com * são obrigátorios");
        }

        createJob(newExpense);

        if(createResponse?.code === 200) {
            toast.success(createResponse.message);
            navigate('/jobs/all/1')
            return;
        }

        toast.error(createResponse?.message);
    }

    return (
        <CreateStyle>
            <NavBar />
            <BodyStyle>
                <FormCreate data={inputs} onSubmit={handleOnSubmit}/>
            </BodyStyle>
            <Footer />
        </CreateStyle>
    );
}

export default CreateExpense;