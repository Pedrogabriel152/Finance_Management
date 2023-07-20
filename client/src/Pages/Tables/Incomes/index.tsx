import { useParams } from "react-router-dom";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import AllIncomes from "./All";
import ActiveIncomes from "./Active";
import InactiveIncomes from "./Inactive";

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
                <ActiveIncomes />
            )}
            {status == 'inactive' && (
                <InactiveIncomes />
            )}
            <Footer/>
        </BoddyStyle>
    );
}

export default Incomes;