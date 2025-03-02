import { configureStore } from "@reduxjs/toolkit";
import datesSlice from "./datesSlice";
import eventsSlice from "./eventsSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        dates: datesSlice,
        events: eventsSlice,
        modal: modalSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;