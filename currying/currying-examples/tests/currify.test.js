const { currify } = require('../src/currify');

const add = (a, b, c) => a + b + c;
const multiply = (a, b, c) => a * b * c;

describe('currify', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw an error if the provided argument is not a function', () => {
    expect(() => currify(123)).toThrow();
    expect(() => currify('abc')).toThrow();
    expect(() => currify({})).toThrow();
    expect(() => currify(null)).toThrow();
  });

  it('should return a curried version of the function', () => {
    const curriedAdd = currify(add);
    expect(typeof curriedAdd).toBe('function');
    expect(typeof curriedAdd(1)).toBe('function');
    expect(typeof curriedAdd(1)(2)).toBe('function');
    expect(typeof curriedAdd(1)(2)(3)).toBe('number');
  });

  it('should return the correct result when all arguments are provided at once', () => {
    const curriedAdd = currify(add);
    const curriedMultiply = currify(multiply);
    expect(curriedAdd(1, 2, 3)).toBe(6);
    expect(curriedMultiply(1, 2, 3)).toBe(6);
  });

  it('should return correct result when arguments are provided one at a time', () => {
    const curriedAdd = currify(add);
    const curriedMultiply = currify(multiply);

    expect(curriedAdd(1)(2)(3)).toBe(6);
    expect(curriedAdd(1, 2)(3)).toBe(6);
    expect(curriedAdd(1)(2, 3)).toBe(6);

    expect(curriedMultiply(1)(2)(3)).toBe(6);
    expect(curriedMultiply(1, 2)(3)).toBe(6);
    expect(curriedMultiply(1)(2, 3)).toBe(6);
  });

  test('should return a new curried function if the original function is called with no arguments', () => {
    const curriedAdd = currify(add);
    const newCurriedAdd = curriedAdd();
    expect(typeof newCurriedAdd).toBe('function');
    expect(newCurriedAdd(1)(2)(3)).toBe(6);
  });
});
