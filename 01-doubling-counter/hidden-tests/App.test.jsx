import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './src/App.jsx';

test('Counter should start at 1 and double when clicked', () => {
  render(<App />);
  
  // Find the button (assuming the button text contains the count)
  const button = screen.getByRole('button');
  
  // It should start with 1
  expect(button.textContent).toMatch(/1/);
  
  // Click it -> should become 2
  fireEvent.click(button);
  expect(button.textContent).toMatch(/2/);
  
  // Click again -> should become 4
  fireEvent.click(button);
  expect(button.textContent).toMatch(/4/);
});
