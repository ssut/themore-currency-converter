import Decimal from 'decimal.js';

const getDecimalPrecision = (currencyCode: string): number => {
  const precisionMap: { [key: string]: number } = {
    KRW: 0,
    JPY: 0,
  };

  return precisionMap[currencyCode] ?? 2;
};

const calculateKRWByUSD = (usd: number | Decimal, exchangeRate: number | Decimal): Decimal => {
  const usdDecimal = new Decimal(usd);
  const exchangeRateDecimal = new Decimal(exchangeRate);

  const visaFee = usdDecimal.mul(0.011).toDecimalPlaces(2, Decimal.ROUND_DOWN);
  const withVisaFee = usdDecimal.plus(visaFee);

  const baseAmount = withVisaFee.mul(exchangeRateDecimal);
  const shinhanFee = usdDecimal.mul(0.0018).mul(exchangeRateDecimal).toDecimalPlaces(0, Decimal.ROUND_DOWN);
  const finalAmount = baseAmount.plus(shinhanFee);

  return finalAmount;
};

const calculateKRWForOtherCurrency = (
  sourceAmount: Decimal,
  usdExchangeRate: Decimal,
  sourceCurrencyRate: Decimal,
): Decimal => {
  const usdAmount = sourceAmount.mul(sourceCurrencyRate).toDecimalPlaces(2);
  return calculateKRWByUSD(usdAmount, usdExchangeRate);
};

const findBestSourceCurrencyAmount = (
  sourceCurrencyRate: Decimal | number,
  sourceCurrencyDecimalPrecision: number,
  targetKRW: number,
  usdExchangeRate: Decimal | number,
) => {
  const currencyRate = new Decimal(sourceCurrencyRate);
  const usdRate = new Decimal(usdExchangeRate);

  let sourceAmount = new Decimal(targetKRW).div(usdExchangeRate).div(currencyRate);
  sourceAmount = sourceAmount.toDecimalPlaces(sourceCurrencyDecimalPrecision, Decimal.ROUND_DOWN);

  let currentKRW = calculateKRWForOtherCurrency(sourceAmount, usdRate, currencyRate);
  const step = new Decimal(1).div(10 ** sourceCurrencyDecimalPrecision);

  while (true) {
    if (currentKRW.lte(targetKRW)) {
      const nextSourceAmount = sourceAmount.plus(step).toDecimalPlaces(sourceCurrencyDecimalPrecision, Decimal.ROUND_DOWN);
      const nextKRW = calculateKRWForOtherCurrency(nextSourceAmount, usdRate, currencyRate);

      if (nextKRW.gt(targetKRW)) {
        // if the next amount exceeds the target, return the current amount rounded as per currency precision
        return sourceAmount.toDecimalPlaces(sourceCurrencyDecimalPrecision, Decimal.ROUND_DOWN);
      }

      // otherwise, continue searching
      sourceAmount = nextSourceAmount;
      currentKRW = nextKRW;
    } else {
      // if the current amount exceeds the target, reduce it
      sourceAmount = sourceAmount.minus(step).toDecimalPlaces(sourceCurrencyDecimalPrecision, Decimal.ROUND_DOWN);
      currentKRW = calculateKRWForOtherCurrency(sourceAmount, usdRate, currencyRate);
    }
  }
};

