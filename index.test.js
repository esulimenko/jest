import { Phoenix } from './index';

describe('Test Pheonix', () => {

  it('Phoenix get alive status', () => {
    const phoenix = new Phoenix();
    expect(phoenix.isAlive).toBeTruthy();
  });

  it('Phoenix set alive status', () => {
    const phoenix = new Phoenix();
    expect(() => { phoenix.isAlive = true }).toThrow();
  });

  it('Phoenix grow old', () => {
    jest.useFakeTimers();
    const cb = jest.fn();
    const phoenix = new Phoenix();
    const delay = phoenix.constructor.timeSpeed;

    expect(() => { phoenix.growOld() }).not.toThrow();

    jest.runAllTimers();

    expect(() => { phoenix.growOld() }).not.toThrow();
  });

  it('Phoenix revival', () => {
    const phoenix = new Phoenix();
    // make phoenix dead
    phoenix.maxAge = 0;

    expect(() => { phoenix.growOld() }).not.toThrow();
  })

});
