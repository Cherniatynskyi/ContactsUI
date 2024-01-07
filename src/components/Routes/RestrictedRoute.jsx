import { useSelector } from "react-redux"
import {Navigate } from "react-router-dom"

export const RestrictedRoute   = ({element: Element})=>{
    const isAuth = useSelector(state => state.auth_token.access_token)
    return isAuth ? <Navigate to='/contacts'/> : <Element/>
}