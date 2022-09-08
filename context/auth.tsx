import { createContext, useContext, useState } from "react";

const Context = createContext<any>(null);


export function AuthProvider({children}:any){

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<string | undefined>();


    function login(user:string){
        setIsLogged(true);
        setUser(user);
    }
    function logout(){
        setIsLogged(false);
        setUser(undefined);
    }
    return <Context.Provider value={{
            isLogged,
            user,
            login,
            logout
        }}>
    {children}
    </Context.Provider>
}

export function useAuth(){
    return useContext(Context);
}