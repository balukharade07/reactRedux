import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Balu Kharade');
  expect(linkElement).toBeInTheDocument();
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText('Balu Kharade');
//   expect(linkElement).toBeInTheDocument();
// });
