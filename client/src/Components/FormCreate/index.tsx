import { IFormCreate } from "../../Interfaces/IFormCreate";
import { IInput } from "../../Interfaces/IInput";

const FormCreate = ({data}: IFormCreate) => {
    return(
        <form style={{marginTop: '60px'}}>
            {data.map((input: IInput) => (
                <input 
                    name={input.name} 
                    value={input.value} 
                    placeholder={input.placeholder}
                    type={input.type}
                    onChange={input.onChange}
                />
            ))}
        </form>
    )
}

export default FormCreate;