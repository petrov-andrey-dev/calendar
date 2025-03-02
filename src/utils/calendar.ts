import moment, { Moment } from "moment"
import { numberOfDays } from "./const";

export const getMonthViewDates = (year: number, month: number): Moment[] => {
    const startMonthView = moment().year(year).month(month).startOf('month').startOf('week')
    return Array.from({length: numberOfDays}, (_, i) => startMonthView.clone().add(i, 'days'))
}

