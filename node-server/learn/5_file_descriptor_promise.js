
// flag: 
//  'r' - 읽기로 열기. 파일이 존재하지 않으면 에러발생.
//  'r+' - 읽기/쓰기로 열기. 파일이 존재하지 않으면 에러발생.
//  'w' - 쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 지우고 처음부터 씀.
//  'w+' - 읽기/쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 처음부터 씀.
//  'a' - 추가 쓰기로 열기. 파일이 존재하지 않으면 만들어짐.
//  'a+' - 파일을 읽고/추가쓰기모드로 열기. 파일이 존재하지 않으면 만들어짐.



const fs = require('node:fs/promises');
// Or const fs = require('fs').promises before v14.

async function example() {
  let filehandle;
  try {
    filehandle = await fs.open('./files_for_test/temp.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) await filehandle.close();
  }
}
example();