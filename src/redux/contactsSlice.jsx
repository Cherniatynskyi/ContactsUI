import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import { addContactsThunk, getContactsThunk, deleteContactsThunk } from "./operations";

const handlePending = (state) => {
    state.isLoading = true
}

const handleFulfilledGet = (state,{payload}) => {
    state.isLoading = false
    state.contacts = payload
    state.error = ''
}

const handleFulfilledAdd = (state, action) => {
    state.isLoading = false
    state.contacts.push(action.payload)
    state.error = ''
}

const handleFulfilledDel = (state,{payload}) => {
    state.isLoading = false
    state.contacts = state.contacts.filter(el=>el.id!==payload?.id)
    state.error = ''
}

const handleRejected = (state,{payload}) => {
    state.error = payload
    state.isLoading = false
    console.log('error')
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts:[],
        isLoading: false,
        error: ''
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getContactsThunk.fulfilled, handleFulfilledGet)
        .addCase(addContactsThunk.fulfilled, handleFulfilledAdd)
        .addCase(deleteContactsThunk.fulfilled, handleFulfilledDel)
        .addMatcher(isAnyOf(getContactsThunk.pending, addContactsThunk.pending, deleteContactsThunk.pending), handlePending)
        .addMatcher(isAnyOf(getContactsThunk.rejected, addContactsThunk.rejected, deleteContactsThunk.rejected), handleRejected)
    }
})