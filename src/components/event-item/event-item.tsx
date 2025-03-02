import { TEvent } from "../../services/eventsSlice";
import s from './event-item.module.scss';

type EventItemProps = {
    date: string,
    event: TEvent,
    handleModalOpen: (type: 'add' | 'edit', event: TEvent) => void,
    handleOnDelete: (date: string, event:TEvent) => void
}

const EventItem: React.FC<EventItemProps> = ({date, event, handleModalOpen, handleOnDelete }) => {
    return (
        <li className={s.eventWrapper}>
            <div className={s.eventInfo}>
                <p className={s.dscription}>{event.description}</p>
                <p className={s.period}>{`${event.startTime} - ${event.endTime}`}</p>
            </div>
            <div className={s.eventControls}>
                <button onClick={() => handleModalOpen('edit', event)}>Edit</button> 
                <hr />
                <button onClick={() => handleOnDelete(date as string, event)}>Delete</button>
            </div>
        </li>
    )
}

export default EventItem;