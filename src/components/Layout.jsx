import { Suspense, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import css from './App.module.css'
import { useDispatch } from "react-redux";
import { getProfileThunk } from "../redux/auth/authThunk";
import { logOut } from "../redux/auth/authSlice";
import {deleteToken} from '../services/auth'
import { clearContacts } from "../redux/contactsSlice";
import { Profile } from "./Profile/Profile";

export const Layout = () =>{
    const profile = useSelector(state => state.auth_token.profile)
    const isAuth = useSelector(state=>state.auth_token.access_token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isOnContactsPage = location.pathname === '/contacts'

    useEffect(() => {
      if(isAuth){
        dispatch(getProfileThunk())
        console.log(location)
      }
    }, [dispatch, isAuth, location])

    const handleLogout = () =>{
        dispatch(logOut())
        dispatch(clearContacts())
        navigate('/login')
        deleteToken()
    }
    
    return (
        <>
            <nav>
                <ul className={css.navList}>
                    <li className={css.navButton}><NavLink  to='/'>Contacts<span className={css.logoSpan}>UI</span></NavLink></li>
                    {isAuth && <li className={`${css.navButton} ${isOnContactsPage && css.isActive}`}><NavLink to='/contacts'>Contacts</NavLink></li> }
                </ul>
                <div>
                    {profile && <Profile profile={profile} logout={handleLogout}/>
                    }
                </div>
                {!profile && <ul className={css.authList}>
                    <li className={css.navButton}><NavLink  to='/login'>Log In</NavLink></li>
                    <li className={css.navButton}><NavLink to='/register'>Sign In</NavLink></li> 
                </ul>}    
            </nav>
            <main>
                <Suspense fallback={<div></div>}>
                    <Outlet/>
                </Suspense>
            </main>
        </>
    )
}