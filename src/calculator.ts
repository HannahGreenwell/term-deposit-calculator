export const calculateSimpleInterest = (
  startingWith: number,
  interestRate: number,
  investmentTerm: number,
) => {
  const investmentTermInYears = investmentTerm / 12;
  const decimalInterestRate = interestRate / 100;
  return startingWith * decimalInterestRate * investmentTermInYears;
};

export const calculateFinalBalance = (
  startingWith: number,
  interestRate: number,
  investmentTerm: number,
  interestPaid: string,
) => {
  let interest: number;

  if (interestPaid === 'atMaturity') {
    interest = calculateSimpleInterest(
      startingWith,
      interestRate,
      investmentTerm,
    );
  } else {
    interest = 0;
  }

  const finalBalance = Math.round(startingWith + interest);

  return finalBalance;
};
