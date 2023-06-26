import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styled Componnets
import { FormLoginStyle, FormSinginStyle, InputStyleLogin, InputStyleSingin, LinkStyleLogin, LinkStyleSingIn } from "./style";

// Icons
import { HiUserCircle, HiIdentification } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";


// Interfaces
import { IForm } from "../../Interfaces/IForm";
import Button from "../Button";

const Form = ({text, inputs, link, submit}: IForm) => {
    const [size, setSize] = useState<number>(500);

    useEffect(() => {
        const width = window.screen.width;

        if(width < 501) {
            setSize(25);
        }

        if(width > 500) {
            setSize(35)
        }

        if(width >= 1000){
            setSize(35)
        }
        
    }, [size]);

    const handleSwitch = (svg: string) => {
        switch (svg) {
            case "HiUserCircle":
                return <HiUserCircle size={size}/>
            case "RiLockPasswordFill":
                return <RiLockPasswordFill size={size}/>
            case "MdEmail":
                return <MdEmail size={size}/>
            case "HiIdentification":
                return <HiIdentification size={size}/>
            case "FaMapMarkedAlt":
                return <FaMapMarkedAlt size={size}/>
            case "MdOutlinePhoneIphone":
                return <MdOutlinePhoneIphone size={size}/>
            default:
                break;
        }
    }

    return(
        <>
        {text == 'Login' 
            ? (
                <FormLoginStyle onSubmit={submit}>
                    {inputs.map((input: any, index: number) => (
                        <InputStyleLogin key={index}>
                            <input 
                                type={input.type} 
                                name={input.name} 
                                placeholder={input.placeholder} 
                                value={input.value? input.value : ''}
                                onChange={input.onChange}
                                id={input.name}
                            />
                            {handleSwitch(input?.svg)}
                        </InputStyleLogin>
                    ))}

                    <LinkStyleLogin>
                        <Link to={'/resetpssword'}>{link}</Link>
                        <Link to={'/singin'} id="singin">SING IN</Link>
                    </LinkStyleLogin>

                    <Button text={text}/>
                </FormLoginStyle>
            ):(
                <FormSinginStyle onSubmit={submit}>
                    {inputs.map((input: any, index: number) => (
                        <InputStyleSingin key={index}>
                            <input 
                                type={input.type} 
                                name={input.name} 
                                placeholder={input.placeholder} 
                                value={input.value? input.value : ''}
                                onChange={input.onChange}
                                id={input.name}
                            />
                            {handleSwitch(input?.svg)}
                        </InputStyleSingin>
                    ))}

                    <LinkStyleSingIn>
                        <Link to={'/login'} id="login">{link}</Link>
                    </LinkStyleSingIn>

                    <Button text={text} />
                </FormSinginStyle>
            )
        }
        </>
    );
}

export default Form;