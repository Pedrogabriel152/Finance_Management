import React from "react";

// CSS 
import styles from './Input.module.css'

interface Props {
    type: string
    name: string
    text: string
    placeholder: string
    value?: string | number
    handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Input = ({type, name, text, placeholder, value, handleOnChange}: Props) => {
    return (
        <div className={styles.input_container}>
            <label htmlFor={name} >{text}:</label>
            <input 
                name={name} 
                type={type} 
                id={name}
                placeholder={placeholder} 
                value={value? value : ''}
                onChange={handleOnChange}
            />
        </div>
    );
}


export default Input;