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
});
