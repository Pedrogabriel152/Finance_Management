import { useState, useEffect } from 'react';

// CSS
import styles from 'MyCDs.module.css';

// API
import api from '../../../utils/api'

// Hooks
import useAuth from '../../../Hooks/useAuth';

// Interfaces
import IRecordCompany from '../../../interfaces/IRecordCompany';

const MyCDs = () => {

    const [recordCompany, setRecordCompany] = useState<any>()
    const [cds, setCDs] = useState<object[]>([])
    const [token] = useState<string | null>(localStorage.getItem('token'))
    const {update} = useAuth()

    useEffect(() => {

        if(typeof token === 'string') {
            api.get('recordcompany/checkrecordcompany', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            .then(res => {
                console.log(res.data.correntRecordCompany)
                setRecordCompany(res.data.correntRecordCompany)
            })
        } 

    }, [token])

    useEffect(() => {
        if(recordCompany) {
            if(typeof token === 'string') {
                api.get(`cd/${recordCompany.id}/mycds`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                })
                .then(res => {
                    setCDs(res.data.cds)
                })
            } 
        }

    }, [token, recordCompany])

    return (
        <div>
            <div>
                <h1>Meus CDs:</h1>
            </div>

            {cds.map((cd: any) => (
                <div key={cd.cd_id}>
                    <h1>{cd.name}</h1>
                </div>
            ))}
        </div>
    );
}

export default MyCDs