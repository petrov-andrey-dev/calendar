import moment, { Moment } from "moment"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"
import s from './calendar-month-cell.module.scss'

type CalendarMonthCellProps = {
    day: Moment
}

const CalendarMonthCell: React.FC<CalendarMonthCellProps> = ({ day }) => {
    const { today, selectedYear, selectedMonth } = useAppSelector(state => state.dates)
    const events = useAppSelector(state => state.events);
    const dateEvents = events[moment(day).format('YYYY-MM-DD')]
    const isToday = day.isSame(today.format('YYYY-MM-DD')) ? s.today : '';
    const isNotSelectedMonth =
        !day.isSame(moment().year(selectedYear).month(selectedMonth), "month")
            ? s.isNotSelectedMonth
            : ""

    return (
        <Link
            className={s.day}
            to={`/${day.format('YYYY-MM-DD')}`}
        >
            <div className={`${s.date} ${isToday} ${isNotSelectedMonth}`}>{day.format('DD')}</div>
            <ul>
                {dateEvents && dateEvents.slice(0, 3).map(event => (
                    <li key={event.id}><p>{event.description}</p></li>
                ))}
            </ul>

        </Link>
    )
}

export default CalendarMonthCell;