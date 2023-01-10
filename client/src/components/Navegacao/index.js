import React from "react";


function Navegacao(){
    return(
        <div className="navbar">
            <div className="logo">
                <a href="/">Seu logo</a>
            </div>
            <div className="links">
                <a href="/login">Logar</a>
                <a href="/registrar">Registrar</a>
            </div>
        </div>
    );
}

export default Navegacao