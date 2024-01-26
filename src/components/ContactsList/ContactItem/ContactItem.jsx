import css from '../ContactsList.module.css'
import { useDispatch} from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { setCurrentContactId } from '../../../redux/contactsSlice';
import { FaPhoneAlt } from "react-icons/fa";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { useSelector } from 'react-redux';



export const ContactItem = ({contact, colors, openConfirmModal, closeConfirmmodal}) =>{
    const dispatch = useDispatch();
    const {name, number, id} = contact
    const currentId = useSelector(state => state.contacts.currentContactId)
    const stateContacts = useSelector(state => state.contacts.contacts)

    let isActive = (id === stateContacts[0].id)
    if(currentId){
        isActive = (currentId === id)
    }
    

    const onSetCurrentContact =()=>{
        dispatch(setCurrentContactId(id))
    }




    return (
        <li onClick={onSetCurrentContact} className={`${css.listItem} ${isActive && css.active}`}>
            <div className={css.infoWrap}>
                <div className={css.profileWrap}><FaUser className={css.frofileIcon} size="1.5em"/></div>
                <div className={css.details}>
                    <p className={css.userName}><RxLetterCaseCapitalize size="0.8em"/>{name}</p>
                    <span className={css.userNumber}><FaPhoneAlt size="0.8em"/>{number}</span>
                </div>
                </div>
            <button className={css.contactsButton} onClick={openConfirmModal}><MdDeleteForever  size="2em"/></button>
        </li>
    )
}