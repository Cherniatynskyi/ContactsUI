import { Filter } from "components/Filter/Filter"
import { SelectedContact } from "components/SelectedContact/SelectedContact"
import { ContactModal } from "../../components/ContactModals/ContactModal"
import { ContactsList } from "components/ContactsList/ContactsList"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getContactsThunk } from "../../redux/contactsThunk"
import getRandomColor from "../../utils/randomColor"
import { TailSpin } from 'react-loader-spinner'
import css from './ContactsPage.module.css'

export const ContactsPage = () =>{
    const [AddmodalIsOpen, setAddModalIsOpen] = useState(false)
    
    const stateContacts = useSelector(state => state.contacts.contacts)
    const isLoading = useSelector(state => state.contacts.isLoading)
    const isRefreshed = useSelector(state => state.auth_token.profile)

    const dispatch = useDispatch()
    const contactsIds = stateContacts.map(contact => contact.id)
    const colors = {}
    for (let index = 0; index < contactsIds.length; index++) {
      colors[contactsIds[index]] = getRandomColor()
    }

    const [editmodalIsOpen, setEditModalIsOpen] = useState(false)
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false)
      

    useEffect(() => {
      if(isRefreshed){
        dispatch(getContactsThunk())
      }  
    }, [dispatch, isRefreshed])

    const openAddModal = () =>{
      setAddModalIsOpen(true)
    }

    const closeAddModal = () => {
      setAddModalIsOpen(false)
   }

   const openEditModal = ()=>{
    setEditModalIsOpen(true)
    }

    const closeEditModal = ()=>{
      setEditModalIsOpen(false)
    }


   const openConfirmModal = ()=>{
      setConfirmModalIsOpen(true)
    }

    const closeConfirmModal = ()=>{
        setConfirmModalIsOpen(false)
    }

    return (
         <>
          <div className={css.header}>
            <div className={css.addButton} onClick={openAddModal}><span>+</span>New Contact</div>
            <h2>All Contacts: {stateContacts.length}</h2>
            <div className={css.loader}>{isLoading && <TailSpin visible={true} height="50" width="50" color="#4545E1 " ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" />}</div>
          </div>
          {AddmodalIsOpen && <ContactModal onClose={closeAddModal} contentType="add"/>}
          <div className={css.contactsMainPage}>
            {stateContacts[0] && <SelectedContact
                openEditModal={openEditModal} openConfirmModal={openConfirmModal}
                closeEditModal={closeEditModal} closeConfirmModal={closeConfirmModal}
                editmodalIsOpen={editmodalIsOpen} confirmModalIsOpen={confirmModalIsOpen}
            />}
            <div className={css.contactsListContainer}>
              <Filter/>
              {stateContacts?.length > 0 ? <ContactsList colors={colors} openConfirmModal={openConfirmModal} closeConfirmModal={closeConfirmModal}/> : <h3>You have no contacts in your list yet</h3>}
            </div>
            
          </div>
            </> 
    )
}