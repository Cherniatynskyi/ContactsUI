import axios from 'axios'

export const getContacts = async () => {
    const response = await axios({ url: `https://65940be71493b0116069cd82.mockapi.io/contacts`, method: "GET" })
    return response.data
}

export const addContact = async ({name, phone}) => {
    return await axios.post('https://65940be71493b0116069cd82.mockapi.io/contacts', {name, phone}) 
}

export const deleteContact = async (id) => {
    return await axios.delete(`https://65940be71493b0116069cd82.mockapi.io/contacts/${id}`)
}