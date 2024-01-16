import { Filter } from "components/Filter/Filter"
import { SelectedContact } from "components/SelectedContact/SelectedContact"
import { AddContactModal } from "components/AddContactModal/AddContactModal"
import { ContactsList } from "components/ContactsList/ContactsList"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getContactsThunk } from "../../redux/contactsThunk"
import getRandomColor from "../../utils/randomColor"
import css from './ContactsPage.module.css'



export const ContactsPage = () =>{
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const stateContacts = useSelector(state => state.contacts.contacts)
    const isRefreshed = useSelector(state => state.auth_token.profile)
    const dispatch = useDispatch()
    const contactsIds = stateContacts.map(contact => contact.id)
    const colors = {}
    for (let index = 0; index < contactsIds.length; index++) {
      colors[contactsIds[index]] = getRandomColor()
    }
      

    useEffect(() => {
      if(isRefreshed){
        dispatch(getContactsThunk())
      }  
    }, [dispatch, isRefreshed])

    const openModal = () =>{
      setModalIsOpen(true)
    }

    const closeModal = () => {
      setModalIsOpen(false)
   }

    return (
         <>
          <div className={css.header}>
            <div onClick={openModal}><span>+</span>New Contact</div>
            <h2>All Contacts: {stateContacts.length}</h2>
          </div>
          {modalIsOpen && <AddContactModal onClose={closeModal}/>}
          <div className={css.contactsMainPage}>
            {stateContacts[0] && <SelectedContact/>}
            <div className={css.contactsListContainer}>
              <Filter/>
              {stateContacts?.length > 0 ? <ContactsList colors={colors}/> : <h3>You have no contacts in your list yet</h3>}
            </div>
          </div>
            </> 
    )
}