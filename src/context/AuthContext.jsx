import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    console.log('AuthProvider rendering, loading:', loading);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        console.log('Setting up auth listener...');
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed: ', user ? user.email : 'no user');
            setCurrentUser(user);
            setLoading(false)
        });


        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="loading-screen">
                    <div className="spinner">
                        <p>Loading app...</p>
                    </div>
                </div>
            ) : ( 
                children
            )}
        </AuthContext.Provider>
    );
} 