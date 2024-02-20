const { pipe, pipe2 } = require('../src/pipe.polyfill');

const add5 = (x) => x + 5;
const multiplyBy2 = (x) => x * 2;
const square = (x) => x * x;
const subtract1 = (x) => x - 1;

function testPipeFunction(pipeFunction) {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the input function if no functions are provided', () => {
    expect(pipeFunction()(5)).toBe(5);
  });

  it('should return the result of the single function if only one function is provided', () => {
    expect(pipeFunction(add5)(10)).toBe(15);
  });

  it('should combine functions from left to right', () => {
    const add5ThenMultiplyBy2 = pipeFunction(add5, multiplyBy2);
    expect(add5ThenMultiplyBy2(10)).toBe(30);
  });

  it('should pass the result of each function as the argument to the next subsequent function', () => {
    const spyAdd5 = jest.fn(add5);
    const spyMultiplyBy2 = jest.fn(multiplyBy2);
    const spySubtract1 = jest.fn(subtract1);

    const pipedFn = pipeFunction(spyAdd5, spyMultiplyBy2, spySubtract1);
    const result = pipedFn(5);
    expect(spyAdd5).toHaveBeenCalledWith(5);
    expect(spyMultiplyBy2).toHaveBeenCalledWith(10);
    expect(spySubtract1).toHaveBeenCalledWith(20);
    expect(result).toBe(19);
  });

  it('should chain multiple functions', () => {
    const pipedFn = pipeFunction(add5, square, subtract1);
    expect(pipedFn(5)).toBe(99);
  });
}

describe('pipe', () => {
  testPipeFunction(pipe);
});

describe('pipe2', () => {
  testPipeFunction(pipe2);
});
