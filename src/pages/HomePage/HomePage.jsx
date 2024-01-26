import css from './HomePage.module.css'
import { NavLink } from 'react-router-dom'
import svg from '../../images/hero.svg'

export const HomePage = () =>{
    return (
        <div className={css.heroContainer}>
            <div className={css.heroContent}>
                <h1 className={css.heroTitle}>Create your contacts book</h1>
                <img className={css.heroImg} src={svg} alt="phonebook" />
            </div>
            <NavLink className={css.heroButton}  to='/login'>Click to start</NavLink>
        </div>)
}