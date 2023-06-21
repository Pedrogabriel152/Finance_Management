import React from "react";
import { FormStyle, InputStyle } from "./style";
import { HiUserCircle } from "react-icons/hi";

const Form = () => {
    return(
       <FormStyle>
            <InputStyle placeholder="Email">
                <input type="email" name="" id="" placeholder="E-mail"/>
                <HiUserCircle size={25}/>
            </InputStyle>
       </FormStyle>
    );
}

export default Form;