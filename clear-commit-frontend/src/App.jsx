import './App.css'
import { CSSCleanerApp } from "./pages/Upload.jsx";
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx";
import { LandingPage } from "./pages/LandingPage";
import { RequireAuth } from "./components/RequireAuth.jsx";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegistrationPage } from "./pages/RegistrationPage.jsx";
import { NotFound } from "./pages/404.jsx";
import { Profile } from "./pages/Profile.jsx";
import { HomeContent } from "./pages/HomeContent.jsx";

function App() {

  return (

    <AuthProvider>
        <Routes>
            <Route path="/" element={
                <RequireAuth reverse >
                    <LandingPage/>
                </RequireAuth>
            }/>

            <Route element={ <RequireAuth><HomePage/></RequireAuth>}>
                <Route path="/home" element={<HomeContent />} /> {/* index = /home */}
                <Route path="/profile" element={ <Profile/> }/>
                <Route path="/app/clear-comments" element={<CSSCleanerApp/>} />
            </Route>
            <Route path="/login" element={
                <RequireAuth reverse >
                    <LoginPage/>
                </RequireAuth>
            }/>
            <Route path="/register" element={
                <RequireAuth reverse >
                    <RegistrationPage/>
                </RequireAuth>
            }/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </AuthProvider>
  )
}

export default App
