import { useReactiveVar } from "@apollo/client";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import { useGetJobs } from "../../Graphql/Job/hooks";
import { JobStyle, JobBodyStyle } from "./style";
import { getJobsVar } from "../../Graphql/Job/state";
import { useEffect, useState } from "react";
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";
import { useParams } from "react-router-dom";
import AllJob from "./All";
import ActiveJob from "./Active";
import InactiveJob from "./Inactive";

const Jobs = () => {
    const { status } = useParams();

    return (
        <JobStyle>
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
        </JobStyle>
    );
}

export default Jobs;