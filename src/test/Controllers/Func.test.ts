import { toUpperCase } from '../../Controllers/Func';

describe('func test suite', () => {
  test('should run uppercase', () => {
    const result = toUpperCase('test');
    expect(result).toBe('TEST');
  });
});
