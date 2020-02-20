namespace example5 {
  function simulateAsyncOp<T>(nr: T): Promise<T> {
    return Promise.resolve(nr)
  }

  type AsyncIteratorResult<T> = Promise<IteratorResult<T>>;

  class Counter {
    constructor(private limit = 100) { }

    [Symbol.asyncIterator] = (): AsyncIterator<number> => {
      let count = 0
      return {
        next: async (): AsyncIteratorResult<number> => {
          const value = await simulateAsyncOp(count++);
          const done = await simulateAsyncOp(count === this.limit);
          return { done, value };
        }
      }

    }
  }
  // Creator side
  const c = new Counter();

  async function main() {
    for await (const val of c) {
      console.log('Value produced!', val);
    }
    console.log('The end');
  }

  main().catch(ex => {
    console.error(ex);
    process.exit(1);
  });
}