// const fs = require('fs');


// fs.stat('./files_for_test/temp.txt', (err, stats) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('stat :', stats);
//     console.log('stat.isFile() :', stats.isFile());
//     console.log('stat.isDirectory() :', stats.isDirectory());
//     console.log('stat.isSymbolicLink() :', stats.isSymbolicLink());
//     console.log('stat.size :', stats.size); // 1024000 //= 1MB
//     console.log('stat.birthtime :', stats.birthtime);
//     console.log('stat.mtime :', stats.mtime);
//     console.log('stat.atime :', stats.atime);
//     console.log('stat.ctime :', stats.ctime);
// });

const fs  = require('node:fs/promises');

async function example() {
    try {
      const stats = await fs.stat('./files_for_test/temp.txt');
      console.log(stats.isFile()); // true
      stats.isDirectory(); // false
      stats.isSymbolicLink(); // false
      stats.size; // 1024000 //= 1MB
    } catch (err) {
      console.log(err);
    }
  }
  example();