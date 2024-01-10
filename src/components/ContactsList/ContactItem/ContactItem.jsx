import css from '../ContactsList.module.css'
import { useDispatch} from "react-redux";
import { deleteContactsThunk } from "../../../redux/contactsThunk";
import getRandomColor from 'utils/randomColor';
import { MdDeleteForever } from "react-icons/md";
import { setCurrentContactId } from '../../../redux/contactsSlice';
import { clearCurrentContact } from '../../../redux/contactsSlice';


export const ContactItem = ({contact}) =>{
    const dispatch = useDispatch();
    const {name, number, id} = contact


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
        <li onClick={onSetCurrentContact} className={css.listItem}>
            <div style={{backgroundColor: `${getRandomColor()}`}}>{name[0].toUpperCase()}</div>
            <p>{name}</p>
            <span>{number}</span>
            <button className={css.contactsButton} onClick={handleDelete}><MdDeleteForever fill="black" size="2em"/></button>
        </li>
    )
}