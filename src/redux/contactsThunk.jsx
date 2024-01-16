import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContacts, addContact, deleteContact, updateContact } from "../services/contactsApi";

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

export const updateContactThunk = createAsyncThunk('contacts/updateContact', async({id, name, number})=>{
    const contacts = await updateContact(id, {name, number})
    return contacts.data
})