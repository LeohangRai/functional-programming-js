/* 
  basically, return a function that iterates through all of the functions provided as an argument (from right to left) to manipulate the initially provided argument.
  the result of each function becomes the argument for the next subsequent function.
*/

const compose = function (...functions) {
  return function (initialValue) {
    let result = initialValue;
    /*
      cloning the functions array before reversing because the Array.reverse() method reverses the array in-place
      tried using Array.toReversed(), but it doesn't seem to work on certain node versions
    */
    const reversedFunctionsArr = [...functions].reverse();
    for (const fn of reversedFunctionsArr) {
      result = fn(result);
    }
    return result;
  };
};

// Array.reduceRight() is just Array.reduce() but iterates from the right side to the left side of the array
const compose2 = function (...functions) {
  return function (initialValue) {
    // 'lastFunctionReturn' is the accumulated value
    return functions.reduceRight((lastFunctionRetur, currFunction) => {
      return currFunction(lastFunctionRetur);
    }, initialValue);
  };
};

module.exports = {
  compose,
  compose2
};
