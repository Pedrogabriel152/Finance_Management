import { IFormCreate } from "../../Interfaces/IFormCreate";
import { IInput } from "../../Interfaces/IInput";
import { FormContainer, FormStyle, InputCreateStyle, LabelInput } from "./style";

const FormCreate = ({data}: IFormCreate) => {
    return(
        <FormContainer>
            <FormStyle>
                {data.map((input: IInput, index: number) => (
                    <LabelInput key={index}>
                        <label htmlFor={input.name}>{input.label}</label>
                        <InputCreateStyle 
                            name={input.name} 
                            value={input.value} 
                            placeholder={input.placeholder}
                            type={input.type}
                            onChange={input.onChange}
                        />
                    </LabelInput>
                ))}
            </FormStyle>
        </FormContainer>
    )
}

export default FormCreate;