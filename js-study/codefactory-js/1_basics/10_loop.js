/**
 * Loops
 *
 * 1) for
 * 2) while
 */

for (let i = 0; i < 10; i++) {
    console.log(i);
}

console.log('------------------')
for (let i = 0; i > 0; i--) {
    console.log(i);
}

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        console.log(i, j);
    }
}

// *을 이용해서 6x6의 정사각형를 출력해라
let square = '';
let side = 6;

for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
        square += '*';
    }
    square += '\n';
}

console.log(square);

/**
 * for...in
 */
const yuJin = {
    name: '안유진',
    year: 2003,
    group: '아이브',
}

console.log('------------');

// 객체에서 쓰면 객체의 키값
for (let key in yuJin) {
    console.log(key);
}

const iveMembersArray = ['안유진', '가을', '레이', '장원영', '리즈', '이서'];

console.log('------------');

// 배열에 쓰면 index가 온다.
for (let key in iveMembersArray) {
    console.log(key);
    console.log(`${key}:${iveMembersArray[key]}`);
}


/**
 * while
 */
let number = 0;

while (number < 10) {
    number++;
}

/**
 * do... while
 * 헷갈려서 잘 쓰지 않는다.
 * 1. do를 한 번 먼저 실행한다.
 * 2. 그리고 나서 조건을 확인한다.
 */

do {
    console.log('I am do!!');
} while (number < 10);

/**
 * break
 */
console.log('--------------');
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i);
}

console.log('-------------');
number = 0;

while(number < 10){
    if(number === 5){
        break;
    }

    number ++;
    console.log(number);
}

/**
 * continue
 */
console.log('---------------');
for(let i = 0; i < 10; i++){
    if(i === 5){
        continue;
    }
    console.log(i);
}


console.log('----------------');
number = 0;

while(number < 10){
    number ++;

    if(number === 5){
        continue;
    }

    console.log(number);
}
