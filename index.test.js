import { Phoenix } from './index';

describe('Test Phoenix', () => {

  it('get alive status', () => {
    const phoenix = new Phoenix();
    expect(phoenix.isAlive).toBeTruthy();
  });

  it('set alive status throw error', () => {
    const phoenix = new Phoenix();
    expect(() => { phoenix.isAlive = true }).toThrow();
  });

  it('delayed call growOld without throws / isAlive = true', () => {

    const phoenix = new Phoenix();
    const delay = phoenix.constructor.timeSpeed;

    jest.useFakeTimers();

    expect(() => { phoenix.growOld() }).not.toThrow();

    jest.advanceTimersByTime(delay);

    expect(() => { phoenix.growOld() }).not.toThrow();
  });

  it('delayed call growOld without throws / isAlive = false', () => {
    const phoenix = new Phoenix();
    phoenix.maxAge = 0;

    expect(() => { phoenix.growOld() }).not.toThrow();
  });

  it('growOld delay = 1sec', () => {
    const delay = Phoenix.timeSpeed;
    expect(delay).toBe(1000);
  });

  it('create phoenix with reincarnate = false', () => {
    const phoenix = new Phoenix(false);
    expect(phoenix.reincarnate).not.toBeTruthy();
  });

  it('phoenix revive after dead', () => {
    const phoenix = new Phoenix();
    phoenix.maxAge = 0;
    expect(phoenix.isAlive).not.toBeTruthy();
    phoenix.growOld();
    expect(phoenix.isAlive).toBeTruthy();

  });

});
