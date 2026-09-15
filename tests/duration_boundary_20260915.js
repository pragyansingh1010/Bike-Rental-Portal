function validDuration(days) {
  return Number.isInteger(days) && days >= 1;
}

console.assert(validDuration(1));
console.assert(!validDuration(0));
