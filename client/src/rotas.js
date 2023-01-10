import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
// import 

function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                {/* <Route path='/' element={<Home />} />  */}
                <Route path='/registrar' element={ <Register />} />
                <Route path='/login' element={ <Register />} />
                <Route path='/' element={ <Home />} />
                

                {/* <Route path='*' element={ <Erro />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;