import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app, googleAuthProvider } from "./firebase.jsx";
import { useNavigate } from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import { useAuth } from "../context/AuthContext.jsx";

export const FirebaseAuth = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const { syncAuthState  } = useAuth();

    const handleGoogleLogin = async () => {
        try{
            await signInWithPopup(auth, googleAuthProvider);
            await syncAuthState();
            navigate("/home");
        } catch(error){
            console.error("Error logging in:", error.message);
        }
    };

    return (
        <div className="mt-6">
            <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <FcGoogle className="h-5 w-5"/>
                Sign in with Google
            </button>
        </div>
    );
}