import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../components/modal/modal';


describe('Modal Component', () => {
  it('Render successfully', () => {
    const { container } = render(<Modal isShowing />);
    expect(container).toMatchSnapshot();
  });

  it('Shows form correctly', () => {
    const { getByTestId } = render(<Modal isShowing />);
    expect(getByTestId('form')).toBeInTheDocument();
  });

  // it ('save form correctly', () => {
  //   const button = screen.getByText("Save");
  //   expect(button).toBeInTheDocument();
  // })

  //   it('Render component with specific width', () => {
  //     const { getByTestId, getByText } = render(<AdsBanner width={700} height={700} />);
  //     expect(getByTestId('ads-banner')).toHaveStyle('width: 700px');
  //     expect(getByText('700 x 700')).toBeInTheDocument();

  //   });
});
