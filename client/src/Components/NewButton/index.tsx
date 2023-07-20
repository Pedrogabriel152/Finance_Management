import { Link } from 'react-router-dom';

// Styled
import { ButtonStyle } from './style';

interface INewButton {
    path: string
    text: string
}

const NewButton = ({path, text}: INewButton) => {
    return (
        <ButtonStyle>
            <Link to={`/create/${path}`}>
                <span id='icon'>+</span><span> Add {text}</span>
            </Link>
        </ButtonStyle>
    );
}

export default NewButton;