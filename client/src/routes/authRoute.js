import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import useAuth from '../hooks/useAuth';

const AuthRoute = ({component:Component,...rest}) => {
    const {auth,setAuth} = useAuth();
    console.log(auth)
    return (
        auth?<Outlet/>:<Navigate to="/admin"/>
    )
}

export default AuthRoute;