import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import moment from 'moment';
import s from './calendar-header.module.scss'
import { setMonth, setYear } from '../../services/datesSlice';
import { ViewType } from '../../types/types';

const CalendarHeader: React.FC = () => {
    const { selectedYear, selectedMonth, viewMode } = useAppSelector(state => state.dates);
    const dispatch = useAppDispatch()

    const currentYear = moment().year();
    const years = Array.from({ length: 61 }, (_, i) => currentYear - 10 + i);
    const months = Array.from({ length: 12 }, (_, i) => ({
        name: moment().month(i).format("MMM"),
        index: i
    }));
    

    const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setYear(Number(e.target.value)))
    }

    const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMonth(Number(e.target.value)))
    }
    
    return (
        <div className={s.header}>
            <div className={s.selectorsWrapper}>
                <select name="year" id="year" value={selectedYear} onChange={onChangeYear}>
                    {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
                <select name="month" id="month" value={selectedMonth} onChange={onChangeMonth}>
                    {months.map((month) => <option key={month.index} value={month.index}>{month.name}</option>)}
                </select>
            </div>
            <div className={s.modeWrapper}>
                <button className={`${s.buttonLeft} ${viewMode === ViewType.MONTH ? s.active : ''}`}>MONTH</button>
                <button className={`${s.buttonRight} ${viewMode === ViewType.YEAR ? s.active : ''}`} disabled>YEAR</button>
            </div>
        </div>
    )
}

export default CalendarHeader;