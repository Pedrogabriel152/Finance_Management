import Pagination from "@mui/material/Pagination";
import { PaginateStyle } from "./style";
import { useState } from "react";
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

const Paginate = ({ count, currentPage, lastPage }: IPaginateInfo) => {
    const [page, setPage] = useState<number>(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value)
        setPage(value);
    }
    return (
        <PaginateStyle>
            <Pagination count={lastPage} color="primary" page={page} onChange={handleChange} size="small"/>
        </PaginateStyle>
    );
}

export default Paginate;