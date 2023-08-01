import { BrowserRouter } from 'react-router-dom';
import ABApolloClient from './Components/ApooloClient';
import Rotas from './Routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserProvider from './Context/UserContext';
import FinancesProvider from './Context/Finances';

function App() {
  return (
    <ABApolloClient>
        <UserProvider>
          <FinancesProvider>
            <BrowserRouter>
              <ToastContainer autoClose={3000} />
              <Rotas />
            </BrowserRouter>
          </FinancesProvider>
        </UserProvider>
    </ABApolloClient>
  );
}

export default App;
