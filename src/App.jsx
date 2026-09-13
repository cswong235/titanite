import AuthContext from './AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useLocalStorage } from 'usehooks-ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App(){
  // Stores the state and the setter for the login flag
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  // Stores the state and the setter for the logged in user's data
  const [userSession, setUserSession] = useLocalStorage("userSession", []);
  return(
    <>
      <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, userSession, setUserSession}}>
        <BrowserRouter>
          <Routes>
            <Route 
              element={
                <RequireAuth>
                  <Dashboard/>
                </RequireAuth>
              } 
              path="/dashboard"
            />
            <Route element={<Login/>} path="/login" />
            <Route element={<NotFound/>} path="*" />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}