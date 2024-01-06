import css from '../ContactsList.module.css'
import { useDispatch} from "react-redux";
import { deleteContactsThunk } from "../../../redux/operations";


export const ContactItem = ({contact}) =>{
    const dispatch = useDispatch();
    const {name, phone, id} = contact

    return (
        <li>- {name}: {phone}
            <button className={css.contactsButton} onClick={()=>{dispatch(deleteContactsThunk(id))}}>Delete</button>
        </li>
    )
}