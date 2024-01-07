import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, logIn, setToken } from "services/auth";

export const loginThunk = createAsyncThunk('auth/login', async(body) =>{
    return await logIn(body)
})

export const getProfileThunk = createAsyncThunk('auth/profile', async()=>{
    return await getProfile()
})

export const fetchCurrentUser = createAsyncThunk('auth/refresh', async(_, thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth_token.access_token
    if(!token){
        return
    }
    setToken(token)
    const data = await getProfile()
    console.log(data)
    return data
})