'use strict';

let counter = 0;
const finish = 100;

const iterator = {
  next() {
    return { done: true, value: counter };
  }
}

