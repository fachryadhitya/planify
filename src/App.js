import './App.css';
import useModal from './hooks/useModal';
import Modal from './components/modal/modal';
import { useEffect, useState } from 'react';
import { getDateVar, getMonthName } from './utils/date';
import { getAllEvent } from './services/api';
import Box from './components/box/box';

function App() {
  const { isShowing, toggle } = useModal();

  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [dateInMonth, setDateInMonth] = useState([]);
  const [eventListPerDay, setEventListPerDay] = useState([]);

  useEffect(() => {
    const eventList = getAllEvent();

    setList(eventList);
  }, [isShowing]);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dt = getDateVar('dt');
  const day = getDateVar('day');
  const month = getDateVar('month');
  const year = getDateVar('year');

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  function configureDate() {
    const arr = [];

    for (let i = 0; i <= paddingDays + daysInMonth; i++) {
      const current = new Date();

      if (i < paddingDays) {
        arr[1 - i] = {
          date: prevLastDay - i,
          month: getMonthName(month - 1),
          day: new Date(`${month}/${prevLastDay - i}/${year}`).toLocaleDateString('en-us', {
            weekday: 'long',
          }),
        };
      } else if (i > paddingDays) {
        current.setMonth(month - 1);

        arr[i] = {
          date: i - paddingDays,
          month: getMonthName(month),
          day: new Date(`${month + 1}/${i - paddingDays}/${year}`).toLocaleDateString('en-us', {
            weekday: 'long',
          }),
        };
      }
    }

    setDateInMonth(arr);
  }

  function renderEventList() {
    const arr = list.filter((item) => dateInMonth.map((i) => i.date).includes(item.date));

    setEventListPerDay(arr);
  }

  useEffect(() => {
    configureDate();
  }, []);

  useEffect(() => {
    if (list.length) {
      renderEventList();
    }
  }, [list]);

  const onDateClick = (data) => {
    setData(data);
    toggle();
  };


  function renderBox() {
    return dateInMonth.map((item, i) => (
      <Box
        key={i}
        color={eventListPerDay?.filter((event) => event?.date === item?.date)}
        onClick={() => onDateClick(item)}
        item={item}
        eventPerDay={eventListPerDay}
        day={day}
      />
    ));
  }

  return (
    <>
      <Modal isShowing={isShowing} hide={toggle} onFinish={toggle} data={data} />
      <div className="parent">
        <h1 className="month_name">{dt.toLocaleDateString('en-us', { month: 'long' })}</h1>
        <div className="day_container">
          {weekdays.map((item, i) => (
            <p key={i} className="week_name">
              {item}
            </p>
          ))}
        </div>
        <div className="container">{renderBox()}</div>
      </div>
    </>
  );
}

export default App;
