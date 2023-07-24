import { useState } from "react";
import { BodyStyle, CreateStyle } from "./style";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import FormCreate from "../../Components/FormCreate";
import { IInput } from "../../Interfaces/IInput";
import { IJobCreate } from "../../Interfaces/IJobCreate";

const CreateJob = () => {
    const [newJob, setNewJob] = useState<IJobCreate>({
        description: "",
        establishment: "",
        started: "",
        user_id: 0,
        wage: 0,
    });


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJob({
            ...newJob,
            [e.target.name]: e.target.value
        });
    }

    const inputs: IInput[] = [
        {
            label: "Estabelecimento:",
            name: "establishment",
            placeholder: "Estabelecimento",
            svg: "",
            type: "text",
            value: newJob?.establishment? newJob?.establishment : "",
            onChange: handleOnChange
        },
        {
            label: "Descrição",
            name: "description",
            placeholder: "Descrição",
            svg: "",
            type: "text",
            value: newJob?.description? newJob?.description : "",
            onChange: handleOnChange
        },
        {
            label: "Salário:",
            name: "wage",
            placeholder: "Salário",
            svg: "",
            type: "number",
            value: newJob?.wage,
            onChange: handleOnChange
        },
        {
            label: "Quando entrou do Trabalho:",
            name: "started",
            placeholder: "Entrou em",
            svg: "",
            type: "date",
            value: newJob?.started? newJob?.started : "",
            onChange: handleOnChange
        },
        {
            label: "Quando saiu do Trabalho:",
            name: "leave",
            placeholder: "Saiu em",
            svg: "",
            type: "date",
            value: newJob?.leave? newJob?.leave : "",
            onChange: handleOnChange
        },

    ];

    return(
        <CreateStyle>
            <NavBar />
            <BodyStyle>
                <FormCreate data={inputs}/>
            </BodyStyle>
            <Footer />
        </CreateStyle>
    );
}

// "job": {
//     "description": "",
//     "wage": 200,
//     "establishment": "KSI",
//     "started": "01/02/2023",
//     "leave": "30/03/2023",
//     "user_id": 2
// }

// "expense": {
//     "description": "",
//     "merchandise_purchased": "sdas",
//     "establishment": "KSI",
//     "installments": 20,
//     "value_installment": 50,
//     "installments_paid": 0,
//     "expires": "30/06/2023",
//     "user_id": 2
// }

// "income": {
//     "description": "",
//     "establishment": "KSI",
//     "installments": 20,
//     "value_installment": 10,
//     "installments_received": 0,
//     "expires": "28/06/2023",
//     "user_id": 2,
//     "merchandise_purchased":"asd"
// }

export default CreateJob;