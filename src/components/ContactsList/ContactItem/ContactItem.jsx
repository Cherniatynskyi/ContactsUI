import css from '../ContactsList.module.css'
import { useDispatch} from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { setCurrentContactId } from '../../../redux/contactsSlice';
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
            <div style={{backgroundColor: `${colors[id]}`}}>{name[0].toUpperCase()}</div>
            <p>{name}</p>
            <span>{number}</span>
            <button className={css.contactsButton} onClick={openConfirmModal}><MdDeleteForever fill="black" size="2em"/></button>
        </li>
    )
}