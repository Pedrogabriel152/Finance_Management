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
import { useGetJob } from "../../../Graphql/Job/hooks";
import { getJobVar, updateJobVar } from "../../../Graphql/Job/state";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import FormCreate from "../../../Components/FormCreate";
import ModalLoading from "../../../Components/ModalLoading";

// Interfaces
import { IInput } from "../../../Interfaces/IInput";
import { IJob } from "../../../Interfaces/IJob";

const Job = () => {
    const [job, setJob] = useState<IJob>();
    const { getAuthentication, logout } = useUserContext();
    const { updateJob } = useFinancesContext();
    const navigate = useNavigate();
    const auth = getAuthentication();
    const {id} = useParams();
    const { error } = useGetJob(id? parseInt(id) : 0, auth?.user_id? auth.user_id:0);
    const getJob = useReactiveVar(getJobVar);
    const updateResponse = useReactiveVar(updateJobVar);

    useEffect(() => {

        if(getJob) {
            setJob(getJob);
        }
    }, [getJob]);

    useEffect(() => {
        if(error) {
            navigate('/login');
            toast.error('Acesso negado!');
            logout();
        }
    }, [error])

    if(!job) {
        return (
            <>
            <NavBar />
            <ModalLoading/>
            <Footer />
            </>
        )
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === 'number') {     
            setJob({
                ...job,
                [e.target.name]: e.target.value.replace(/^0+(?!\.|$)/, '')
            });
            return;
        }
        setJob({
            ...job,
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
            value: job?.establishment? job?.establishment : "",
            onChange: handleOnChange,
        },
        {
            label: "Descrição: *",
            name: "description",
            placeholder: "Descrição",
            svg: "",
            type: "text",
            value: job?.description? job?.description : "",
            onChange: handleOnChange
        },
        {
            label: "Salário: *",
            name: "wage",
            placeholder: "Salário",
            svg: "",
            type: "number",
            value: job?.wage,
            onChange: handleOnChange,
        },
        {
            label: "Quando iniciou: *",
            name: "started",
            placeholder: "Entrou em",
            svg: "",
            type: "date",
            value: job?.started? job?.started : "",
            onChange: handleOnChange,
        },
        {
            label: "Quando saiu:",
            name: "leave",
            placeholder: "Saiu em",
            svg: "",
            type: "date",
            value: job?.leave? job?.leave : "",
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

        if(!job.description || !job.establishment || !job.started || !job.wage){
            toast.error("Todos os campos com * são obrigátorios");
            return;
        }

        updateJob(job.id? job.id : 0, job);

        if(updateResponse?.code === 200) {
            toast.success(updateResponse.message);
            navigate('/jobs/all/1')
            return;
        }
        toast.error(updateResponse?.message);
    }

    return (
        <>
        <NavBar />
        <BodyStyle>
            <FormCreate data={inputs} onSubmit={handleOnSubmit} text="job" button="Salvar"/>
        </BodyStyle>
        <Footer />
        </>
    );
}

export default Job;