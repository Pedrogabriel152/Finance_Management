import { useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import { BodyStyle } from "../style";
import { IIncome } from "../../../Interfaces/IIncome";
import { useGetIncome } from "../../../Graphql/Incomes/hooks";
import { useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { getIncomeVar } from "../../../Graphql/Incomes/state";

const Income = () => {
    const [income, setIncome] = useState<IIncome>();
    const {id} = useParams();
    useGetIncome(id? parseInt(id) : 0);
    const getIncome = useReactiveVar(getIncomeVar);

    useEffect(() => {

        if(getIncome) {
            setIncome(getIncome);
        }
    }, [getIncome])

    if(!income) {
        return <div></div>
    }

    return (
        <>
        <NavBar />
        <BodyStyle>
            
        </BodyStyle>
        <Footer />
        </>
    );
}

export default Income;