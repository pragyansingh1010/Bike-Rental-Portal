function validRate(rate) {
  return Number.isFinite(rate) && rate >= 0;
}

console.assert(validRate(0));
console.assert(validRate(100));
console.assert(validRate(49.5));
console.assert(!validRate(-1));
console.log('Rental rate validation passed');
