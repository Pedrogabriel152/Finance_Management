import React, { ReactNode } from "react";

// CSS
import styles from './Container.module.css'

interface Props {
    children:  ReactNode
}

const Containner = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Containner;