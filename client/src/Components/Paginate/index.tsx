import Pagination from "@mui/material/Pagination";
import { PaginateStyle } from "./style";
import { useEffect, useState } from "react";
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Paginate = ({ count, currentPage, lastPage }: IPaginateInfo) => {
    const {page: atualPage} = useParams();
    const [page, setPage] = useState<number>(parseInt(atualPage? atualPage : '1'));
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/jobs/${value}`);
    }
    return (
        <PaginateStyle>
            <Pagination count={lastPage} color="primary" page={page} onChange={handleChange} size="small"/>
        </PaginateStyle>
    );
}

export default Paginate;