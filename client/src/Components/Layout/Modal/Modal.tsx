import { useState, useEffect } from 'react';

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
    const music_check = [];

    useEffect(() => {

        api.get('music/all')
        .then((res: any) => {
            setMusics(res.data.musics)
        })
    }, [])

    useEffect(() => {
        musics.map((music: any) => id_musics.push(music.id_music));
    },[musics])

    return (
        <div>
            <h1>Modal</h1>
            {musics.map((music: any) => (
                <h1 key={music.id}>{music.name}</h1>
            ))}
        </div>
    )
}

export default Modal;