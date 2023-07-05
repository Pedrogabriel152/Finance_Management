import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Singin from "../Pages/Auth/Singin";
import Home from "../Pages/Home";
import Job from "../Pages/Job";

const Rotas = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/singin" element={<Singin />}/>
            <Route path="/jobs" element={<Job />}/>
            <Route path="/" element={<Home />}/>
        </Routes>
    );
}

export default Rotas;