import { render, screen } from '@testing-library/react';
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
