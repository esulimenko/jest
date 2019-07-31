import { Phoenix, Essence } from './index';

describe('Class Essence', () => {

  it('Create new Essence with custom maxAge', () => {
    const essence = new Essence(999);
    expect(essence.maxAge).toBe(999);
  });

  it('Getter isAlive exists', () => {
    const essence = new Essence();
    expect(essence.isAlive).toBeDefined();
  });

  it('Getter isAlive returning true after creation new Essence', () => {
    const essence = new Essence();
    expect(essence.isAlive).toBeTruthy();
  });

  it('Call growOld after creating new Essence', () => {
    const spyOnGrowOld = jest.spyOn(Essence.prototype, 'growOld');
    new Essence();
    expect(spyOnGrowOld).toHaveBeenCalled();
  });

  it('Setter isAlive throw error', () => {
    const essence = new Essence();
    expect(() => { essence.isAlive = true }).toThrow();
  });

  it('When age > maxAge isAlive turn to false', () => {
    jest.useFakeTimers();
    const essence = new Essence(1);
    jest.runAllTimers();
    expect(essence.isAlive).toBeFalsy();
  });

  it('Recursive calling of growOld method until isAlive is false', () => {
    const essence = new Essence(3);
    const spyOnGrowOld = jest.spyOn(essence, 'growOld');
    // clear mock
    spyOnGrowOld.mockClear();
    // run all timers without delay
    jest.useFakeTimers();
    essence.growOld();
    // run all timers;
    jest.runAllTimers();

    expect(spyOnGrowOld).toHaveBeenCalledTimes(4);
  });

});


describe('Class Phoenix extends Essence', () => {

  it('Phoenix instanceof Essence', () => {
    expect(new Phoenix()).toBeInstanceOf(Essence);
  });

  it('Check reincarnate property after creating new Phoenix without params, expect reincarnate = true', () => {
    const phoenix = new Phoenix();
    expect(phoenix.reincarnate).toByTruthy;
  });

  it('Infinite recursive calling growOld if reincarnate = true', () => {
    const phoenix = new Phoenix(1);
    const spyOnGrowOld = jest.spyOn(phoenix, 'growOld');
    // clear mock
    spyOnGrowOld.mockClear();
    // run all timers without delay
    jest.useFakeTimers();

    phoenix.growOld();
    // run all timers;
    jest.advanceTimersByTime(1000);
    expect(spyOnGrowOld).toHaveBeenCalledTimes(2);
  });

  it('Stop recursive calling growOld if reincarnate = false', () => {
    const phoenix = new Phoenix(1, false);
    const spyOnGrowOld = jest.spyOn(phoenix, 'growOld');
    // clear mock
    spyOnGrowOld.mockClear();
    // run all timers without delay
    jest.useFakeTimers();

    phoenix.growOld();
    // run all timers;
    jest.advanceTimersByTime(2000);
    expect(spyOnGrowOld).toHaveBeenCalledTimes(1);
  });

});
