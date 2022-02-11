import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAllEvent, postEvent } from '../../services/api';
import './modal.css';

//generate random color except black
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

const Modal = ({ isShowing, hide, onFinish, data }) => {
  /**
   * this is ofc opinionated but I actually agree with the article here: https://kentcdodds.com/blog/stop-using-isloading-booleans
   *
   * since then I decided to use the same approach as the article (using string as state trigger loading)
   */
  const [submit, setSubmit] = useState('idle');
  const [eventList, setEventList] = useState([
    {
      name: '',
    },
  ]);

  useEffect(() => {
    if (data) {
      const existingLocalStorage = getAllEvent();
      const existData = existingLocalStorage?.find((item) => item.month === data?.month && item?.date === data?.date);

      if (existData) {
        setEventList(existData?.event.map((item) => ({ name: item?.name })));
      } else {
        setEventList([{ name: '' }]);
      }
    }
  }, [data]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventList];
    list[index][name] = value;
    setEventList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...eventList];
    list.splice(index, 1);
    setEventList(list);
  };

  const handleAddClick = () => {
    setEventList([...eventList, { name: '' }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit('loading');

    const existingLocalStorage = getAllEvent();

    const existData = existingLocalStorage?.find((item) => item.month === data?.month && item?.date === data?.date);

    eventList.forEach((item) => {
      item.color = getRandomColor();
    });

    if (existData) {
      existData['event'] = eventList;
    } else {
      existingLocalStorage.push({
        month: data?.month,
        date: data?.date,
        event: eventList,
      });
    }

    postEvent(existingLocalStorage);

    setTimeout(() => {
      onFinish();
      setSubmit('idle');
    }, 1000);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
              <div className="modal-header">
                <h2>
                  What will you do on {data?.date} {data?.month}?
                </h2>

                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <form onSubmit={onSubmit}>
                {eventList?.map((item, i) => (
                  <div key={i} className="form_wrapper">
                    <input
                      required
                      value={item?.name}
                      type="text"
                      style={{ width: '80%' }}
                      name="name"
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    <button
                      disabled={eventList.length < 1}
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                      style={{ width: '10%' }}
                    >
                      -
                    </button>
                  </div>
                ))}

                <div className="save_btn">
                  <button disabled={eventList.length > 3}>{submit === 'loading' ? 'Saving...' : 'Save'}</button>

                  <button disabled={eventList.length >= 3} type="button" onClick={handleAddClick}>
                    +
                  </button>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Modal;
