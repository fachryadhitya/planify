export function getDateVar(name) {
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
    default:
      return null;
  }
}

export function getMonthName(monthNumber) {
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
