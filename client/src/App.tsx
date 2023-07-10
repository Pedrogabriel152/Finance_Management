import { BrowserRouter } from 'react-router-dom';
import ABApolloClient from './Components/ApooloClient';
import Rotas from './Routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserProvider from './Context/UserContext';

function App() {
  return (
    <ABApolloClient>
        <UserProvider>
          <BrowserRouter>
            <ToastContainer autoClose={3000} />
            <Rotas />
          </BrowserRouter>
        </UserProvider>
    </ABApolloClient>
  );
}

export default App;
