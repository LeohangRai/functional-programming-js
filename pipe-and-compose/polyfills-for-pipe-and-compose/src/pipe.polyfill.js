/* 
  basically, return a function that iterates through all of the functions provided as an argument to manipulate the initially provided argument.
  the result of each function becomes the argument for the next subsequent function.
*/

const pipe = function (...functions) {
  return function (initialValue) {
    let result = initialValue;
    for (const fn of functions) {
      result = fn(result);
    }
    return result;
  };
};

const pipe2 = function (...functions) {
  return function (initialValue) {
    // 'lastFunctionReturn' is the accumulated value
    return functions.reduce((lastFunctionReturn, currFunction) => {
      return currFunction(lastFunctionReturn);
    }, initialValue);
  };
};

module.exports = {
  pipe,
  pipe2
};
