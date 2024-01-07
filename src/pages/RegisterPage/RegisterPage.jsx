import { useState, useEffect } from "react"
import { signUp } from "services/auth"
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"
import css from '../LoginPage/LoginPage.module.css'

export const RegisterPage = () =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const isAuth = useSelector(state=>state.auth_token.access_token)

    useEffect(()=>{
        isAuth && navigate('/')
    }, [isAuth, navigate])

    const handleChange = e => {
        const name = e.target.name
        switch (name) {
            case 'name':
                setName(e.target.value)
                break;
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
            name,
            email,
            password
          }
        console.log(newUser)
        signUp(newUser)
        .then(()=>{console.log('created')
           navigate('/login')})
        .catch((error)=>console.log(error))
        resetForm()
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className={css.loginFormWrap}>
            <h2>Sign in</h2>
            <form className={css.loginForm} onSubmit={onSubmitForm}>
                <label  htmlFor="name">
                    <input className={css.validation} onChange={handleChange}  placeholder="Name" value={name}  type="text" name="name" required/>
                </label>
                <label  htmlFor="email">
                    <input className={css.validation} onChange={handleChange}  placeholder="Email" value={email}  type="email" name="email" required/>
                </label>
                <label  htmlFor="password">
                    <input className={css.validation} onChange={handleChange}  placeholder="Password" value={password} type="password" name="password" required />
                </label>
                <button  className={css.loginButton} type='submit'>Sign in</button>
            </form>
        </div>
  )
}