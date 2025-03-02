import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TEvent = {
    id: number,
    description: string,
    startTime: string,
    endTime: string,
    remind: boolean,
    remindTime: number | null
}

type DayEvents = Record<string, TEvent[]>;

const initialState: DayEvents = {};

const eventsSlice = createSlice({
    name: 'dates',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<{date: string; event: TEvent}>) => {
            const { date, event } = action.payload
            if (!state[date]) {
                state[date] = [];
            }
            state[date].push(event)
        },
        updateEvent: (state, action: PayloadAction<{date: string; event: TEvent}>) => {
            const { date, event } = action.payload
            const eventIndex = state[date].findIndex((e) => e.id) 
            state[date][eventIndex] = event
        },
        deleteEvent: (state, action: PayloadAction<{date: string; event: TEvent}>) => {
            const {date, event} = action.payload;
            state[date] = state[date].filter((e) => e.id !== event.id)
        }
    },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;