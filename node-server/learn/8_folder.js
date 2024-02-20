const fs = require('node:fs');

const folderName = './files_for_test2';

// try {
//     if(!fs.existsSync(folderName)) {
//         fs.mkdirSync(folderName);
//     }
// } catch (err) {
//     console.error(err);
// }

fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
        console.error(err);
    };
})