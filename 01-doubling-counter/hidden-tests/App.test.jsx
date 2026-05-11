import { screen, fireEvent } from '@testing-library/react';
import { expect, test, beforeEach } from 'vitest';

beforeEach(() => {
  // Create the root element expected by main.jsx
  document.body.innerHTML = '<div id="root"></div>';
});

test('Counter should start at 1 and double when clicked', async () => {
  // Importing main.jsx will execute it and render into the #root element
  await import('./main.jsx');
  
  // Find the count display (the initial count is 1)
  const countDisplay = await screen.findByText('1');
  expect(countDisplay).toBeInTheDocument();
  
  // Find the Double It button
  const doubleBtn = screen.getByText('Double It!');
  
  // Click it -> should become 2
  fireEvent.click(doubleBtn);
  expect(await screen.findByText('2')).toBeInTheDocument();
  
  // Click again -> should become 4
  fireEvent.click(doubleBtn);
  expect(await screen.findByText('4')).toBeInTheDocument();
});
