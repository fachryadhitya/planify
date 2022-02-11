//mock dummy api, in this case using cookies

export function getAllEvent() {
  const existingLocalStorage = localStorage.getItem('eventList') ? JSON.parse(localStorage.getItem('eventList')) : [];

  return existingLocalStorage;
}

export function postEvent(data) {
  return localStorage.setItem('eventList', JSON.stringify(data));
}
