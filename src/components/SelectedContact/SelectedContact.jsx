import css from './SelectedContacts.module.css'
import { useSelector } from 'react-redux'
import { ContactModal } from 'components/ContactModals/ContactModal'
import { ConfirmDeleteModal } from 'components/ContactModals/ConfirmDeleteModal'

export const SelectedContact = ({openConfirmModal, openEditModal, closeConfirmModal, closeEditModal, editmodalIsOpen, confirmModalIsOpen}) =>{
    

    const stateContacts = useSelector(state => state.contacts.contacts)
    const currentId = useSelector(state => state.contacts.currentContactId)


    const currentContact = stateContacts.find(contact => contact.id === currentId)
    const {name, number, id} = currentContact || stateContacts[0]


    return(
        <div className={css.selectedContainer}>
                <div className={css.profileImg}>{name[0].toUpperCase()}</div>
                <ul className={css.infoList}>
                    <li className={css.infoListItem}>
                        <p>Contact name</p>
                        <span>{name}</span>
                    </li>
                    <li className={css.infoListItem}>
                        <p>Phone number</p>
                        <span>{number}</span>
                    </li>
                </ul>
                <div className={css.selectedButtonsContainer}>
                    <a className={css.telLink} href={`tel:${number}`}>call</a>
                    <button className={css.editButton} onClick={openEditModal}>edit</button>
                    <button className={css.deleteButton} onClick={openConfirmModal}>delete</button>
                </div>
                {editmodalIsOpen && <ContactModal onClose={closeEditModal} id={id}/>}
                {confirmModalIsOpen && <ConfirmDeleteModal name={name} onClose={closeConfirmModal} id={id}/>}
            </div>
    )
}