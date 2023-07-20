import { useParams } from "react-router-dom";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import AllExpenses from "./All";
import ActiveExpenses from "./Active";
import InactiveIncomes from "./Inactive";

// Styled
import { BoddyStyle } from "../style";

const Expenses = () => {
    const { status } = useParams();

    return (
        <BoddyStyle>
            <NavBar/>
            {status == 'all' && (
                <AllExpenses />
            )}
            {status == 'active' && (
                <ActiveExpenses />
            )}
            {status == 'inactive' && (
                <InactiveIncomes />
            )}
            <Footer/>
        </BoddyStyle>
    );
}

export default Expenses;