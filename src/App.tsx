import React from 'react';
import './App.css';
import { calculateFinalBalance } from './calculator';
import {
  INTEREST_RATE_MAX,
  INTEREST_RATE_MIN,
  INVESTMENT_TERM_MAX,
  INVESTMENT_TERM_MIN,
  STARTING_AMOUNT_MAX,
  STARTING_AMOUNT_MIN,
} from './constants';
import { InterestPaid } from './types';

function App() {
  const [startingAmount, setStartingAmount] = React.useState('10000');
  const [interestRate, setInterestRate] = React.useState('1.10');
  const [investmentTerm, setInvestmentTerm] = React.useState('36');
  const [interestPaid, setInterestPaid] = React.useState(
    InterestPaid.AtMaturity,
  );
  const [finalBalance, setFinalBalance] = React.useState(0);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    try {
      setError('');
      const balance = calculateFinalBalance(
        Number(startingAmount),
        Number(interestRate),
        Number(investmentTerm),
        interestPaid,
      );
      setFinalBalance(balance);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, [startingAmount, interestRate, investmentTerm, interestPaid]);

  return (
    <div className="App">
      <h1>Term Deposit Calculator</h1>

      {error && <p className="App-error">{error}</p>}

      <div className="App-field">
        <label>
          Starting with:
          <input
            className="App-input"
            min={STARTING_AMOUNT_MIN}
            max={STARTING_AMOUNT_MAX}
            name="startingAmount"
            required={true}
            type="number"
            value={startingAmount}
            onChange={event => setStartingAmount(event.target.value)}
          />
        </label>
      </div>

      <div className="App-field">
        <label>
          Interest rate:
          <input
            className="App-input"
            min={INTEREST_RATE_MIN}
            max={INTEREST_RATE_MAX}
            name="interestRate"
            required={true}
            step="0.1"
            type="number"
            value={interestRate}
            onChange={event => setInterestRate(event.target.value)}
          />
          % p.a.
        </label>
      </div>

      <div className="App-field">
        <label>
          Investment term:
          <input
            className="App-input"
            min={INVESTMENT_TERM_MIN}
            max={INVESTMENT_TERM_MAX}
            name="investmentTerm"
            required={true}
            type="number"
            value={investmentTerm}
            onChange={event => setInvestmentTerm(event.target.value)}
          />
          months
        </label>
      </div>

      <fieldset className="App-fieldset">
        <legend className="App-legend">Interest paid:</legend>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === InterestPaid.Monthly}
              name="interestPaid"
              type="radio"
              onChange={event => setInterestPaid(InterestPaid.Monthly)}
            />
            Monthly
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === InterestPaid.Quarterly}
              name="interestPaid"
              type="radio"
              onChange={event => setInterestPaid(InterestPaid.Quarterly)}
            />
            Quarterly
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === InterestPaid.Annually}
              name="interestPaid"
              type="radio"
              onChange={event => setInterestPaid(InterestPaid.Annually)}
            />
            Annually
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === InterestPaid.AtMaturity}
              name="interestPaid"
              type="radio"
              onChange={event => setInterestPaid(InterestPaid.AtMaturity)}
            />
            At maturity
          </label>
        </div>
      </fieldset>

      <p className="App-balance">
        Final balance: {finalBalance && !error ? `$${finalBalance}` : null}
      </p>
    </div>
  );
}

export default App;
