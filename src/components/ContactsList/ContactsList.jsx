import {useSelector} from 'react-redux'
import css from './ContactsList.module.css'
// import { Loader } from 'components/Loader/Loader';
import { ContactItem } from './ContactItem/ContactItem';



export const ContactsList = () => {
    const stateContacts = useSelector(state => state.contacts.contacts)
    const isLoading = useSelector(state => state.contacts.isLoading)
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
            {isLoading && <h2>Loading...</h2>}
            <div className={css.contactsContainer}>
                <ul className={css.contactsList}>
                    {filteredContacts && filteredContacts.map((contact) =>
                        <ContactItem key={contact.id} contact={contact}/>)}
                </ul>
            </div>
        </>
    )
}