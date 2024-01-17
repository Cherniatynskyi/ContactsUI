import {useSelector} from 'react-redux'
import css from './ContactsList.module.css'
import { ContactItem } from './ContactItem/ContactItem';



export const ContactsList = ({colors, openConfirmModal, closeConfirmModal}) => {
    const stateContacts = useSelector(state => state.contacts.contacts)
    const stateFilter = useSelector(state => state.filter.filter)
    const getFilteredContacts = () => {
        const normalizedFilter = stateFilter.toLowerCase()
        if(stateContacts){
            return stateContacts.filter(contact => contact?.name.toLowerCase().includes(normalizedFilter))
        }
      }

    const filteredContacts = getFilteredContacts()

    return (
        <>
            <div className={css.contactsContainer}>
                <ul className={css.contactsList}>
                    {filteredContacts && filteredContacts.map((contact) =>
                        <ContactItem  key={contact.id} contact={contact} colors = {colors} openConfirmModal={openConfirmModal} closeConfirmModal={closeConfirmModal}/>)}
                </ul>
            </div>
        </>
    )
}