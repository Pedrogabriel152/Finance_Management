import { AbaLateralStyle } from "./style";
import { Link } from "react-router-dom";

interface Props {
    text: string
}

const AbaLateral = ({text}: Props) => {
    return (
        <AbaLateralStyle>
            <Link to={"/login"} id={text == 'Login'? 'activi' : ''}>LOGIN</Link>
            <Link to={"/singin"} id={text == 'Register'? 'activi' : ''}>SIGIN IN</Link>
        </AbaLateralStyle>
    );
}

export default AbaLateral;