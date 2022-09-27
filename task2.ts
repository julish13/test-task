class Counter {
  private _counter: number;

  constructor(counter = 0) {
    this._counter = counter;
  }

  get counter() {
    return this._counter;
  }

  increment() {
    this._counter += 1;
  }
}

export const counter = (value?: number): [() => number, () => void] => {
  const instance = new Counter(value);

  const get = () => instance.counter;
  const next = instance.increment.bind(instance);

  return [get, next];
};