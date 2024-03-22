import {useSelector, useDispatch} from 'react-redux'
import { setFilter } from "../../redux/filterSlice";
import { CiSearch } from "react-icons/ci";
import css from './Filter.module.css'

export const Filter = () => {

    const stateFilter = useSelector(state => state.filter.filter)
    const dispatch = useDispatch();
    const isMobileDimension = (window.innerWidth < 1020)

    const changeFilter = e => {
        dispatch(setFilter(e.currentTarget.value))
      }

    return (
    <label className={css.filterLabel}>
        
        <input className={css.filterInput} type="text" value={stateFilter} onChange={changeFilter} />
        <button className={css.searchButton}>{isMobileDimension ?  <CiSearch size="1.5em" fill="white"/> : 'search'}</button>
    </label>)
}