import { useEffect, useRef } from 'react'
import css from './AddContactModal.module.css'
import { IoMdClose } from "react-icons/io";
import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';
import { deleteContactsThunk } from '../../redux/contactsThunk';
import { clearCurrentContact } from '../../redux/contactsSlice';

export const ConfirmDeleteModal = ({name, onClose, id}) => {

    const firstRender = useRef(false)
    const dispatch = useDispatch()

    useEffect(() => {
      if(firstRender.current === true){
        window.addEventListener('keydown', handleKeyDown)
      }

      return () => {
        firstRender.current = true
        window.removeEventListener('keydown', handleKeyDown)
      }
    },)

    const handleKeyDown = e => {
            if (e.code === 'Escape') {  
                onClose()              
            }
    }

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleButtonClose = ()=>{
      onClose()
    }

    const handleDelete =()=>{
        dispatch(deleteContactsThunk(id))
        dispatch(clearCurrentContact())
        onClose()
        Notify.success(`Contact ${name} has been deleted`);
    }

        return (
            <div className={css.Overlay} onClick={handleBackdropClick}>
                <div className={css.Modal}>
                    <div className={css.confirmContentContainer}>
                        <p>Are you sure you want to delete <b>{name}</b> from your contact book?</p>
                        <div className={css.buttonsContainer}>
                            <button className={css.confirmButton} onClick={handleDelete} type='button'>confirm</button>
                            <button className={css.cancelButton}  onClick={onClose} type='button'>cancel</button>
                        </div>
                    </div>
                <button onClick={handleButtonClose} className={css.closeButton}><IoMdClose className={css.closeIcon} fill="grey" size="1.75em"/></button>
                </div>
            </div>
        )
}