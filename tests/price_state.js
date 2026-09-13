function rentalPrice(rate, days) {
  if (!Number.isFinite(rate) || !Number.isInteger(days) || rate < 0 || days < 0) return 0;
  return rate * days;
}

console.assert(rentalPrice(100, 1) === 100);
console.assert(rentalPrice(250, 4) === 1000);
console.assert(rentalPrice(-1, 2) === 0);
console.assert(rentalPrice(100, -1) === 0);
console.log('Rental price tests passed');
