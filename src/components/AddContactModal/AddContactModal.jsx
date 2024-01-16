import { useEffect, useRef } from 'react'
import css from './AddContactModal.module.css'
import { ContactForm } from 'components/ContactForm/ContactForm'
import { IoMdClose } from "react-icons/io";

export const AddContactModal = ({contact, onClose}) => {

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
                <ContactForm closeModal={onClose}/>
                <button onClick={handleButtonClose} className={css.closeButton}><IoMdClose className={css.closeIcon} fill="grey" size="1.75em"/></button>
                </div>
            </div>
        )
}