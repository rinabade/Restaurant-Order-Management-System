import { createContext,useState } from "react";

 const AuthContext = createContext({});

 export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value = {{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// module.exports={ AuthContext, AuthProvider}
export default AuthContext;



