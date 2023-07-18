import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Singin from "../Pages/Auth/Singin";
import Home from "../Pages/Home";
import Jobs from "../Pages/Jobs";

const Rotas = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/singin" element={<Singin />}/>
            <Route path="/jobs/:status/:page" element={<Jobs />}/>
            <Route path="/incomes/:status/:page" element={<Jobs />}/>
            <Route path="/expenses/:status/:page" element={<Jobs />}/>
            <Route path="/job/:id" element={<Jobs />}/>
            <Route path="/" element={<Home />}/>
        </Routes>
    );
}

export default Rotas;