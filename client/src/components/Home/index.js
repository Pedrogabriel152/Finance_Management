import React from "react";
import Navegacao from "../Navegacao";
import Rodape from "../Rodape";

function Home(){
    return(
        <div>
            <Navegacao />
            <div className="home-descricao">
                <h1>Bem vindo ao <span>ACCOUNTS</span></h1>
                <h3>Aqui seu dinheiro etá em boas mãos</h3>
                <p>Aqui você pode investir seu dinheiro nas melhoraes ações e de maneira segura</p>
                <p>O maior rendimento tanto da poupança qunato da conta corrente</p>
            </div>

            <Rodape />
        </div>
    );
}

export default Home;