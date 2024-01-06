import {useSelector, useDispatch} from 'react-redux'
import { setFilter } from "../../redux/filterSlice";
import css from './Filter.module.css'

export const Filter = () => {

    const stateFilter = useSelector(state => state.filter.filter)
    const dispatch = useDispatch();

    const changeFilter = e => {
        dispatch(setFilter(e.currentTarget.value))
      }

    return (<label className={css.filterLabel}>
        Filter
        <input className={css.filterInput} type="text" value={stateFilter} onChange={changeFilter} />
    </label>)
}