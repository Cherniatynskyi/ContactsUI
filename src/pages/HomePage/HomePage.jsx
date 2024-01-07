import css from './HomePage.module.css'
import { NavLink } from 'react-router-dom'


export const HomePage = () =>{
    return (
        <div className={css.heroContainer}>
            <h1>Create your contacts<br/>book</h1>
            <img src="https://i.pinimg.com/originals/68/5c/ce/685cceffa93afa89416c4345481bf834.png" alt="phonebook" />
            <button className={css.heroButton}><NavLink  to='/login'>Click to start</NavLink></button>
        </div>)
}