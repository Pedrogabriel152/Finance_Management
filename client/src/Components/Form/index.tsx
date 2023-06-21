import React from "react";
import { Link } from "react-router-dom";

// Styled Componnets
import { FormStyle, InputStyle, LinkStyle, MediaSocialStyle } from "./style";

// Icons
import { HiUserCircle } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

// Interfaces
import { IForm } from "../../Interfaces/IForm";
import Button from "../Button";

const Form = ({text, inputs, link}: IForm) => {
    console.log(inputs);

    const handleSwitch = (svg: string) => {
        switch (svg) {
            case "HiUserCircle":
                return <HiUserCircle size={25}/>
            case "RiLockPasswordFill":
                return <RiLockPasswordFill size={23}/>
            default:
                break;
        }
    }

    return(
       <FormStyle>
            {inputs.map((input: any, index: number) => (
                <InputStyle key={index}>
                    <input type={input.type} name={input.name} placeholder={input.placeholder}/>
                    {handleSwitch(input?.svg)}
                </InputStyle>
            ))}

            <LinkStyle>
                <Link to={'/resetpssword'}>{link}</Link>
                <Link to={'/singin'} id="singin">SING IN</Link>
            </LinkStyle>

            <Button onclick={() => {}} text="Login"/>

            <MediaSocialStyle>
                <SiGmail size={45}/>
                <BsLinkedin size={45} color="blue"/>
            </MediaSocialStyle>

       </FormStyle>
    );
}

export default Form;