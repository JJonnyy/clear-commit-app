import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../auth/firebase.jsx";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isFirebaseAuth: null,
        isLoading: true,
        userRole: '',
        userInfo: null,
        userInfoFirebase: null,
        userInfoServer: null,
    });

    const navigate = useNavigate();
    const auth = getAuth(app);

    const checkServerAuth = useCallback( async () => {
        try {
            const response = await api.get('/auth/check-auth', {
                withCredentials: true
            });

            return {
                isAuthenticated: response.data.isAuthenticated,
                userRole: response.data.role,
                userInfo: response.data.userInfo
            }
        } catch(error){
            console.error('Auth check failed:', error.response.data.message);
            return { isAuthenticated: false, userRole: '' };
        }
    }, []);
    const checkFireBaseAuth = useCallback (() => {

        return new Promise(resolve => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                resolve(user);
                unsubscribe();
            });
        });

    }, [auth]);

    const syncAuthState = useCallback( async () => {
        try {
            const [serverAuth, firebaseUser] = await Promise.all([
                checkServerAuth(),
                checkFireBaseAuth(),
            ]);

            const firebaseData = firebaseUser ? {
                name: firebaseUser.displayName,
                email: firebaseUser.email,
            } : null;

            const mergedUserInfo = {
                ...(serverAuth.userInfo || {}),
                ...(firebaseData || {}),
                role: serverAuth.userRole || 'user'
            };

            setAuthState({
                isAuthenticated: serverAuth.isAuthenticated,
                isFirebaseAuth: !!firebaseUser,
                userRole: serverAuth.userRole || 'user',
                userInfo: mergedUserInfo,
                isLoading: false
            });

            return mergedUserInfo;

        } catch (error) {
            console.error('Sync auth state failed:', error);
            setAuthState(prev => ({ ...prev, isLoading: false }));
            return null;
        }
    },[ checkServerAuth, checkFireBaseAuth ]);

    useEffect(() => {
        const initializeAuth = async () => {
            await syncAuthState();
        };
        initializeAuth();
    },[syncAuthState] );


    const fireBaseSignOut = useCallback(() => {
        signOut(auth)
            .then(() => {
                setAuthState(prev =>({
                    ...prev,
                    isFirebaseAuth: false,
                    isAuthenticated: false,
                    userInfo: null
                }))
            })
            .catch((error) => console.error("Error signing out:", error.message));
    },[auth]);

    const login = async ( login,password ) =>{
        const dataLogin = {
            login: login,
            password: password
        }
        try {
            const response = await api.post('/auth/signin', dataLogin , {
                withCredentials: true
            });
            if(response.data.signIn){
                await syncAuthState();
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message);
        }
    };

    const logout = async () => {

        try {
            await api.post('/auth/logout',{},{ withCredentials: true });
            fireBaseSignOut();
            navigate('/');
        } catch (error){
            console.error('Logout failed:', error);
        }
    };

    const register = async (login, password,email,name) => {
        const dataReg = {
            login: login,
            password: password,
            email: email,
            name: name
        }
        try {
            const response = await api.post('/auth/signup', dataReg );
            console.log('response.data',response.data);
            if(response.status === 200 ){
                await syncAuthState();
                navigate('/');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            syncAuthState,
            login,
            logout,
            register,
            fireBaseSignOut,
        }} >
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);