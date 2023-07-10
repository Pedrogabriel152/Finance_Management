import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import TableJob from "../../Components/TableJob";
import { JobStyle, JobBodyStyle } from "./style";

const Job = () => {
    return (
        <JobStyle>
            <NavBar/>
            <JobBodyStyle>
                <TableJob />
            </JobBodyStyle>
            <Footer/>
        </JobStyle>
    );
}

export default Job;