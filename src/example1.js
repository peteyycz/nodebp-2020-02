'use strict';

const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../package.json');

const package$ = fs.createReadStream(packagePath);

async function main () {
  for await (const line of package$) {
    console.log(line.toString())
  }
}

main()
  .catch(ex => {
    console.error(ex);
    process.exit(1);
  });
