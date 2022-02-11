import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Box from '../components/box/box';

const props = {
  color: [
    {
      month: 'February',
      date: 11,
      event: [
        {
          name: 'jalan',
          invitees: 'temen',
          time: '20:22',
          color: 'C7E18E',
        },
        {
          name: 'main',
          invitees: 'teman teman',
          time: '18:30',
          color: '7F9299',
        },
      ],
    },
  ],
  item: {
    date: 11,
    month: 'February',
    day: 'Wednesday',
  },
  day: 11,
  eventPerDay: [
    {
      month: 'February',
      date: 11,
      event: [
        {
          name: 'jalan',
          invitees: 'temen',
          time: '20:22',
          color: 'C7E18E',
        },
        {
          name: 'main',
          invitees: 'teman teman',
          time: '18:30',
          color: '7F9299',
        },
      ],
    },
  ],
};

describe('Box Component', () => {
  it('Render successfully', () => {
    const { container } = render(<Box color={props.color} item={props.item} day={props.day} />);
    expect(container).toMatchSnapshot();
  });

  it('Has different className in current day', () => {
    const { getByTestId } = render(<Box color={props.color} item={props.item} day={props.day} />);
    expect(getByTestId('current_date')).toHaveClass('current_date');
  });

  it('Has background color from props', () => {
    const { getByText } = render(
      <Box color={props.color} item={props.item} day={props.day} eventPerDay={props.eventPerDay} />,
    );

    const event = getByText('jalan with temen (20:22)');
    expect(event).toHaveStyle('background-color: #c7e18e');
  });

  it('Has combination of background color based on event length', () => {
    const { getByTestId } = render(
      <Box color={props.color} item={props.item} day={props.day} eventPerDay={props.eventPerDay} />,
    );

    const boxContainer = getByTestId('box_container');
    expect(boxContainer).toHaveStyle(
      `background: linear-gradient(110deg, #${props.color[0].event[0].color} 60%, #${props.color[0].event[1].color} 60%)`,
    );
  });
});
