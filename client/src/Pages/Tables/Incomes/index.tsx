import { useParams } from "react-router-dom";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import AllIncomes from "./All";
import InactiveIncomes from "./Active";
import ActiveIncomes from "./Inactive";

// Styled
import { BoddyStyle } from "../style";

const Incomes = () => {
    const { status } = useParams();

    return (
        <BoddyStyle>
            <NavBar/>
            {status == 'all' && (
                <AllIncomes />
            )}
            {status == 'active' && (
                <InactiveIncomes />
            )}
            {status == 'inactive' && (
                <ActiveIncomes />
            )}
            <Footer/>
        </BoddyStyle>
    );
}

export default Incomes;