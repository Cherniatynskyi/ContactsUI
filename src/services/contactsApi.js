import { instance } from './auth'

export const getContacts = async() =>{
    const {data} = await instance('/contacts')
    return data
 }

export const addContact = async ({name, number}) => {
    return await instance.post('/contacts', {name, number}) 
}

export const deleteContact = async (id) => {
    return await instance.delete(`/contacts/${id}`)
}

export const updateContact = async(id, data)=>{
   return await instance.patch(`/contacts/${id}`, data)
}

