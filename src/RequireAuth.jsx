import { useContext } from 'react';
import AuthContext from './AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }){
    const isLoggedIn = useContext(AuthContext).isLoggedIn;
    if(isLoggedIn === false){
        return <Navigate to="/login" replace/>;
    }
    return children;
}