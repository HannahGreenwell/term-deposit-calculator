import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Term Deposit Calculator</h1>

      <div className="App-field">
        <label>
          Starting with:
          <input
            className="App-input"
            defaultValue={10000}
            min="1000"
            max="1500000"
            name="startingWith"
            required={true}
            type="number"
          />
        </label>
      </div>

      <div className="App-field">
        <label>
          Interest rate:
          <input
            className="App-input"
            defaultValue={1.1}
            min="0"
            max="15"
            name="interestRate"
            required={true}
            type="number"
          />
          % p.a.
        </label>
      </div>

      <div className="App-field">
        <label>
          Investment term:
          <input
            className="App-input"
            defaultValue={36}
            min="3"
            max="60"
            name="investmentTerm"
            required={true}
            type="number"
          />
          months
        </label>
      </div>

      <fieldset className="App-fieldset">
        <legend className="App-legend">Interest paid:</legend>

        <div className="App-radio">
          <label>
            <input name="interestPaid" type="radio" value="monthly" />
            Monthly
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input name="interestPaid" type="radio" value="quarterly" />
            Quarterly
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input name="interestPaid" type="radio" value="annually" />
            Annually
          </label>
        </div>

        <div className="App-radio">
          <label>
            <input
              defaultChecked={true}
              name="interestPaid"
              type="radio"
              value="atMaturity"
            />
            At maturity
          </label>
        </div>
      </fieldset>

      <p className="App-balance">Final balance: $10330</p>
    </div>
  );
}

export default App;
