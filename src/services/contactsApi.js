import { instance } from './auth'

export const getContacts = async() =>{
    const {data} = await instance('/contacts')
    return data
 }

export const addContact = async (data) => {
    return await instance.post('/contacts', data) 
}

export const deleteContact = async (id) => {
    return await instance.delete(`/contacts/${id}`)
}

export const updateContact = async(id, data)=>{
    console.log(id)
    console.log(data)
   return await instance.put(`/contacts/${id}`, data)
}

