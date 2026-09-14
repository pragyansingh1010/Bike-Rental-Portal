function totalPrice(rate, hours) {
  return rate * hours;
}

console.assert(totalPrice(100, 1) === 100);
console.assert(totalPrice(100, 5) === 500);
console.assert(totalPrice(0, 5) === 0);
console.log('Rental price rules passed');
