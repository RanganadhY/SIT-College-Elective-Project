import React ,{useEffect}from 'react'
import {Outlet, Navigate} from "react-router-dom"
import useAuth from '../hooks/useAuth';

const AuthRoute = ({component:Component,allowedRoles:allowedRoles,...rest}) => {
    const {auth,setAuth} = useAuth();
    const authInfo = window.localStorage.getItem("authInfo")
    var authInfoParsedData = JSON.parse(authInfo); 
    var authInfoParsedDataArray = [authInfoParsedData.role];

    // console.log(auth)
    return (
        authInfoParsedDataArray.find(role=>allowedRoles.includes(role))
        ?<Outlet/>
        :authInfoParsedData.token?<Navigate to="/not-authorized"/>
        :<Navigate to="/"/>
    )
}

export default AuthRoute;