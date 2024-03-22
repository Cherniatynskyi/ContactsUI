import axios from "axios";

export const instance = axios.create({baseURL: 'http://localhost:3003/api'})

export const setToken = (token) =>{
    instance.defaults.headers.common['Authorization'] = token
}

export const deleteToken = ()=>{
    delete instance.defaults.headers.common['Authorization']
}

export const signUp = (body) =>{
   return instance.post('/users/register', body)
}

export const logIn = async(body) =>{
    const {data} = await instance.post('/users/login', body)
    setToken(`Bearer ${data.token}`)
    return data
 }

 export const logOut = () =>{
    const {data} = instance.post('/users/logout')
    deleteToken()
    return data
 }

 export const getProfile = async() =>{
    const {data} = await instance.get('/users/current')
    return data
 }
