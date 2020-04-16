import BigNumber from "bignumber.js";

export const toDecimal = (etherAmount, factor = 18) =>
  new BigNumber(etherAmount)
    .multipliedBy(new BigNumber("10").pow(new BigNumber(factor.toString())))
    .toString(10);
