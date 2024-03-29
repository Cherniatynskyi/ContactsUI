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
    const token = `Bearer ${state.auth_token.access_token}`
    if(!token){
        return
    }
    setToken(token)
    const data = await getProfile()
    return data
})