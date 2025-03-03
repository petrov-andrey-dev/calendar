import moment from 'moment';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../hooks/hooks';
import Calendar from '../../pages/calendar';
import Day from '../../pages/day';
import s from './app.module.scss';

const App: React.FC = () => {
  const { today } = useAppSelector(state => state.dates);
  const events = useAppSelector(state => state.events);

  useEffect(() => {
    const startEventNotify = () => {
      const dateEvents = events[moment(today).format('YYYY-MM-DD')]
      const now = moment().format('HH:mm')
      if (dateEvents && dateEvents.length > 0) {
        dateEvents.forEach((event) => {
          const startTTime = moment(event.startTime, 'HH:mm').clone()          
          const notifyTime = startTTime.subtract(event.remindTime, 'minutes').format('HH:mm')  
          if (event.remind && notifyTime === now) {
            toast(`The "${event.description}" event will start at ${event.startTime}!`)
          }
          if (event.startTime === now) {
            toast(`The "${event.description}" event starts now!`)
          }
        })
      }
    }
    startEventNotify();
    const interval = setInterval(startEventNotify, 60 * 1000);
    return () => clearInterval(interval)
  }, [events, today])

  return (
    <div className={s.app}>
      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={true} />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path='/:date' element={<Day />} />
      </Routes>
    </div>
  )
}

export default App
