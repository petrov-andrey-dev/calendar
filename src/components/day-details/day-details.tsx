import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteEvent, TEvent } from "../../services/eventsSlice";
import { closeModal, openModal } from "../../services/modalSlice";
import EventItem from "../event-item/event-item";
import EventForm from "../event-form/event-form";
import Modal from "../modal/modal";
import s from './day-details.module.scss';
import { ModalType } from "../../types/types";

const DayDetails: React.FC = () => {
    const { isActive } = useAppSelector(state => state.modal);
    const { date } = useParams();
    const events = useAppSelector(state => state.events);
    const title = moment(date).format('dddd, MMMM Do YYYY');
    const dispatch = useAppDispatch();
    const dateEvents = events[moment(date).format('YYYY-MM-DD')] || [];

    const handleModalOpen = (modalType: ModalType, data?: TEvent) => {
        dispatch(openModal({ modalType, data }))
    };

    const handleModalClose = () => {
        dispatch(closeModal())
    };

    const handleOnDelete = (date: string, event: TEvent) => {
        dispatch(deleteEvent({ date, event }))
        toast.error('Event deleted', { position: "bottom-center" })
    };

    return (
        <div className={s.dayWrapper}>
            <div>{title}</div>
            <button onClick={() => handleModalOpen(ModalType.ADD)} className={s.addButton}>
                <p>+</p>
                <p>Add event</p>
            </button>
            <ul>
                {dateEvents.length === 0
                    ? <p>No Events</p>
                    : dateEvents.map((event) => (
                        <EventItem 
                        key={event.id}
                        date={date as string} 
                        event={event} 
                        handleModalOpen={handleModalOpen} 
                        handleOnDelete={handleOnDelete} 
                        />
                    ))}
            </ul>
            {isActive && (
                <Modal onClose={handleModalClose}>
                    <EventForm />
                </Modal>
            )}
        </div>
    )
}

export default DayDetails;