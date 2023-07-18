import { Link } from 'react-router-dom';
import { ButtonStyle } from './style';
import { IoMdAddCircle } from 'react-icons/io';

interface INewButton {
    path: string,
}

const NewButton = ({path}: INewButton) => {
    return (
        <ButtonStyle>
            <Link to={`/create/${path}`}>
                <span id='icon'>+</span><span> New {path}</span>
            </Link>
        </ButtonStyle>
    );
}

export default NewButton;