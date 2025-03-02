import CalendarHeader from "../components/calendar-header/calendar-header";
import CalendarMonthGrid from "../components/calendar-month-grid/calendar-month-grid";
import CalendarYearGrid from "../components/calendar-year-grid/calendar-year-grid";
import { useAppSelector } from "../hooks/hooks";
import { ViewType } from "../types/calendar";

const Calendar: React.FC = () => {
    const {viewMode} = useAppSelector(state => state.dates);
    
    return (
        <>
         <CalendarHeader/>
         {viewMode === ViewType.MONTH ? <CalendarMonthGrid/> : <CalendarYearGrid/>}
        </>
    )
}

export default Calendar;