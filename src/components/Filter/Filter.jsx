import {useSelector, useDispatch} from 'react-redux'
import { setFilter } from "../../redux/filterSlice";
import { CiSearch } from "react-icons/ci";
import css from './Filter.module.css'

export const Filter = () => {

    const stateFilter = useSelector(state => state.filter.filter)
    const dispatch = useDispatch();

    const changeFilter = e => {
        dispatch(setFilter(e.currentTarget.value))
      }

    return (<label className={css.filterLabel}>
        <CiSearch size="1.5em" fill="rgb(77, 77, 77)"/>
        <input className={css.filterInput} type="text" value={stateFilter} onChange={changeFilter} />
    </label>)
}