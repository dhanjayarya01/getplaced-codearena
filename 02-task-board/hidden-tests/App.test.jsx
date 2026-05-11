import { render, screen, fireEvent, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './src/App.jsx';

test('Task completion flow', () => {
  render(<App />);
  
  const input = screen.getByTestId('task-input');
  const addBtn = screen.getByTestId('add-task-btn');
  const todoCol = screen.getByTestId('todo-column');
  const doneCol = screen.getByTestId('done-column');

  // Add a new task
  fireEvent.change(input, { target: { value: 'Secret Test Task' } });
  fireEvent.click(addBtn);

  // Verify it's in the To Do column
  expect(within(todoCol).getByText('Secret Test Task')).toBeInTheDocument();

  // Find the complete button for the FIRST task and click it (Learn React)
  const completeBtn = screen.getByTestId('complete-btn-1');
  fireEvent.click(completeBtn);

  // Learn React should now be in the done column
  expect(within(doneCol).getByText('Learn React')).toBeInTheDocument();
  
  // Learn React should NOT be in the todo column
  expect(within(todoCol).queryByText('Learn React')).not.toBeInTheDocument();
});
