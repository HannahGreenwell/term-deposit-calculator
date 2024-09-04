import {
  INTEREST_RATE_MAX,
  INTEREST_RATE_MIN,
  INVESTMENT_TERM_MAX,
  INVESTMENT_TERM_MIN,
  STARTING_AMOUNT_MAX,
  STARTING_AMOUNT_MIN,
} from './constants';
import { InterestPaid } from './types';

type InterestCompounded =
  | InterestPaid.Monthly
  | InterestPaid.Quarterly
  | InterestPaid.Annually;

const TIMES_INTEREST_COMPOUNDED_PER_YEAR = {
  [InterestPaid.Monthly]: 12,
  [InterestPaid.Quarterly]: 4,
  [InterestPaid.Annually]: 1,
};

const VALID_INTEREST_PAID_OPTIONS = [
  InterestPaid.Monthly,
  InterestPaid.Quarterly,
  InterestPaid.Annually,
  InterestPaid.AtMaturity,
];

export const calculateCompoundInterest = (
  startingAmount: number,
  interestRate: number,
  investmentTerm: number,
  interestPaid: InterestCompounded,
): number => {
  const finalBalance =
    startingAmount *
    (1 + interestRate / TIMES_INTEREST_COMPOUNDED_PER_YEAR[interestPaid]) **
      (TIMES_INTEREST_COMPOUNDED_PER_YEAR[interestPaid] * investmentTerm);
  return Math.round(finalBalance);
};

export const calculateSimpleInterest = (
  startingAmount: number,
  interestRate: number,
  investmentTerm: number,
): number => {
  const interest = startingAmount * interestRate * investmentTerm;
  const finalBalance = startingAmount + interest;
  return Math.round(finalBalance);
};

export const calculateFinalBalance = (
  startingAmount: number,
  interestRate: number,
  investmentTermInMonths: number,
  interestPaid: InterestPaid,
): number => {
  if (
    isNaN(startingAmount) ||
    startingAmount < STARTING_AMOUNT_MIN ||
    startingAmount > STARTING_AMOUNT_MAX
  ) {
    throw new Error(
      `Please enter a valid starting amount between $${STARTING_AMOUNT_MIN} and $${STARTING_AMOUNT_MAX} (e.g. 10000)`,
    );
  }

  if (
    isNaN(interestRate) ||
    interestRate < INTEREST_RATE_MIN ||
    interestRate > INTEREST_RATE_MAX
  ) {
    throw new Error(
      `Please enter a valid interest rate between ${INTEREST_RATE_MIN}% and ${INTEREST_RATE_MAX}% (e.g. 1.1)`,
    );
  }

  if (
    isNaN(investmentTermInMonths) ||
    investmentTermInMonths < INVESTMENT_TERM_MIN ||
    investmentTermInMonths > INVESTMENT_TERM_MAX
  ) {
    throw new Error(
      `Please enter a valid investment term between ${INVESTMENT_TERM_MIN} and ${INVESTMENT_TERM_MAX} months (e.g. 36)`,
    );
  }

  if (!VALID_INTEREST_PAID_OPTIONS.includes(interestPaid)) {
    throw new Error(
      'Please select a valid interest paid option (i.e. Monthly, Quarterly, Annually or At maturity)',
    );
  }

  const investmentTermInYears = investmentTermInMonths / 12;
  const interestRateDecimal = interestRate / 100;

  let finalBalance: number;

  if (interestPaid === InterestPaid.AtMaturity) {
    finalBalance = calculateSimpleInterest(
      startingAmount,
      interestRateDecimal,
      investmentTermInYears,
    );
  } else {
    finalBalance = calculateCompoundInterest(
      startingAmount,
      interestRateDecimal,
      investmentTermInYears,
      interestPaid,
    );
  }

  return finalBalance;
};
