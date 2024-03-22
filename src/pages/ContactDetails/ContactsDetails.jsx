import css from './ContactsDetails.module.css'
import { useSelector} from "react-redux";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

export const ContactDetails = () =>{
    const currentContact = useSelector(state => state.contacts.currentContact)
    const {name, phone, _id, job, email, address, linkedin} = currentContact

    return (
    <div className={css.detailsPage}>
        <div className={css.detailsMainInfo}>
            <h1 className={css.detailsName}>{name}</h1>
            <p className={css.detailsJob}>{job}</p>
        </div>    
        <div className={css.allInfo}>
            <h2 className={css.allInfoTitle}>Contacts Details</h2>
            <ul className={css.detailsList}>
                <li className={css.detailsItem}>
                    <span className={css.detailsThumb}>Phone</span>
                    <span className={css.detailsThumbDec}>:</span><FaPhoneAlt /><a href={`tel:${phone}`} className={css.infoListLink}>{phone}</a></li>
                <li className={css.detailsItem}>
                    <span className={css.detailsThumb}>Email</span>
                    <span className={css.detailsThumbDec}>:</span><MdEmail /><a href={`mailto:${email}`} className={css.infoListLink}>{email}</a></li>
                <li className={css.detailsItem}>
                    <span className={css.detailsThumb}>Address</span><span className={css.detailsThumbDec}>:</span><FaLocationDot /> {address?  <a href={`https://www.google.com/maps/search/?api=1&query=${address}`} className={css.infoListLink}>{address}</a> : <span className={css.infoListLink}>unknown</span>}</li>
                <li className={css.detailsItem}>
                    <span className={css.detailsThumb}>LinkedIn</span>
                    <span className={css.detailsThumbDec}>:</span><FaLinkedin/>{linkedin ? <a className={css.infoListLink} href={linkedin}>link <FaLink /></a>: 'no link'}</li>
            </ul>
        </div>
        <ul className={css.detailsButtonContainer}>
            <button className={css.detailsButton}>Call</button>
            <button className={css.detailsButton}>Edit</button>
            <button className={css.detailsButton}>Delete</button>
        </ul>
    </div>)
}