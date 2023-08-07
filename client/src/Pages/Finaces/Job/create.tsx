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
import { IJobCreate } from "../../../Interfaces/IJobCreate";

// Context
import { useUserContext } from "../../../Context/UserContext";
import { useFinancesContext } from "../../../Context/Finances";

// Toastify
import { toast } from "react-toastify";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { createJobVar } from "../../../Graphql/Job/state";

const CreateJob = () => {
    const { getAuthentication } = useUserContext();
    const { createJob } = useFinancesContext();
    const createResponse = useReactiveVar(createJobVar);
    const navigate = useNavigate();
    const [newJob, setNewJob] = useState<IJobCreate>({
        description: "",
        establishment: "",
        started: "",
        user_id: 0,
        wage: '',
    });
    const auth = getAuthentication();

    useEffect(() => {
        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Acesso negado!');
        }
    }, [auth])

    useEffect(() => {
        if(createResponse?.code === 200) {
            toast.success(createResponse.message);
            navigate('/jobs/all/1');
        }
    }, [createResponse])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'number') {
            setNewJob({
                ...newJob,
                [e.target.name]: e.target.value.replace(/^0+(?!\.|$)/, '')
            });
            return;
        }

        setNewJob({
            ...newJob,
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
            value: newJob?.establishment? newJob?.establishment : "",
            onChange: handleOnChange,
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Descrição",
            svg: "",
            type: "text",
            value: newJob?.description? newJob?.description : "",
            onChange: handleOnChange
        },
        {
            label: "Salário: *",
            name: "wage",
            placeholder: "Salário",
            svg: "",
            type: "number",
            value: newJob?.wage,
            onChange: handleOnChange,
        },
        {
            label: "Quando iniciou: *",
            name: "started",
            placeholder: "Entrou em",
            svg: "",
            type: "date",
            value: newJob?.started? newJob?.started : "",
            onChange: handleOnChange,
        },
        {
            label: "Quando saiu:",
            name: "leave",
            placeholder: "Saiu em",
            svg: "",
            type: "date",
            value: newJob?.leave? newJob?.leave : "",
            onChange: handleOnChange,
        },

    ];

    const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth = getAuthentication();

        if(!auth || auth.code !== 200){
            navigate('/login');
            toast.error('Acesso negado!');
        }

        if(!newJob.description || !newJob.establishment || !newJob.started || !newJob.wage){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        createJob(newJob);

        if(createResponse?.code === 200) {
            toast.success(createResponse.message);
            navigate('/jobs/all/1')
            return;
        }

        toast.error(createResponse?.message);
    }

    return(
        <CreateStyle>
            <NavBar />
            <BodyStyle>
                <FormCreate data={inputs} onSubmit={handleOnSubmit} text="job" button="Cadastrar"/>
            </BodyStyle>
            <Footer />
        </CreateStyle>
    );
}

export default CreateJob;