function validDuration(hours) {
  return Number.isFinite(hours) && hours > 0;
}

console.assert(validDuration(1));
console.assert(validDuration(24));
console.assert(!validDuration(0));
console.assert(!validDuration(-1));
console.log('Rental duration rules passed');
