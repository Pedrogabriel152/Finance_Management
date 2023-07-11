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

const Job = () => {
    useGetJobs();
    const jobsPaginate = useReactiveVar(getJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);

    useEffect(() => {
        console.log(jobsPaginate)
        if(jobsPaginate) {
            setPaginateInfo(jobsPaginate.paginatorInfo);
            console.log(jobsPaginate.paginatorInfo)
        }
    }, [jobsPaginate]);

    if(!paginateInfo){
        return <div></div>
    }

    return (
        <JobStyle>
            <NavBar/>
            <JobBodyStyle>
                <TableJob />
                <Paginate count={paginateInfo.count} currentPage={paginateInfo.currentPage} lastPage={paginateInfo.lastPage}/>
            </JobBodyStyle>
            <Footer/>
        </JobStyle>
    );
}

export default Job;