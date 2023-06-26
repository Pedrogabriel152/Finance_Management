import React from "react";
import { AbaLateralStyle } from "./style";
import { Link } from "react-router-dom";

interface Props {
    text: string
}

const AbaLateral = ({text}: Props) => {
    return (
        <AbaLateralStyle>
            <Link to={"/"} id={text == 'Login'? 'activi' : ''}>LOGIN</Link>
            <Link to={"/singin"} id={text == 'Register'? 'activi' : ''}>SIGIN IN</Link>
        </AbaLateralStyle>
    );
}

export default AbaLateral;