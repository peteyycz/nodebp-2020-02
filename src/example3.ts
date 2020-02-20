namespace example3 {
  // Creator side
  type IteratorCreator<T> = () => Iterator<T>;
  class Counter {
    constructor(private limit = 100) { }

    [Symbol.iterator]: IteratorCreator<number> = (): Iterator<number> => {
      let count = 0;
      return {
        next: (): IteratorResult<number> => {
          count++;
          return { done: count > this.limit, value: count };
        }
      }

    }
  }
  const c = new Counter();

  // Consumer side
  let processed = false;
  const iterator = c[Symbol.iterator]();
  while (!processed) {
    const { value, done } = iterator.next();
    processed = done as boolean;
    console.log('Value produced!', value)
  }

  // Which can be rewritten to
  for (const val of c) {
    console.log('Value produced!', val);
  }

  console.log('The end');
}
