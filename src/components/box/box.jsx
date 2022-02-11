import styled from 'styled-components';
import { configureBackgroundColor, invertColor } from '../../utils/color';

const EventList = styled.p`
  background-color: ${(props) => (props?.color ? `#${props.color}` : 'salmon')};
  text-align: center;
  border-radius: 0.5rem;
  width: 70%;
  color: ${(props) => `${invertColor(props?.color, true)}`};
  border: 1px solid #333;
  font-weight: 600;
  padding: 0 0.5rem;
`;

const BoxDate = styled.div`
  background: ${(props) => configureBackgroundColor(props?.color)};
`;

const EventWrapper = styled.div`
  overflow: auto;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Box = ({color, onClick, item, eventPerDay, day}) => {
  return (
    <BoxDate
      color={color}
      className="square"
      onClick={onClick}
    >
      <div className={`${item?.date === day ? 'current_date' : ''} day`}>
        <span>{item?.date}</span>
        <span> ({item?.day})</span>
      </div>

      {eventPerDay?.map((ev) => {
        if (ev.date === item?.date) {
          return (
            <EventWrapper key={ev.date}>
              {ev?.event?.map((item, i) => (
                <EventList key={i} color={item?.color}>
                  {item?.name}
                </EventList>
              ))}
            </EventWrapper>
          );
        }

        return null;
      })}
    </BoxDate>
  );
};

export default Box;
