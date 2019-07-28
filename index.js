const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
const MIN = 20;
const MAX = 30;

const privateFields = new WeakMap();

const initPrivateFields = (instance, fields) => privateFields.set(instance, fields);

const setAge = (instance, age) => privateFields.get(instance).age = age;

const getAge = (instance) =>  privateFields.get(instance).age;

export class Essence {
  static get timeSpeed() {
    return 1000;
  }
  get isAlive() {
    return getAge(this) <= this.maxAge;
  }
  set isAlive(newValue) {
    throw new Error('Dont set');
  }
  constructor(maxAge = randomInteger(MIN, MAX)) {
    initPrivateFields(this, { age: 0 });
    this.maxAge = maxAge;
    this.growOld();
  }
  growOld() {
    const age = getAge(this);
    setAge(this, age + 1);
    if (this.isAlive) setTimeout(this.growOld, this.constructor.timeSpeed);
  }
}

export class Phoenix extends Essence {
  constructor(reincarnate = true){
    super();
    this.reincarnate = reincarnate;
  }
  growOld() {
    super.growOld();
    if (!this.isAlive && this.reincarnate) {
      this.setAge(this, 0);
      setTimeout(this.growOld, this.constructor.timeSpeed);
    }
  }
}
