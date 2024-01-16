import css from '../ContactsList.module.css'
import { useDispatch} from "react-redux";
import { deleteContactsThunk } from "../../../redux/contactsThunk";
import { MdDeleteForever } from "react-icons/md";
import { setCurrentContactId } from '../../../redux/contactsSlice';
import { clearCurrentContact } from '../../../redux/contactsSlice';
import { useSelector } from 'react-redux';



export const ContactItem = ({contact, colors}) =>{
    const dispatch = useDispatch();
    const {name, number, id} = contact
    const currentId = useSelector(state => state.contacts.currentContactId)
    const stateContacts = useSelector(state => state.contacts.contacts)

    let isActive = (id === stateContacts[0].id)
    if(currentId){
        isActive = (currentId === id)
    }
    

    const onSetCurrentContact =(e)=>{
        const check = e.target.nodeName
        if(check === "svg" | check === "BUTTON" | check === "path"){
            return
        }
        dispatch(setCurrentContactId(id))
    }

    const handleDelete =()=>{
        dispatch(deleteContactsThunk(id))
        dispatch(clearCurrentContact())
    }


    return (
        <li onClick={onSetCurrentContact} className={`${css.listItem} ${isActive && css.active}`}>
            <div style={{backgroundColor: `${colors[id]}`}}>{name[0].toUpperCase()}</div>
            <p>{name}</p>
            <span>{number}</span>
            <button className={css.contactsButton} onClick={handleDelete}><MdDeleteForever fill="black" size="2em"/></button>
        </li>
    )
}