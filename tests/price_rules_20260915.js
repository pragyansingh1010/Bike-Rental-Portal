function rentalPrice(rate, days) {
  return rate * days;
}

console.assert(rentalPrice(500, 2) === 1000);
console.assert(rentalPrice(500, 0) === 0);
