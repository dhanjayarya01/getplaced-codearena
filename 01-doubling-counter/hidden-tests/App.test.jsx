import { screen, fireEvent } from '@testing-library/react';
import { expect, test, beforeEach } from 'vitest';

beforeEach(() => {
  // Create the root element expected by main.jsx
  document.body.innerHTML = '<div id="root"></div>';
});

test('Counter should start at 1 and double when clicked', async () => {
  // Importing main.jsx will execute it and render into the #root element
  await import('./main.jsx');
  
  // Find the Double It button
  const doubleBtn = await screen.findByText('Double It!');
  const getCount = () => document.querySelector('.count-display').textContent;
  
  // It should start at 1
  expect(getCount()).toBe('1');
  
  // Click it -> should become 2
  fireEvent.click(doubleBtn);
  expect(getCount()).toBe('2');
  
  // Click again -> should become 4
  fireEvent.click(doubleBtn);
  expect(getCount()).toBe('4');
});
