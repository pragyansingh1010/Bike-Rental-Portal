function validDuration(days) {
  return Number.isInteger(days) && days > 0;
}

console.assert(validDuration(1));
console.assert(validDuration(7));
console.assert(!validDuration(0));
console.assert(!validDuration(-1));
console.log('Bike rental duration tests passed');
