import { useAppSelector } from "../../hooks/hooks"
import CalendarMonthCell from "../calendar-month-cell/calendar-month-cell";
import s from './calendar-month-grid.module.scss'
import moment from "moment";

const CalendarMonthGrid: React.FC = () => {
    const { days } = useAppSelector(state => state.dates)

    return (
        <>
            <div className={s.calendarHeader}>
                {Array.from({ length: 7 }).map((_, i) => <div className={s.cell} key={i}>{moment().day(i).format('dd')}</div>)}
            </div>
            <div className={s.calendarGrid}>
                {days.map(day => {
                    return (
                        <CalendarMonthCell key={day.format('YYYY-MM-DD')} day={day} />
                    )
                })}
            </div>
        </>
        
    )
}

export default CalendarMonthGrid