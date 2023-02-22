import { useState, useEffect, MouseEventHandler } from 'react';

// APi
import api from '../../../utils/api';

// Css
import styles from 'Modal.module.css';

interface Props {
    setMusicsId(): any
}

const Modal = ({setMusicsId}: Props) => {

    const [musics, setMusics] = useState<any>([])
    const id_musics: any[] = [];
    let music_check: number[];

    useEffect(() => {

        api.get('music/all')
        .then((res: any) => {
            setMusics(res.data.musics)
        })
    }, [])

    useEffect(() => {
        musics.map((music: any) => id_musics.push(music.id_music));
    },[musics])

    const marca = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.target.id)
    
        console.log(id)

        if(!e.target.checked) {
            const music_check2 = music_check.filter(idF => (idF !== id))

            music_check = music_check2

            console.log(music_check)
        }

        music_check.push(id)



        console.log(music_check)

    }

    return (
        <div>
            <h1>Modal</h1>
            {musics.map((music: any) => (
                <div className='musics' key={music.id_music}>
                    <input type="checkbox" name={music.name} id={music.id_music} onChange={marca}/>
                    <span>{music.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Modal;