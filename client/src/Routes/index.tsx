import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";

const Rotas = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />}/>
        </Routes>
    );
}

export default Rotas;