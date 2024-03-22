import { useEffect, useRef } from 'react'
import css from './AddContactModal.module.css'
import { IoMdClose } from "react-icons/io";
import { EditContactForm } from 'components/ContactForm/EditContactForm';

export const ContactModal = ({ onClose, contentType= "edit", id}) => {

    const firstRender = useRef(false)

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

        return (
            <div className={css.Overlay} onClick={handleBackdropClick}>
                <div className={css.Modal}>
                  <EditContactForm onClose={onClose} id={id}/>
                  <button onClick={handleButtonClose} className={css.closeButton}><IoMdClose className={css.closeIcon} fill="grey" size="2em"/></button>
                </div>
            </div>
        )
}