import { useParams } from "react-router-dom";

// Components
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/NavBar";
import AllJob from "./All";
import ActiveJob from "./Active";
import InactiveJob from "./Inactive";

// Styled
import { BoddyStyle } from "../style";

const Jobs = () => {
    const { status } = useParams();

    return (
        <BoddyStyle>
            <NavBar/>
            {status == 'all' && (
                <AllJob />
            )}
            {status == 'active' && (
                <ActiveJob />
            )}
            {status == 'inactive' && (
                <InactiveJob />
            )}
            <Footer/>
        </BoddyStyle>
    );
}

export default Jobs;