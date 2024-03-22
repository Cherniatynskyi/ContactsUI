import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ContactForm.module.css'
import { addContactsThunk } from '../../redux/contactsThunk';

export const AddContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        job: "",
        email: "",
        phone: "",
        address: "",
        linkedin: ""
    })

    const navigate = useNavigate();

    const stateContacts = useSelector(state => state.contacts.contacts)
    const isLoading = useSelector(state => state.contacts.isLoading)
    const dispatch = useDispatch();

    const handleChange = e => {
        setFormData(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const onSubmitForm = e => {
        e.preventDefault()
        if (!checkExistHandler('name', formData.name) || !checkExistHandler('phone', formData.phone) || !checkExistHandler('email', formData.email)) {
            return
          }
        
        const data = formData
        for (const field of Object.keys(data)){
            if(data[field] === ''){
                delete data[field]
            }
        }
        dispatch(addContactsThunk(data))
        resetForm()
        navigate('/contacts')
        Notify.success(`Contact ${formData.name} has been added`);
    }

    const checkExistHandler = (key, value) => {
        const res = stateContacts.find((contact) => {
            return contact[key] === value 
          })
          if (res) {
              Notify.failure(`${key} ${value} is already in contacts list`);
              return false
            }
            return true
          }

    const resetForm = () => {
        setFormData({name: "",job: "",email: "",phone: "",address: "",linkedin: ""})
    }

        return(
        <>
        <form className={css.formWrap} onSubmit={onSubmitForm}>
            <h2>Add contact form</h2>
            <div className={css.form}>
            <label className={css.label} htmlFor="name">
                <input onChange={handleChange} placeholder='Name' value={formData.name} className={css.input} type="text" name="name" minLength="2" maxLength="30"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
            </label>
            <label className={css.label} htmlFor="job">
                <input onChange={handleChange} placeholder='Job Designation' value={formData.job} className={css.input} type="text" name="job" minLength="2" maxLength="30"
                    title="Job title may contain only letters, apostrophe, dash and spaces. For example 'Web developer'"/>
            </label>
            <label className={css.label} htmlFor="phone">
                <input onChange={handleChange} placeholder='Phone' value={formData.phone} className={css.input} type="text" name="phone" minLength="4" maxLength="20"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" required />
            </label>
            <label className={css.label} htmlFor="email">
                <input onChange={handleChange} placeholder='Email' value={formData.email} className={css.input} type="email" name="email"
                    title="Email must contain valid address" required />
            </label>
            <label className={css.label} htmlFor="address">
                
                <input onChange={handleChange} placeholder='Address' value={formData.address} className={css.input} type="text" name="address" minLength="4" maxLength="30"
                    title="Address may contain only letters, apostrophe, dash and spaces. For example st. Deliver"  />
            </label>
            <label className={css.label} htmlFor="linkedin">
                <input onChange={handleChange} placeholder='LinkedIn link' value={formData.linkedin} className={css.input} type="url" name="linkedin" 
                    title="Link must be valid and starts with 'http://'"  />
            </label>
            </div>
            <button type='submit' className={css.formButton}>{isLoading? 'Adding...': 'Add Contact'}</button>
        </form>
        
        </>
    )
}
