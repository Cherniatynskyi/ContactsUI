import css from './SelectedContacts.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteContactsThunk} from '../../redux/contactsThunk'
import { clearCurrentContact } from '../../redux/contactsSlice'
import { AddContactModal } from 'components/ContactModals/AddContactModal'

export const SelectedContact = ({onOpen, onClose, isOpen}) =>{

    const dispatch = useDispatch()
    const stateContacts = useSelector(state => state.contacts.contacts)
    const currentId = useSelector(state => state.contacts.currentContactId)


    const currentContact = stateContacts.find(contact => contact.id === currentId)
    const {name, number, id} = currentContact || stateContacts[0]
    

    const handleDelete =()=>{
        dispatch(deleteContactsThunk(id))
        dispatch(clearCurrentContact())
    }

    const handleUpdate = () =>{
        onOpen()
    }


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
                    <button className={css.editButton} onClick={handleUpdate}>edit</button>
                    <button className={css.deleteButton} onClick={handleDelete}>delete</button>
                </div>
                {isOpen && <AddContactModal onClose={onClose} id={id}/>}
            </div>
    )
}