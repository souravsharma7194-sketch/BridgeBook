import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  
  const [user,setUser] = useState(null);


useEffect(()=>{

const savedUser = localStorage.getItem("bookbridge-user");

if(savedUser){

const parsed = JSON.parse(savedUser);

setUser({name: parsed.name, email: parsed.email})


}

},[]);


  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
   
    return (

<AuthContext.Provider value={{user,login,logout}}>
{children}
</AuthContext.Provider>

)
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;