import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ABApolloClient from './Components/ApooloClient';
import Rotas from './Routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ABApolloClient>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <Rotas />
        </BrowserRouter>
    </ABApolloClient>
  );
}

export default App;
