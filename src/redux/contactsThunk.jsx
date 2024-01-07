import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContacts, addContact, deleteContact } from "../services/contactsApi";

export const getContactsThunk = createAsyncThunk('contacts/getContacts', async()=>{
    return await getContacts()
})

export const addContactsThunk = createAsyncThunk('contacts/addContact', async(data)=>{
    const contacts = await addContact(data);
    return contacts.data
})

export const deleteContactsThunk = createAsyncThunk('contacts/deleteContact', async(id)=>{
    const contacts = await deleteContact(id);
    return contacts.data
})