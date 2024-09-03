import { calculateFinalBalance, calculateSimpleInterest } from './calculator';

describe('calculateSimpleInterest', () => {
  test('calculates the correct interest amount', () => {
    const interest = calculateSimpleInterest(10000, 1.1, 36);
    expect(interest).toEqual(330.00000000000006);
  });
});

describe('calculateFinalBalance', () => {
  test('calculates the correct final balance when interest is paid at maturity', () => {
    const finalBalance = calculateFinalBalance(10000, 1.1, 36, 'atMaturity');
    expect(finalBalance).toEqual(10330);
  });
});
