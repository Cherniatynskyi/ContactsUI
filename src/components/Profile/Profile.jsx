import css from './Profile.module.css'
import { useState } from 'react'

export const Profile = ({profile, logout}) =>{

    const [modalIsOpen, setmodalIsOpen] = useState(false)
    const arrow = '>'

    const handleClick = ()=>{
        setmodalIsOpen(prevState => !prevState)
        console.log(modalIsOpen)
    }

    return (
        <>
            {!modalIsOpen ?
            <div onClick={handleClick} className={css.profileLink}>
                <div>{profile.name[0]}</div>
            </div>:
             <div className={css.profileContainer}>
                <div className={css.profileWrap}>
                    <h2>Profile</h2>
                    <button className={css.backButton} onClick={handleClick}>{arrow}</button>
                    <div className={css.infoContainer}>
                        <p className={css.infoName}>{profile.name}</p>
                        <p className={css.infoMail}>{profile.email}</p>
                    </div>
                    <button className={css.logoutButton} onClick={logout}>Log out</button>
                </div>
            </div>}
        </>)
        
}