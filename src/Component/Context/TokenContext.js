import { createContext, useState , useEffect } from "react";

export let TokenContext = createContext()

export default function TokenContextProvider(props){

     const [token, setToken] = useState(() => localStorage.getItem("token"));

     // Update local storage whenever the token changes
     useEffect(() => {
       if (token) {
         localStorage.setItem("token", token);
       } else {
         localStorage.removeItem("token");
       }
     }, [token]);

     return<TokenContext.Provider value={{token,setToken}}>
          {props.children}
     </TokenContext.Provider>
}