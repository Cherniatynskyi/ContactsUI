import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import { addContactsThunk, getContactsThunk, deleteContactsThunk, updateContactThunk } from "./contactsThunk";

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
    state.contacts = state.contacts.filter(el=>el._id!==payload?._id)
    state.error = ''
}

const handleFulfilledUpdate = (state,{payload}) => {
    state.isLoading = false
    state.contacts = state.contacts.map(contact => {
        if(contact._id === payload._id){
            return payload
        }
        return contact
    })
    state.error = ''
}

const handleRejected = (state, {error}) => {
    state.error = error.message
    state.isLoading = false
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts:[],
        isLoading: false,
        error: '',
        currentContact: null
    },
    reducers:{
        clearContacts(state){
            state.contacts = []
        },
        setCurrentContact(state, {payload}){
            state.currentContact = payload
        },
        clearCurrentContact(state){
            state.currentContact = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getContactsThunk.fulfilled, handleFulfilledGet)
        .addCase(addContactsThunk.fulfilled, handleFulfilledAdd)
        .addCase(deleteContactsThunk.fulfilled, handleFulfilledDel)
        .addCase(updateContactThunk.fulfilled, handleFulfilledUpdate)
        .addMatcher(isAnyOf(getContactsThunk.pending, addContactsThunk.pending, deleteContactsThunk.pending, updateContactThunk.pending), handlePending)
        .addMatcher(isAnyOf(getContactsThunk.rejected, addContactsThunk.rejected, deleteContactsThunk.rejected, updateContactThunk.rejected), handleRejected)
    }
})

export const {clearContacts, setCurrentContact, clearCurrentContact} = contactsSlice.actions