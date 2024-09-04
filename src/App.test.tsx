import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator inputs with initial values and calculated final balance', () => {
  render(<App />);

  expect(
    screen.getByRole('spinbutton', {
      name: /Starting with:/,
    }),
  ).toHaveValue(10000);

  expect(
    screen.getByRole('spinbutton', {
      name: /Interest rate:/,
    }),
  ).toHaveValue(1.1);

  expect(
    screen.getByRole('spinbutton', {
      name: /Investment term:/,
    }),
  ).toHaveValue(36);

  expect(
    screen.getByRole('radio', {
      name: /At maturity/,
    }),
  ).toBeChecked();

  expect(screen.getByText('Final balance: $10330')).toBeInTheDocument();
});

test('updates final balance when inputs change', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Starting with:/), {
    target: { value: '20000' },
  });

  expect(screen.getByText('Final balance: $20660')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Interest rate:/), {
    target: { value: '2.2' },
  });

  expect(screen.getByText('Final balance: $21320')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Investment term:/), {
    target: { value: '22' },
  });

  expect(screen.getByText('Final balance: $20807')).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText(/Monthly/));

  expect(screen.getByText('Final balance: $20822')).toBeInTheDocument();
});

test('displays error message when starting with amount is invalid', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Starting with:/), {
    target: { value: 0 },
  });

  expect(
    screen.getByText(
      'Please enter a valid starting amount between $1000 and $1500000 (e.g. 10000)',
    ),
  ).toBeInTheDocument();
});

test('displays error message when interest rate is invalid', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Interest rate:/), {
    target: { value: 15.1 },
  });

  expect(
    screen.getByText(
      'Please enter a valid interest rate between 0% and 15% (e.g. 1.1)',
    ),
  ).toBeInTheDocument();
});

test('displays error message when investment term is invalid', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Investment term:/), {
    target: { value: 0 },
  });

  expect(
    screen.getByText(
      'Please enter a valid investment term between 3 and 60 months (e.g. 36)',
    ),
  ).toBeInTheDocument();
});
