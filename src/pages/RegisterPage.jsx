import { useState, useEffect } from "react"
import { signUp } from "services/auth"
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"

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
        <form onSubmit={onSubmitForm}>
            <label  htmlFor="name">
                Name
                <input onChange={handleChange} value={name}  type="text" name="name" required/>
            </label>
            <label  htmlFor="email">
                Email
                <input onChange={handleChange} value={email}  type="email" name="email" required/>
            </label>
            <label  htmlFor="password">
                Password
                <input onChange={handleChange} value={password} type="password" name="password" required />
            </label>
            <button type='submit'>Log in</button>
        </form>
  )
}