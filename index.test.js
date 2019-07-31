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

  it('Recursive calling of growOld method until isAlive is false', () => {
    const essence = new Essence(3);
    const spyOnGrowOld = jest.spyOn(essence, 'growOld');
    // run all timers without delay
    jest.useFakeTimers();
    // clear mock
    spyOnGrowOld.mockClear();
    essence.growOld();
    // run all timers;
    jest.runAllTimers();

    expect(spyOnGrowOld).toHaveBeenCalledTimes(3);
  });

});
