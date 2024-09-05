import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUser = () => {
        setLoading(true)
        //console.log(token, "token")
        axios.get("/api/v1/users/auth")
            .then((response) => {
                setUser(response.data.user)
            })
            .catch((error) => {
                console.log(`${error} Not logged in!`)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <>
            <AuthContext.Provider value={{ user, getUser, loading}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);