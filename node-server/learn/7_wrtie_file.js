const fs = require('node:fs');

const content = 'Some content!2';

// 덮어쓰기
fs.writeFile('./files_for_test/write/callback/test.txt', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});