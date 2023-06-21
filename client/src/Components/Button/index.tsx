import React from "react";
import { IButton } from "../../Interfaces/IButton";

const Button = ({onclick, text}: IButton) => {
    return (
        <button>{text}</button>
    );
}

export default Button;