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

const Job = () => {
    const { page } = useParams();
    useGetJobs(parseInt(page? page : '1'));
    const jobsPaginate = useReactiveVar(getJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [jobs, setJobs] = useState<any>(null);

    useEffect(() => {
        if(jobsPaginate) {
            setPaginateInfo(jobsPaginate.paginatorInfo);
            setJobs(jobsPaginate.data)
        }
    }, [jobsPaginate]);

    if(!paginateInfo || !jobs){
        return <div></div>
    }

    return (
        <JobStyle>
            <NavBar/>
            <JobBodyStyle>
                <TableJob jobs={jobs}/>
                <Paginate  
                    lastPage={paginateInfo.lastPage} 
                />
            </JobBodyStyle>
            <Footer/>
        </JobStyle>
    );
}

export default Job;