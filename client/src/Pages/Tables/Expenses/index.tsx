import { useParams } from "react-router-dom";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import AllExpenses from "./All";
import ActiveExpenses from "./Active";
import InactiveIncomes from "./Inactive";

// Styled
import { BoddyStyle } from "../style";
import { useFinancesContext } from "../../../Context/Finances";

const Expenses = () => {
    const { status } = useParams();
    const { payInstallmentExpense } = useFinancesContext();

    return (
        <BoddyStyle>
            <NavBar/>
            {status == 'all' && (
                <AllExpenses payInstallment={payInstallmentExpense}/>
            )}
            {status == 'active' && (
                <ActiveExpenses payInstallment={payInstallmentExpense}/>
            )}
            {status == 'inactive' && (
                <InactiveIncomes payInstallment={payInstallmentExpense}/>
            )}
            <Footer/>
        </BoddyStyle>
    );
}

export default Expenses;