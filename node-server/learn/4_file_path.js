const path = require('node:path');

const notes = '/users/joe/notes.txt';

console.log(path.dirname(notes)); // /users/joe - 디렉토리 이름만 추출
console.log(path.basename(notes)); // notes.txt - 파일 이름만 추출
console.log(path.extname(notes)); // .txt - 확장자만 추출
console.log(path.basename(notes, path.extname(notes))); // notes - 확장자를 제외한 파일 이름만 추출

// path.join() 메서드는 주어진 모든 path 세그먼트를 하나의 path으로 결합합니다.
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'

// script가 실행되는 디렉토리를 기준으로 상대 경로를 절대 경로로 변환합니다
console.log(path.resolve('joe.txt')); // '/Users/joe/joe.txt' if run from my home folder

path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' if run from my home folder

// 첫 번째 인자가 슬래시로 시작하면, 현재 디렉토리를 무시하고 절대 경로를 반환합니다
path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'

console.log(path.normalize('/users/joe/..//test.txt')); // '/users/test.txt'

/*
* resolve(), normalize() 메서드는 경로가 실제로 존재하는지 확인하지 않습니다
*/