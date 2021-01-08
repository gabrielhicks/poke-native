import * as React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

test('Find header of App component', () => {
  const { getByTestId } = render(<App />);
  const message = getByTestId('pokemon');

  expect(message).toHaveTextContent('Here are the first five pokemon!');
});
