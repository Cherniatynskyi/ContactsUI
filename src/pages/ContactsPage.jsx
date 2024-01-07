import { ContactForm } from "components/ContactForm/ContactForm"
import { Filter } from "components/Filter/Filter"
import { ContactsList } from "components/ContactsList/ContactsList"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getContactsThunk } from "../redux/operations"


export const ContactsPage = () =>{

    const stateContacts = useSelector(state => state.contacts.contacts)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getContactsThunk())
    }, [dispatch])

    return (
         <>
          <ContactForm />
          <h2>Contacts</h2>
          <Filter/>
          {stateContacts?.length > 0 ? <ContactsList/> : <h3>You have no contacts in your list yet</h3>}
            </> 
    )
}