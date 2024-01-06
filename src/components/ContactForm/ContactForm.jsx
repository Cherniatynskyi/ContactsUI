import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ContactForm.module.css'
import { addContactsThunk } from '../../redux/operations';

export const ContactForm = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const stateContacts = useSelector(state => state.contacts.contacts)
    const isLoading = useSelector(state => state.contacts.isLoading)
    const dispatch = useDispatch();

    const handleChange = e => {
        const name = e.target.name
        switch (name) {
            case 'name':
                setName(e.target.value)
                break;
            case 'phone':
                setPhone(e.target.value)
                break;
            default:
                console.log('error')
                break;
        }
    }

    const onSubmitForm = e => {
        e.preventDefault()
        if (!checkExistHandler(name)) {
            return
          }
          const contact = {
            name,
            phone
          }
        dispatch(addContactsThunk(contact))
        resetForm()
    }

    const checkExistHandler = name => {
        const res = stateContacts.find((value) => {
            return value.name === name 
          })
          if (res) {
              Notify.failure(`${name} is already in contacts list`);
              return false
            }
            return true
          }

    const resetForm = () => {
        setName('')
        setPhone('')
    }

        return(
        <>
        <form className={css.form} onSubmit={onSubmitForm}>
            <label className={css.label} htmlFor="name">
                Name
                <input onChange={handleChange} value={name} className={css.input} type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
            </label>
            <label className={css.label} htmlFor="tel">
                Number
                <input onChange={handleChange} value={phone} className={css.input} type="tel" name="phone" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" required />
            </label>
            <button type='submit' className={css.formButton}>{isLoading? 'Adding...': 'Add Contact'}</button>
        </form>
        </>
    )
}
