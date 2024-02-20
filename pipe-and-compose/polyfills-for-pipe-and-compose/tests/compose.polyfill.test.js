const { compose, compose2 } = require('../src/compose.polyfill');

const add5 = (x) => x + 5;
const multiplyBy2 = (x) => x * 2;
const square = (x) => x * x;
const subtract1 = (x) => x - 1;

function testComposeFunction(composeFunction) {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the input function if no functions are provided', () => {
    expect(composeFunction()(5)).toBe(5);
  });

  it('should return teh result of the single function if only one function is provided', () => {
    expect(composeFunction(add5)(10)).toBe(15);
  });

  it('should combine functions from right to left', () => {
    const add5ThenMultiplyBy2 = composeFunction(multiplyBy2, add5);
    expect(add5ThenMultiplyBy2(10)).toBe(30);
  });

  it('should pass the result of each function as the argument to the next subsequent function from right to left', () => {
    const spyAdd5 = jest.fn(add5);
    const spyMultiplyBy2 = jest.fn(multiplyBy2);
    const spySubtract1 = jest.fn(subtract1);

    const composedFn = composeFunction(spySubtract1, spyMultiplyBy2, spyAdd5);
    const result = composedFn(5);
    expect(spyAdd5).toHaveBeenCalledWith(5);
    expect(spyMultiplyBy2).toHaveBeenCalledWith(10);
    expect(spySubtract1).toHaveBeenCalledWith(20);
    expect(result).toBe(19);
  });

  it('should chain multiple functions', () => {
    const composedFn = composeFunction(subtract1, square, add5);
    expect(composedFn(5)).toBe(99);
  });
}

describe('compose', () => {
  testComposeFunction(compose);
});

describe('compose2', () => {
  testComposeFunction(compose2);
});
