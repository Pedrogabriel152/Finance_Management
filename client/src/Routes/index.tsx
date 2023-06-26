import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Singin from "../Pages/Auth/Singin";
import Home from "../Pages/Home";

const Rotas = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/singin" element={<Singin />}/>
            <Route path="/" element={<Home />}/>
        </Routes>
    );
}

export default Rotas;