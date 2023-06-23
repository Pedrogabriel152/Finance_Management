import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styled Componnets
import { FormStyle, InputStyle, LinkStyle } from "./style";

// Icons
import { HiUserCircle } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";


// Interfaces
import { IForm } from "../../Interfaces/IForm";
import Button from "../Button";

const Form = ({text, inputs, link}: IForm) => {
    const [size, setSize] = useState<number>(500);

    useEffect(() => {
        const width = window.screen.width;

        if(width < 501) {
            setSize(25);
        }

        if(width > 500) {
            setSize(40)
        }
        
    }, [size]);

    const handleSwitch = (svg: string) => {
        switch (svg) {
            case "HiUserCircle":
                return <HiUserCircle size={size}/>
            case "RiLockPasswordFill":
                return <RiLockPasswordFill size={size}/>
            default:
                break;
        }
    }

    return(
        <FormStyle>
            {inputs.map((input: any, index: number) => (
                <InputStyle key={index}>
                    <input 
                        type={input.type} 
                        name={input.name} 
                        placeholder={input.placeholder} 
                        value={input.value? input.value : ''}
                        onChange={input.onChange}
                        id={input.name}
                    />
                    {handleSwitch(input?.svg)}
                </InputStyle>
            ))}

            <LinkStyle>
                <Link to={'/resetpssword'}>{link}</Link>
                <Link to={'/singin'} id="singin">SING IN</Link>
            </LinkStyle>

            <Button onclick={() => {}} text={text}/>
        </FormStyle>
    );
}

export default Form;