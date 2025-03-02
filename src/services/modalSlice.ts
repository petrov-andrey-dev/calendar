import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEvent } from "./eventsSlice";
import { ModalType } from "../types/types";

export type TModalSlice = {
    isActive: boolean;
    modalType: ModalType | null;
    data?: TEvent;
}

const initialState: TModalSlice = {
    isActive: false,
    modalType: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<Omit<TModalSlice, 'isActive'>>) {
            state.isActive = true;
            state.modalType = action.payload.modalType
            state.data = action.payload.data
        },
        closeModal(state) {
            state.isActive = false;
        }
    }
});

export const { openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;