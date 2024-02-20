const fs = require('node:fs');

try {
  const data = fs.readFileSync('./files_for_test/temp.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}