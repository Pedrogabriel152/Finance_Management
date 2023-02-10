import { useState, useEffect } from 'react';

// Layout
import Input from '../../Layout/Input/Input';

// Interfaces
import IRecordCompany from '../../../interfaces/IRecordCompany';

// API
import api from '../../../utils/api'

// CSS
import styles from './Profile.module.css';

const Profile = () => {

    const [recordCompany, setRecordCompany] = useState<IRecordCompany>({name: '', email: '', confirmpassword: '', password: '', site: ''})
    const [token] = useState<string | null>(localStorage.getItem('token'))

    useEffect(() => {

        if(typeof token === 'string') {
            api.get('recordcompany/checkrecordcompany', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            .then(res => {
                setRecordCompany(res.data.correntRecordCompany)
            })
        } 

    }, [token])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecordCompany({...recordCompany, [e.target.name]: e.target.value})
    }

    return (
        <div className={styles.form_containner}>
            <h1>Perfil</h1>
            <div>
                <form>
                    
                        <Input 
                        handleOnChange={handleOnChange}
                        name='name'
                        placeholder='Digite o nome da gravadora'
                        text='Nome'
                        type='text'
                        value={recordCompany.name}
                    />
                    <Input 
                        handleOnChange={handleOnChange}
                        name='email'
                        placeholder='Digite o e-mail da gravadora'
                        text='E-mail'
                        type='email'
                        value={recordCompany.email}
                    />
                    <Input 
                        handleOnChange={handleOnChange}
                        name='site'
                        placeholder='Digite o site da gravadora'
                        text='Site'
                        type='text'
                        value={recordCompany.site}
                    />
                    <Input 
                        handleOnChange={handleOnChange}
                        name='password'
                        placeholder='Digite uma senha'
                        text='Senha'
                        type='password'
                        value={recordCompany.password}
                    />
                    <Input 
                        handleOnChange={handleOnChange}
                        name='confirmpassword'
                        placeholder='Digite a senha novamente'
                        text='Confirmação da Senha'
                        type='password'
                        value={recordCompany.confirmpassword}
                    />
                    <input type="submit" value="Salvar" />
                    
                </form>
            </div>
        
        </div>
    )
}

export default Profile;