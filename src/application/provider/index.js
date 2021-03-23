import { createContext, useState} from 'react';
import { Store } from '../../store/store';

export default ({ children }) => {
  const [state, setState] = useState({});
  return (            
    <AppContext.Provider value={[state, setState]}>
      { children }
    </AppContext.Provider>  
  );
}

export const AppContext = createContext();