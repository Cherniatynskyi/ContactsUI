import { Suspense, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import css from './App.module.css'
import { useDispatch } from "react-redux";
import { getProfileThunk } from "../redux/auth/authThunk";
import { logOut } from "../redux/auth/authSlice";
import {deleteToken} from '../services/auth'

export const Layout = () =>{
    const profile = useSelector(state => state.auth_token.profile)
    const isAuth = useSelector(state=>state.auth_token.access_token)
    const dispatch = useDispatch()

    useEffect(() => {
      if(isAuth){
        dispatch(getProfileThunk())
      }
    }, [dispatch, isAuth])

    const handleLogout = () =>{
        dispatch(logOut())
        deleteToken()
    }
    
    return (
        <>
            <nav>
                <ul className={css.navList}>
                    <li className={css.navButton}><NavLink  to='/'>Home Page</NavLink></li>
                    <li className={css.navButton}><NavLink to='/contacts'>Contacts</NavLink></li> 
                </ul>
                <div>
                    {profile &&
                     <div>
                        <p>{profile.name}</p>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                    }
                </div>
                {!profile && <ul className={css.authList}>
                    <li className={css.navButton}><NavLink  to='/login'>Login</NavLink></li>
                    <li className={css.navButton}><NavLink to='/register'>Sign in</NavLink></li> 
                </ul>}    
            </nav>
            <main>
                <Suspense fallback={<div>Loading.....</div>}>
                    <Outlet/>
                </Suspense>
            </main>
        </>
    )
}