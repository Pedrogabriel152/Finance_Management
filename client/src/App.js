import './css/all.css';
import Register from "./components/Register"
import Rotas from './rotas';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Rotas />
    </div>
  );
}

export default App;
