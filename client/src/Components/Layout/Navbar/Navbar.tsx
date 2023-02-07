import React from "react";
import { Link } from "react-router-dom";

// CSS
import styles from './Navbar.module.css'

const Navbar = () => {
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
                    {/* <li>
                        <Link to="/pet/mypets">Meus Pets</Link>
                    </li>
                    <li>
                        <Link to='/pet/myadoptions'>Minhas adoções</Link>
                    </li>
                    <li>
                        <Link to="/user/profile">Perfil</Link>
                    </li> 
                    <li>Sair</li>
                    */}
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                    
            
            
        </ul> 
    </nav>
    )
}

export default Navbar;