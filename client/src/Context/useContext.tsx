import { createContext, Provider, ReactNode, useContext } from 'react'

import useAuth from '../Hooks/useAuth';

// Interfaces
import IContext from '../interfaces/IContext';

const Context = createContext({} as IContext)

interface Props {
  children:  ReactNode
}

function RecordCompanyProvider({children}:Props) {

  const { authenticate, register, logout, login, update } = useAuth()

  return(
      <Context.Provider value={{ authenticate, register, logout, login, update }}>
        {children}  
      </Context.Provider>
  );

}

export { Context, RecordCompanyProvider }