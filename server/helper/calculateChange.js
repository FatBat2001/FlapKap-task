// there is a better solution using Dynamic programming If you have time optimize it 😊
const calculateChange = (amount) => {
  const coins = [100, 50, 20, 10, 5];
  const change = {};

  for (const coin of coins) {
    const count = Math.floor(amount / coin);
    if (count > 0) {
      change[coin] = count;
      amount -= count * coin;
    }
  }

  return change;
};
module.exports = calculateChange;
