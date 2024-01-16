import { Filter } from "components/Filter/Filter"
import { SelectedContact } from "components/SelectedContact/SelectedContact"
import { AddContactModal } from "components/AddContactModal/AddContactModal"
import { ContactsList } from "components/ContactsList/ContactsList"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getContactsThunk } from "../../redux/contactsThunk"
import css from './ContactsPage.module.css'


export const ContactsPage = () =>{
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const stateContacts = useSelector(state => state.contacts.contacts)
    const isRefreshed = useSelector(state => state.auth_token.profile)
    const dispatch = useDispatch()

    useEffect(() => {
      if(isRefreshed){
        dispatch(getContactsThunk())
      }  
    }, [dispatch, isRefreshed])

    const openModal = () =>{
      setModalIsOpen(true)
      console.log(stateContacts)
    }

    const closeModal = () => {
      setModalIsOpen(false)
   }

    return (
         <>
          <div className={css.header}>
          <Filter/>
            <div onClick={openModal}><span>+</span>New Contact</div>
          </div>
          {modalIsOpen && <AddContactModal onClose={closeModal}/>}
          <div className={css.contactsMainPage}>
            {stateContacts?.length > 0 ? <ContactsList/> : <h3>You have no contacts in your list yet</h3>}
            {stateContacts[0] && <SelectedContact/>}
          </div>
            </> 
    )
}