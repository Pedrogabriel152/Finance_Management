import { IFormCreate } from "../../Interfaces/IFormCreate";
import { IInput } from "../../Interfaces/IInput";
import { FormContainerFinance, FormContainerJob, FormStyleFinance, FormStyleJob, InputCreateStyle, LabelInput, ButtonSubmit } from "./style";
import { mask } from "remask";

const FormCreate = ({data, onSubmit, text}: IFormCreate) => {
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
                                value={mask(input.value, input.mask)} 
                                placeholder={input.placeholder}
                                type={input.type}
                                onChange={input.onChange}
                            />
                        </LabelInput>
                    ))}
                    <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                </FormStyleJob>
            </FormContainerJob>
        ):(
            <FormContainerFinance>
                <FormStyleFinance onSubmit={onSubmit}>
                    {data.map((input: IInput, index: number) => (
                        <LabelInput key={index}>
                            <label htmlFor={input.name}>{input.label}</label>
                            {input.name === 'value_installment' || input.name === 'expires' ?
                                <InputCreateStyle 
                                name={input.name} 
                                value={input.value}  
                                placeholder={input.placeholder}
                                type={input.type}
                                onChange={input.onChange}
                            />
                            : 
                                <InputCreateStyle 
                                    name={input.name} 
                                    value={mask(input.value, input.mask)}  
                                    placeholder={input.placeholder}
                                    type={input.type}
                                    onChange={input.onChange}
                                    step="0.01" 
                                    min="0.01"
                                />
                            }
                            
                        </LabelInput>
                    ))}
                    <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                </FormStyleFinance>
            </FormContainerFinance>
        )}
        </>
        
    )
}

export default FormCreate;