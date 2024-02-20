const fs = require('node:fs');
const content = 'Some content!';
try {
  fs.writeFileSync('./files_for_test/write/sync/test.txt', content);
  // file written successfully
} catch (err) {
  console.error(err);
}
