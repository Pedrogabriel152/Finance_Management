import { useState, useEffect, FormEvent } from "react";

// CSS
import styles from "AddCD.module.css";

// API
import api from "../../../utils/api";

// FORM Input
import Input from "../../Layout/Input/Input";
import RoundedImage from "../../Layout/RandleImage/RandleImage";

const AddCD = () => {

    const [recordCompany, setRecordCompany] = useState({} as any)
    const [token] = useState<string | null>(localStorage.getItem('token'))
    const [preview, setPreview] = useState<any>()
    const [cd, setCd] = useState({} as any)
    const musics = []

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
        setCd({...cd, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(cd).forEach( key => formData.append(key, cd[key])) 

        if(token){
            const data = await api.post(`/cd/add/cd`, formData, {
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

    const handleOnChangeMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setMusic({...cd, [e.target.name]: e.target.value})
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setPreview(e.target.files[0])
            setCd({ ...cd, [e.target.name]: e.target.files[0] })
        }

        if(preview){
            console.log('tem preview')
        }
    }

    // useEffect(() => {
    //     for(let numberTrack of cd.number_of_tracks) {
    //         musics.push(
    //             <>
    //                 <Input
    //                     text="Música"
    //                     placeholder='Nome da música'
    //                     type="text"
    //                     name="name"
    //                     handleOnChange={handleOnChangeMusic}
    //                 /> 
    //                 <Input
    //                     text="Duração"
    //                     placeholder='Duração da música'
    //                     type="text"
    //                     name="duration"
    //                     handleOnChange={handleOnChangeMusic}
    //                 />
    //                 <Input
    //                     text="Author"
    //                     placeholder='Author da música'
    //                     type="text"
    //                     name="author"
    //                     handleOnChange={handleOnChangeMusic}
    //                 />
    //             </>
    //         )
    //     }
    // }, [cd.number_of_tracks])

    return (
        <div>
            <div>
                <h1>Adicionar Cd:</h1>
                {(recordCompany.image || preview) && (
                   <RoundedImage src={
                                    preview ? 
                                        URL.createObjectURL(preview) : 
                                        `http://localhost:5000/images/cd/${cd.image}`} 
                        alt={cd.name}
                    />
                )}
            </div>

            <div>
                <form>
                    <Input
                        text="Image do post"
                        placeholder='aqui e a img'
                        type="file"
                        name="image"
                        handleOnChange={onFileChange}
                    />                   
                    <Input 
                        handleOnChange={handleOnChange}
                        name='name'
                        placeholder='Digite o nome do CD'
                        text='Nome'
                        type='text'
                        value={cd.name}
                    />
                    <Input 
                        handleOnChange={handleOnChange}
                        name='price'
                        placeholder='Digite o preço'
                        text='Preço'
                        type='number'
                        value={cd.price}
                    />
                    <Input 
                        handleOnChange={handleOnChange}
                        name='number_of_tracks'
                        placeholder='Digite a quantridade músicas'
                        text='Quantidade de Música'
                        type='text'
                        value={cd.number_of_tracks}
                    />

                    <select>
                        <option>Selecione as músicas</option>
                    </select>
                    
                    <input type="submit" value="Salvar" />
                </form>
            </div>
        </div>
    );
}

export default AddCD;