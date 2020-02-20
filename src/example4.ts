namespace example4 {
  function simulateAsyncOp(nr: number) {
    return Promise.resolve(nr)
  }

  class Counter {
    constructor(private limit = 100) { }

    [Symbol.iterator] = (): Iterator<Promise<number>> => {
      let count = 0;
      return {
        next: (): IteratorResult<Promise<number>> => {
          count++;
          return { done: count === this.limit, value: simulateAsyncOp(count) };
        }
      }

    }
  }
  // Creator side
  const c = new Counter();

  async function main() {
    for (const val of c) {
      const v = await val;
      console.log('Value produced!', v);
    }
    console.log('The end');
  }

  main().catch(ex => {
    console.error(ex);
    process.exit(1);
  });
}