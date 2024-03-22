import css from '../ContactsList.module.css'
import { useDispatch} from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { setCurrentContact } from '../../../redux/contactsSlice';
import { FaPhoneAlt } from "react-icons/fa";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';



export const ContactItem = ({contact, openConfirmModal}) =>{
    const dispatch = useDispatch();
    const {name, phone, _id} = contact
    const currentContact = useSelector(state => state.contacts.currentContact)
    const stateContacts = useSelector(state => state.contacts.contacts)

    let isActive = (_id === stateContacts[0]._id)
    if(currentContact){
        isActive = (currentContact._id === _id)
    }

    const isMobileDimension = (window.innerWidth < 1020)
    

    const onSetCurrentContact =()=>{
        console.log(currentContact)
        dispatch(setCurrentContact(contact))
    }

    const LiBody = <>
            <div className={css.infoWrap}>
                <div className={css.profileWrap}><FaUser className={css.frofileIcon} size="1.5em"/></div>
                <div className={css.details}>
                     <p className={css.userName}><RxLetterCaseCapitalize size="0.8em"/>{name}</p>
                    <span className={css.userNumber}><FaPhoneAlt size="0.8em"/>{phone}</span>
                </div>
            </div>
            <button className={css.contactsButton} onClick={openConfirmModal}><MdDeleteForever  size="2em"/></button>
            </>


    return (
        <li className={css.listItemWrap} onClick={onSetCurrentContact}>
            {isMobileDimension ?
            <Link   to={isMobileDimension ? `/contacts/${_id}` : `/contacts`}   className={`${css.listItem} ${(isActive & !isMobileDimension) && css.active}`}>
                {LiBody}
            </Link> :
            <div  className={`${css.listItem} ${(isActive & !isMobileDimension) && css.active}`}>
                {LiBody}
            </div>}
        </li>
    )
}