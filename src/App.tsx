import React from 'react';
import './App.css';
import { calculateFinalBalance } from './calculator';

function App() {
  const [startingWith, setStartingWith] = React.useState('10000');
  const [interestRate, setInterestRate] = React.useState('1.10');
  const [investmentTerm, setInvestmentTerm] = React.useState('36');
  const [interestPaid, setInterestPaid] = React.useState('atMaturity');
  const [finalBalance, setFinalBalance] = React.useState<Number>();

  React.useEffect(() => {
    const balance = calculateFinalBalance(
      Number(startingWith),
      Number(interestRate),
      Number(investmentTerm),
      interestPaid,
    );
    setFinalBalance(balance);
  }, [startingWith, interestRate, investmentTerm, interestPaid]);

  return (
    <div className="App">
      <h1>Term Deposit Calculator</h1>

      <div className="App-field">
        <label>
          Starting with:
          <input
            className="App-input"
            min="1000"
            max="1500000"
            name="startingWith"
            required={true}
            type="number"
            value={startingWith}
            onChange={event => setStartingWith(event.target.value)}
          />
        </label>
      </div>

      <div className="App-field">
        <label>
          Interest rate:
          <input
            className="App-input"
            min="0"
            max="15"
            name="interestRate"
            required={true}
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
            min="3"
            max="60"
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
              checked={interestPaid === 'monthly'}
              name="interestPaid"
              type="radio"
              value="monthly"
              onChange={event => setInterestPaid(event.target.value)}
            />
            Monthly
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === 'quarterly'}
              name="interestPaid"
              type="radio"
              value="quarterly"
              onChange={event => setInterestPaid(event.target.value)}
            />
            Quarterly
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === 'annually'}
              name="interestPaid"
              type="radio"
              value="annually"
              onChange={event => setInterestPaid(event.target.value)}
            />
            Annually
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              checked={interestPaid === 'atMaturity'}
              name="interestPaid"
              type="radio"
              value="atMaturity"
              onChange={event => setInterestPaid(event.target.value)}
            />
            At maturity
          </label>
        </div>
      </fieldset>

      <p className="App-balance">{`Final balance: $${finalBalance}`}</p>
    </div>
  );
}

export default App;
