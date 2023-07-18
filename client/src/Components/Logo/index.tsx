import LogoImg from "../../Assets/Images/image.png";
import { LogoComponentLogin, LogoComponentRegister } from "./style";

interface ImgProps{
    tipo: string
}

const Logo = ({tipo}: ImgProps) => {
    return (
        <>
        {tipo == 'login' 
            ? <LogoComponentLogin src={LogoImg} alt="logo"/>
            : <LogoComponentRegister src={LogoImg} alt="logo"/>
        }
        </>
    );
}

export default Logo;