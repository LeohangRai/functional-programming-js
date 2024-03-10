const { currify } = require('./currify');

const add = (a, b, c) => a + b + c;
const curriedAdd = currify(add);

console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));
console.log(curriedAdd(1, 2, 3));

/* 
  This will fail because the 'fn.length' value of a function using spread operator (as the only parameter) will be 0.
    const addWithSpreadOperator = (...args) =>
      args.reduce((acc, curr) => acc + curr);
    const curriedAddWithSpreadOperator = currify(addWithSpreadOperator);
    console.log(curriedAddWithSpreadOperator(1)(2));
*/
