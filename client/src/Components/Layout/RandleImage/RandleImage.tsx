import styles from './RoundedImage.module.css'

interface Props {
    src: string
    alt: string
    width?: string
}

function RoundedImage({src, alt, width}: Props){
    return (
        <img
            className={width? `${styles.rounded_image} ${styles[width]}` : styles.rounded_image}
            src={src}
            alt={alt}
        />
    )
}

export default RoundedImage