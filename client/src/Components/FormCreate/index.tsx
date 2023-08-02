import { IFormCreate } from "../../Interfaces/IFormCreate";
import { IInput } from "../../Interfaces/IInput";
import { FormContainerFinance, FormContainerJob, FormStyleFinance, FormStyleJob, InputCreateStyle, LabelInput, ButtonSubmit } from "./style";
import { mask } from "remask";

const FormCreate = ({data, onSubmit, text, button}: IFormCreate) => {
    return(
        <>
        {text === "job"? (
            <FormContainerJob>
                <FormStyleJob onSubmit={onSubmit}>
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
                    <ButtonSubmit type="submit">{button}</ButtonSubmit>
                </FormStyleJob>
            </FormContainerJob>
        ):(
            <FormContainerFinance>
                <FormStyleFinance onSubmit={onSubmit}>
                    {data.map((input: IInput, index: number) => (
                        <LabelInput key={index}>
                            <label htmlFor={input.name}>{input.label}</label>
                            <InputCreateStyle 
                            name={input.name} 
                            value={input.value}  
                            placeholder={input.placeholder}
                            type={input.type}
                            onChange={input.onChange}
                            disabled={input.disabled? true : false}
                            />                     
                        </LabelInput>
                    ))}
                    <ButtonSubmit type="submit">{button}</ButtonSubmit>
                </FormStyleFinance>
            </FormContainerFinance>
        )}
        </>
        
    )
}

export default FormCreate;