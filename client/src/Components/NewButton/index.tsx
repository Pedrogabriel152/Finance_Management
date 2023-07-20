import { Link } from 'react-router-dom';

// Styled
import { ButtonStyle } from './style';

interface INewButton {
    path: string,
}

const NewButton = ({path}: INewButton) => {
    return (
        <ButtonStyle>
            <Link to={`/create/${path}`}>
                <span id='icon'>+</span><span> Add {path}</span>
            </Link>
        </ButtonStyle>
    );
}

export default NewButton;