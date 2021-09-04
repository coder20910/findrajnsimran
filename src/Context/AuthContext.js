import React, {useState, useEffect} from 'react'
import auth from "../firebase";


export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }
    async function login(email, password) {
        return await auth.signInWithEmailAndPassword(email, password);
    }
    async function logout() {
        setLoading(true);
        return await auth.signOut();
    }
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            setLoading(false);
            setCurrentUser(user)
        })
    }, []);
    const value ={
        currentUser,
        login,
        logout,
        signup
    }
    return (
        <div>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}