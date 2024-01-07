import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from "../../redux/auth/authThunk"
import { NavLink } from "react-router-dom"
import css from './LoginPage.module.css'

export const LoginPage = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isAuth = useSelector(state=>state.auth_token.access_token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        isAuth && navigate('/')
    }, [isAuth, navigate])

    const handleChange = e => {
        const name = e.target.name
        switch (name) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                console.log('error')
                break;
        }
    }

    const onSubmitForm = e => {
        e.preventDefault()
          const newUser = {
            email,
            password
          }
        dispatch(loginThunk(newUser))
        resetForm()
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <div className={css.loginFormWrap}>
            <h2>Log in</h2>
            <form className={css.loginForm} onSubmit={onSubmitForm}>
            <label  htmlFor="name">
                <input className={css.validation} onChange={handleChange} placeholder="Email" value={email}  type="email" name="email" required/>
            </label>
            <label  htmlFor="tel">
                <input className={css.validation} onChange={handleChange} placeholder="Password" value={password} type="password" name="password" required />
            </label>
            <button className={css.loginButton} type='submit'>Log in</button>
        </form>
            <div className={css.memberWrap}>
             <p>Not a member? <NavLink  to='/register'>Create new Account</NavLink></p>
            </div>
        </div>
  )
}