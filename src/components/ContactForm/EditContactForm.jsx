import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import css from './ContactForm.module.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {updateContactThunk } from '../../redux/contactsThunk';

export const EditContactForm = ({onClose, id}) => {
    const stateContacts = useSelector(state => state.contacts.contacts)
    const currentContact = stateContacts.find(contact => contact.id === id)

    const [name, setName] = useState(currentContact.name)
    const [number, setNumber] = useState(currentContact.number)

    
    const dispatch = useDispatch();

    const handleChange = e => {
        const name = e.target.name
        switch (name) {
            case 'name':
                setName(e.target.value)
                break;
            case 'number':
                setNumber(e.target.value)
                break;
            default:
                console.log('error')
                break;
        }
    }

    const onSubmitForm = e => {
        if(name === currentContact.name & number === currentContact.number){
            Notify.failure("You haven't change anything");
        }
        e.preventDefault()
          const updatedContact = {
            id,
            name,
            number
          }
          dispatch(updateContactThunk(updatedContact))
        resetForm()
        onClose()
    }


    const resetForm = () => {
        setName('')
        setNumber('')
    }

        return(
        <>
        <form className={css.form} onSubmit={onSubmitForm}>
            <label className={css.label} htmlFor="name">
                Name
                <input onChange={handleChange}  defaultValue={currentContact.name} className={css.input} type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required/>
            </label>
            <label className={css.label} htmlFor="tel">
                Number
                <input onChange={handleChange}  defaultValue={currentContact.number} className={css.input} type="tel" name="number" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" required />
            </label>
            <button type='submit' className={css.formButton}>Edit Contact</button>
        </form>
        </>
    )
}
