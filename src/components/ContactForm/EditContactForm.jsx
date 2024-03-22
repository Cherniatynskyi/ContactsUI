import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import css from './ContactForm.module.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {updateContactThunk } from '../../redux/contactsThunk';

export const EditContactForm = ({onClose, id}) => {
    const stateContacts = useSelector(state => state.contacts.contacts)
    const currentContact = stateContacts.find(contact => contact._id === id)
    const {_id, name, job, email, phone, address, linkedin} = currentContact

    const [formData, setFormData] = useState({
        name, job, email, phone, address, linkedin
    })

    
    const dispatch = useDispatch();

    const handleChange = e => {
        setFormData(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const onSubmitForm = e => {
        e.preventDefault()
        console.log(currentContact)
        console.log(formData)
        for(const value of Object.keys(formData)){
            if(formData[value] !== currentContact[value]){
                dispatch(updateContactThunk({_id, formData}))
                onClose()
                Notify.success(`Contact ${name} has been edited`);
                return
            }   
        }  
        Notify.failure("You haven't changed anything");    
    }



        return(
        <>
        <form className={css.formWrap} onSubmit={onSubmitForm}>
            <h2>Edit contact form</h2>
            <div className={css.formEdit}>
            <label className={css.label} htmlFor="name">
                <input onChange={handleChange} placeholder='Name' value={formData.name} className={css.input} type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
            </label>
            <label className={css.label} htmlFor="job">
                <input onChange={handleChange} placeholder='Job Designation' value={formData.job} className={css.input} type="tel" name="job" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"/>
            </label>
            <label className={css.label} htmlFor="phone">
                <input onChange={handleChange} placeholder='Phone' value={formData.phone} className={css.input} type="text" name="phone" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
            </label>
            <label className={css.label} htmlFor="email">
                <input onChange={handleChange} placeholder='Email' value={formData.email} className={css.input} type="mail" name="email" required/>
            </label>
            <label className={css.label} htmlFor="address">
                
                <input onChange={handleChange} placeholder='Address' value={formData.address} className={css.input} type="text" name="address"   />
            </label>
            <label className={css.label} htmlFor="linkedin">
                <input onChange={handleChange} placeholder='LinkedIn link' value={formData.linkedin} className={css.input} type="tel" name="linkedin"  />
            </label>
            </div>
            <button type='submit' className={css.formButton}>Edit Contact</button>
        </form>
        </>
    )
}
