import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { getMonthViewDates } from "../utils/calendar";
import { ViewType } from '../types/types';

const initialState = {
    today: moment(),
    selectedMonth: moment().month(),
    selectedYear: moment().year(),
    viewMode: ViewType.MONTH,
    days: getMonthViewDates(moment().year(), moment().month())
}

const datesSlice = createSlice({
    name: 'dates',
    initialState,
    reducers: {
        setYear: (state, action: PayloadAction<number>) => {
            state.selectedYear = action.payload;
            state.days = getMonthViewDates(state.selectedYear, state.selectedMonth)
        },
        setMonth: (state, action: PayloadAction<number>) => {
            state.selectedMonth = action.payload;
            state.days = getMonthViewDates(state.selectedYear, state.selectedMonth)
        },
        setViewMode: (state, action: PayloadAction<ViewType>) => {
            state.viewMode = action.payload
        }
    },
});

export const { setYear, setMonth, setViewMode } = datesSlice.actions;

export default datesSlice.reducer;