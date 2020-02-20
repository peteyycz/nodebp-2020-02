// interface IteratorYieldResult<TYield> {
//   done?: false;
//   value: TYield;
// }

// interface IteratorReturnResult<TReturn> {
//   done: true;
//   value: TReturn;
// }

// type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

// interface Iterator<T, TReturn = any, TNext = undefined> {
//   // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
//   next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
//   return?(value?: TReturn): IteratorResult<T, TReturn>;
//   throw?(e?: any): IteratorResult<T, TReturn>;
// }
namespace example2 {
  // Creator side
  let counter = 0;
  const last = 100;
  const iterator: Iterator<number> = {
    next(): IteratorResult<number> {
      counter++;
      return { done: counter === last, value: counter };
    }
  }

  // Consumer side
  let processed: boolean = false;
  while (!processed) {
    const { value, done } = iterator.next();
    processed = done as boolean;
    console.log('Value produced!', value)
  }
  console.log('The end')
}
