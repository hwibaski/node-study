const fs = require('node:fs');

fs.readFile('./files_for_test/temp.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});