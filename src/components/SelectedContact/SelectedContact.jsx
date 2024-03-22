import css from './SelectedContacts.module.css'
import { useSelector } from 'react-redux'
import { ContactModal } from 'components/ContactModals/ContactModal'
import { ConfirmDeleteModal } from 'components/ContactModals/ConfirmDeleteModal'
import svgImg from '../../images/contacts-img.svg'

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

export const SelectedContact = ({openConfirmModal, openEditModal, closeConfirmModal, closeEditModal, editmodalIsOpen, confirmModalIsOpen}) =>{
    

    const stateContacts = useSelector(state => state.contacts.contacts)
    const currentContact = useSelector(state => state.contacts.currentContact)

    const {name, phone, _id, job, email, address, linkedin} = currentContact || stateContacts[0]


    return(
        <>
        <div className={css.selectedContainer}>
                <div className={css.selectedHeader}>
                    <div className={css.profileImg}>{name[0].toUpperCase()}</div>
                    <div className={css.selctedBaseInfo}>
                        <h2 className={css.selectedName}>{name}</h2>
                        <p className={css.selectedJob}>{job}</p>
                    </div>
                </div>
                <ul className={css.infoList}>
                    <li className={css.infoListItem}>
                        <FaPhoneAlt />: <a href={`tel:${phone}`} className={css.infoListLink}>{phone}</a>
                    </li>
                    <li className={css.infoListItem}>
                        <MdEmail />: <a href={`mailto:${email}`} className={css.infoListLink}>{email}</a>
                    </li>
                    <li className={css.infoListItem}>
                        <FaLocationDot />:  {address?  <a href={`https://www.google.com/maps/search/?api=1&query=${address}`} className={css.infoListLink}>{address}</a> : <span className={css.infoListLink}>unknown</span>}
                    </li>
                    <li className={css.infoListItem}>
                        <FaLinkedin />: {linkedin ? <a className={css.infoListLink} href={linkedin}>link <FaLink /></a> : <span className={css.infoListLink}>unknown</span>}
                    </li>
                </ul>
                <div className={css.selectedButtonsContainer}>
                    <a className={css.telLink} href={`tel:${phone}`}>call</a>
                    <button className={css.editButton} onClick={openEditModal}>edit</button>
                    <button className={css.deleteButton} onClick={openConfirmModal}>delete</button>
                </div>
                {editmodalIsOpen && <ContactModal onClose={closeEditModal} id={_id}/>}
                
                <img className={css.svgImg} src={svgImg} alt="" /> 
            </div>
            {confirmModalIsOpen && <ConfirmDeleteModal name={name} onClose={closeConfirmModal} id={_id}/>}
             
        </>
    )
}