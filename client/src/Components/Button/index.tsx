import { IButton } from "../../Interfaces/IButton";

const Button = ({text}: IButton) => {
    return (
        <button>{text}</button>
    );
}

export default Button;