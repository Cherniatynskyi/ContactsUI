import axios from "axios";

const instance = axios.create({baseURL: 'https://connections-api.herokuapp.com'})

const setToken = (token) =>{
    instance.defaults.headers.common['Authorization'] = token
}

export const deleteToken = ()=>{
    delete instance.defaults.headers.common['Authorization']
}

export const signUp = (body) =>{
   return instance.post('/users/signup', body)
}

export const logIn = async(body) =>{
    const {data} = await instance.post('/users/login', body)
    console.log(data)
    setToken(`Bearer ${data.token}`)
    return data
 }

 export const logOut = () =>{
    const {data} = instance.post('/users/logout')
    deleteToken()
    return data
 }

 export const getProfile = async() =>{
    const {data} = await instance('/users/current')
    return data
 }