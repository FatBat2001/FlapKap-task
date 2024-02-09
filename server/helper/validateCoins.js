const validateCoins = (coins) => {
  const coinValues = ["5", "10", "20", "50", "100"];
  let flag = true;
  Object.keys(coins).map((key) => {
    flag &= coinValues.includes(key);
    if (flag) {
      const factor = coins[key];
      flag &= Number(factor) === factor;
    }
  });
  return flag;
};
module.exports = validateCoins;
