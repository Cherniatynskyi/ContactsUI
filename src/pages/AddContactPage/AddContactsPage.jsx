import css from './AddContactPage.module.css'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { AddContactForm } from 'components/ContactForm/AddContactForm'

export const AddContactPage = ()=>{
    return (
    <div className={css.fromContainer}>
        <Link className={css.backButton} to="/contacts"><FaArrowLeftLong /> Back</Link>
        <AddContactForm/>
    </div>)
}