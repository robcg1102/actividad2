import { useState } from "react";
import { createContext } from "react";
import axios from "axios"

export const AppContext = createContext();

export default function MyProvider({ children }) {

  const updateData = ()=> {
    axios.get("http://localhost:3004/users").then((res) => {
      setState({users: res.data, loading: false});
    });
  }

  const [state, setState] = useState({
    loading: true,
    users: {}
  });

  return (
    <AppContext.Provider value={{state, setState, updateData}}>
      {children}
    </AppContext.Provider>
  );
}
