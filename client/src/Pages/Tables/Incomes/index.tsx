import { useParams } from "react-router-dom";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import AllIncomes from "./All";
import ActiveIncomes from "./Active";
import InactiveIncomes from "./Inactive";

// Styled
import { BoddyStyle } from "../style";
import { useFinancesContext } from "../../../Context/Finances";

const Incomes = () => {
    const { status } = useParams();
    const { payInstallmentIncome } = useFinancesContext();

    return (
        <BoddyStyle>
            <NavBar/>
            {status == 'all' && (
                <AllIncomes payInstallment={payInstallmentIncome}/>
            )}
            {status == 'active' && (
                <ActiveIncomes payInstallment={payInstallmentIncome}/>
            )}
            {status == 'inactive' && (
                <InactiveIncomes payInstallment={payInstallmentIncome}/>
            )}
            <Footer/>
        </BoddyStyle>
    );
}

export default Incomes;