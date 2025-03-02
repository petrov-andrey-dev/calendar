import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useForm } from '../../hooks/useForm';
import { addEvent, updateEvent } from '../../services/eventsSlice';
import s from './event-form.module.scss'
import { closeModal } from '../../services/modalSlice';
import { TEvent } from '../../services/eventsSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ModalType } from '../../types/types';

const EventForm: React.FC = () => {
    const { modalType, data } = useAppSelector(state => state.modal)
    const initialValue = modalType === ModalType.EDIT && data
        ? data
        : {
            id: moment().unix(),
            description: '',
            startTime: '',
            endTime: '',
            remind: false,
            remindTime: null
        }
    const { values, handleChange } = useForm<TEvent>(initialValue)
    const [errors, setErrors] = useState({
        description: false,
        startTime: false,
        endTime: false,
    })
    const { date } = useParams();
    const dispatch = useAppDispatch();

    const validate = () => {
        const newErrors = {
            description: !values.description,
            startTime: !values.startTime,
            endTime: !values.endTime,
        }
        setErrors(newErrors)
        return !values.description || !values.startTime || !values.endTime
    }

    const onSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(errors)
        console.log(!validate());
        
        if (validate()) return
        if (modalType === ModalType.EDIT) {
            if (date) dispatch(updateEvent({ date, event: values }))
            toast.info('Event updated', { position: "bottom-center" })
        } else {
            if (date) dispatch(addEvent({ date, event: values }))
            toast.success('Event created', { position: "bottom-center" })
        }
        dispatch(closeModal())
    }

    return (
        <form className={s.form} onSubmit={onSubmitButton}>
            <input
                type="text"
                onChange={handleChange}
                value={values.description}
                name='description'
                className={`${errors.description ? s.error : ''}`}
            />
            <input
                type="time"
                onChange={handleChange}
                value={values.startTime}
                name='startTime'
                className={`${errors.startTime ? s.error : ''}`}
            />
            <input
                type="time"
                onChange={handleChange}
                value={values.endTime}
                name='endTime'
                className={`${errors.endTime ? s.error : ''}`}
            />
            <div className={s.remind}>
                <label>
                    Remind
                    <input type="checkbox" name='remind' checked={values.remind} onChange={handleChange} />
                </label>
                {values.remind && (
                    <select name='remindTime' value={values.remindTime || '15'} onChange={handleChange}>
                        <option value='15'>15 minutes</option>
                        <option value='30'>30 minutes</option>
                        <option value='60'>1 hour</option>
                    </select>
                )}
            </div>

            <button>Submit</button>
        </form>
    )
}

export default EventForm;