import Pagination from "@mui/material/Pagination";
import { PaginateStyle } from "./style";

const Paginate = () => {
    return (
        <PaginateStyle>
            <Pagination count={10} color="primary"/>
        </PaginateStyle>
    );
}

export default Paginate;