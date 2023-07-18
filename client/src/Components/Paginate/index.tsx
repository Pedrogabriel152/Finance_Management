import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Paginate
import Pagination from "@mui/material/Pagination";

// Styled
import { PaginateStyle } from "./style";

// Interfaces
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";


const Paginate = ({ lastPage }: IPaginateInfo) => {
    const {page: atualPage} = useParams();
    const [page, setPage] = useState<number>(parseInt(atualPage? atualPage : '1'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        const atualLocation = location.pathname.split('/')
        navigate(`/${atualLocation[1]}/all/${value}`);
    }
    return (
        <PaginateStyle>
            <Pagination count={lastPage} color="primary" page={page} onChange={handleChange} size="small"/>
        </PaginateStyle>
    );
}

export default Paginate;