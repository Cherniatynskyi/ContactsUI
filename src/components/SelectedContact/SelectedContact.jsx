import css from './SelectedContacts.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteContactsThunk } from '../../redux/contactsThunk'
import { clearCurrentContact } from '../../redux/contactsSlice'

export const SelectedContact = () =>{

    const dispatch = useDispatch()
    const stateContacts = useSelector(state => state.contacts.contacts)
    const currentId = useSelector(state => state.contacts.currentContactId)

    if(currentId){
        const currentContact = stateContacts.find(contact => contact.id === currentId)
        var {name, number, id} = currentContact
    }

    const handleDelete =()=>{
        dispatch(deleteContactsThunk(id))
        dispatch(clearCurrentContact())
    }

    return (
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
                <button className={css.deleteButton} onClick={handleDelete}>delete</button>
            </div>
        </div>
    )
}