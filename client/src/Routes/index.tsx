import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Singin from "../Pages/Auth/Singin";
import Home from "../Pages/Home";
import Jobs from "../Pages/Tables/Jobs";
import Incomes from "../Pages/Tables/Incomes";
import Expenses from "../Pages/Tables/Expenses";
import Job from "../Pages/Finances/Job";
import CreateJob from "../Pages/Finances/Job/create";
import CreateExpense from "../Pages/Finances/Expense/create";
import CreateIncome from "../Pages/Finances/Income/create";
import Income from "../Pages/Finances/Income";
import Expense from "../Pages/Finances/Expense";
import Profile from "../Pages/Profile";

const Rotas = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/singin" element={<Singin />}/>
            <Route path="/jobs/:status/:page" element={<Jobs />}/>
            <Route path="/incomes/:status/:page" element={<Incomes />}/>
            <Route path="/expenses/:status/:page" element={<Expenses />}/>
            <Route path="/job/:id" element={<Job />}/>
            <Route path="/income/:id" element={<Income />}/>
            <Route path="/expense/:id" element={<Expense />}/>
            <Route path="/create/job" element={<CreateJob />}/>
            <Route path="/create/expense" element={<CreateExpense />}/>
            <Route path="/create/income" element={<CreateIncome />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/" element={<Home />}/>
        </Routes>
    );
}

export default Rotas;