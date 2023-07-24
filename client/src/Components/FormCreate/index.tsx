import { IFormCreate } from "../../Interfaces/IFormCreate";
import { IInput } from "../../Interfaces/IInput";
import { FormContainer, FormStyle, InputCreateStyle, LabelInput, ButtonSubmit } from "./style";

const FormCreate = ({data, onSubmit}: IFormCreate) => {
    return(
        <FormContainer>
            <FormStyle onSubmit={onSubmit}>
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
                <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
            </FormStyle>
        </FormContainer>
    )
}

export default FormCreate;