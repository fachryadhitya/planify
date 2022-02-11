import { useEffect, useState } from 'react';

const useDate = () => {
  const [dateInMonth, setDateInMonth] = useState([]);

  function getDateVar(name) {
    const dt = new Date();

    switch (name) {
      case 'dt':
        return dt;
      case 'day':
        return dt.getDate();
      case 'month':
        return dt.getMonth();
      case 'year':
        return dt.getFullYear();
    }
  }

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

  function getMonthName(monthNumber) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNumber] || 'December';
  }

  function configureDate() {
    const arr = [];

    for (let i = 0; i <= paddingDays + daysInMonth; i++) {
      const current = new Date();

      if (i < paddingDays) {
        arr[i] = {
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

  useEffect(() => {
    configureDate();
  }, [dateInMonth]);

  return {
    dateInMonth,
    setDateInMonth,
  };
};

export default useDate;
