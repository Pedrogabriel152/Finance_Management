import { useState, useEffect } from 'react';

// APi
import api from '../../../utils/api';

// Css
import styles from 'Modal.module.css';

interface Props {
    setMusicsId(): any
}

const Modal = ({setMusicsId}: Props) => {

    const [musics, setMusics] = useState([] as any[])
    const id_musics: any[] = [];
    const music_check = [];

    useEffect(() => {

        api.get('music/all')
        .then((res: any) => {
            setMusics(res)
        })

        console.log(musics)

    }, [])

    // useEffect(() => {
    //     musics.map(music => id_musics.push(music.id_music));
    //     console.log(musics)
    // },[musics])

    return (
        <h1>Modal</h1>
    )
}

export default Modal;