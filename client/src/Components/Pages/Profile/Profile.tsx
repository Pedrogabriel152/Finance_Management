import { useState, useEffect, FormEvent } from 'react';

// Layout
import Input from '../../Layout/Input/Input';

// Interfaces
import IRecordCompany from '../../../interfaces/IRecordCompany';

// API
import api from '../../../utils/api'

// CSS
import styles from './Profile.module.css';
import useAuth from '../../../Hooks/useAuth';

import RoundedImage from '../../Layout/RandleImage/RandleImage';

const Profile = () => {

    const [recordCompany, setRecordCompany] = useState({} as any)
    const [token] = useState<string | null>(localStorage.getItem('token'))
    const [preview, setPreview] = useState<any>()
    const {update} = useAuth()

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

        console.log(recordCompany)

    }, [token])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecordCompany({...recordCompany, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(recordCompany).forEach( key => formData.append(key, recordCompany[key])) 

        if(token){
            const data = await api.patch(`/recordcompany/edit`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then( res => {
                return res.data
            })
            .catch(err => {
                msgType = 'error'
                return err.response.data
            })
        }
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setPreview(e.target.files[0])
            setRecordCompany({ ...recordCompany, [e.target.name]: e.target.files[0] })
        }

        if(preview){
            console.log('tem preview')
        }
    }

    return (
        <div className={styles.form_containner}>
            <h1>Perfil:</h1>
            {(recordCompany.image || preview) && (
                   <RoundedImage src={
                                    preview ? 
                                        URL.createObjectURL(preview) : 
                                        `http://localhost:5000/images/recordcompany/${recordCompany.image}`} 
                        alt={recordCompany.name}
                    />
                )}
            <div>
                <form onSubmit={handleSubmit}>

                    <Input
                        text="Image"
                        placeholder='aqui e a img'
                        type="file"
                        name="image"
                        handleOnChange={onFileChange}
                    />                   
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
