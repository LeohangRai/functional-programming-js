/*
  a function that converts a function with multiple parameters into a curried version
  it takes a function 'fn' and returns a new function that can accept arguments either 'one at a time' or 'all at once'.
    - if the arguments are provided one at a time, it returns a new function that expects the next argument
    - once all the arguments are proviced, it invokes the original function 'fn' with all the arguments and returns the result
*/
function currify(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...newArgs) {
      return curried(...args, ...newArgs);
    };
  };
}

/*
  IMPORTANT NOTE:
  The currify function implementation above will not work on callback functions that make use of the spread operator.
  This is because the 'fn.length' value of a function using spread operator (as the only parameter) will be 0.
*/

module.exports = {
  currify
};
