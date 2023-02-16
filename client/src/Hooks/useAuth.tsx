import api from "../utils/api";

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessege from './useFlashMessage'

export default function useAuth() {

    const { setFlashMessage } = useFlashMessege()
    const [authenticate, setAuthenticate] = useState(false)
    const history = useNavigate()

    // Verificar se o usuario está autenticado
    useEffect(() => {

        const token = localStorage.getItem('token')

        // Se tar a Autorização de token no header da api
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticate(true)
        }

    }, [])

    // Registrar usuário no sistema
    async function register(recordCompany: object) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {

            const data = await api.post('recordcompany/register', recordCompany).then( res => {

                return res.data

            })

            await authRecordCompany(data)
            
        } catch (error: any) {
            
            // Tratar erro
            msgText = error.response.data.message
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)

    }

    // Realizando o login do usuário
    async function authRecordCompany(data: any) {

        setAuthenticate(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        history('/')
    }

    async function login(recordCompany: object){

        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {
            
            const data = await api.post('recordcompany/login', recordCompany).then(res => {
                return res.data
            })

            await authRecordCompany(data)

        } catch (error: any) {
            
            msgText = error.response.data.message
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)
    }

    // Realizando o logout do usuário
    function logout() {

        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticate(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = ''

        history('/')

        setFlashMessage(msgText, msgType)

    }

    async function update(recordCompany: any) {

        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {
            
            const data = await api.patch('recordcompany/edit', recordCompany).then(res => {
                return res.data
            })

            await authRecordCompany(data)

        } catch (error: any) {
            
            msgText = error.response.data.message
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)
        
    }

    return { authenticate, logout, register, login, update }
}