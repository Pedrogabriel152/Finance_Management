import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from 'react-router-dom'

// CSS
import styles from './Navbar.module.css'

const Navbar = () => {

    const { authenticate, logout } = useAuth()

    return (
        <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <img  alt="My List"/>
            <h2>My list</h2>
        </div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            {authenticate ?
                ( 
                <>
                    <li>
                        <Link to="/cd/mycds">Meus CDs</Link>
                    </li>
                    <li>
                        <Link to="/recordcompany/profile">Perfil</Link>
                    </li> 
                    <li onClick={logout}>Sair</li>
                </>
                ) 
                : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )
            }
            
            
        </ul> 
    </nav>
    )
}

export default Navbar;