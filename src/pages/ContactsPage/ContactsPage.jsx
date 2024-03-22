import { Filter } from "components/Filter/Filter"
import { SelectedContact } from "components/SelectedContact/SelectedContact"
import { ContactsList } from "components/ContactsList/ContactsList"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getContactsThunk } from "../../redux/contactsThunk"
import getRandomColor from "../../utils/randomColor"
import { TailSpin } from 'react-loader-spinner'
import css from './ContactsPage.module.css'
import { Link } from "react-router-dom"


export const ContactsPage = () =>{
    
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
        <div className={css.contacts}>
          <div className={css.header}>
            <Filter/>
            <Link className={css.addButton} to="/contacts/add" ><span></span>Add Contact</Link>
          </div>
          <div className={css.contactsMainPage}>
              <div className={css.contactsListContainer}>
              <div className={css.loader}>{isLoading && <TailSpin visible={true} height="50" width="50" color="rgb(132, 85, 246)" ariaLabel="tail-spin-loading" radius="2" wrapperStyle={{}} wrapperClass="" />}</div>
              <h2 className={css.title}>All Contacts: {stateContacts.length}</h2>
                {stateContacts?.length > 0 ? <ContactsList colors={colors} openConfirmModal={openConfirmModal} closeConfirmModal={closeConfirmModal}/> : <h3>You have no contacts in your list yet</h3>}
              </div> 
              {stateContacts[0] && <SelectedContact
                  openEditModal={openEditModal} openConfirmModal={openConfirmModal}
                  closeEditModal={closeEditModal} closeConfirmModal={closeConfirmModal}
                  editmodalIsOpen={editmodalIsOpen} confirmModalIsOpen={confirmModalIsOpen}
              />} 
          </div>
        </div> 
    )
}