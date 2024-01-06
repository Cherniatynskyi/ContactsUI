import { getProfileThunk, loginThunk } from "./authThunk";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
    access_token: '',
    isLoading: false,
    error: '',
    profile: null
}

const handlePending = (state) =>{
    state.isLoading = true
}

const handleFulfilledLogin = (state, {payload}) =>{
    state.isLoading = false
    state.error = ''
    state.access_token = payload.token
}

const handleFulfilledProfile = (state, {payload}) =>{
    state.isLoading = false
    state.error = ''
    state.profile = payload
}

const handleRejected = (state, {payload}) =>{
    state.isLoading = false
    state.error = payload
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logOut(state){
            state.profile = null
            state.access_token = ''
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(loginThunk.fulfilled, handleFulfilledLogin)
        .addCase(getProfileThunk.fulfilled, handleFulfilledProfile)
        .addMatcher(isAnyOf(loginThunk.pending, getProfileThunk.pending), handlePending)
        .addMatcher(isAnyOf(loginThunk.rejected, getProfileThunk.rejected), handleRejected)
    }
})

export const {logOut} = authSlice.actions

