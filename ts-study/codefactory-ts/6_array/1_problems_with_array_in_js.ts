/**
 * Problems with Array in JS
 */

// (1) 하나의 배열에 여러 가지 타입을 다 넣을 수 있다.
const number = [1, '1', 3, '4', 5];

let strings: string[] = ['1', '2', '3'];

// strings.push(1)

let stringsOrNumbersArray: (string | number)[] = [
    1,
    '2',
    3,
    '4'
];

let stringArrOrNumberArr: string[] | number[] = [1, 2, 3];
stringArrOrNumberArr = ['1', '2', '3'];

let stringOrNumberArr: string | number[] = [1, 2, 3];

stringOrNumberArr = '3';

const onlyStrings = ['1', '2', '3'];
const onlyNumber = [1, 2, 3];

for (let i = 0; i < onlyStrings.length; i++) {
    let item = onlyStrings[i];
}

for (let item of onlyNumber) {

}

let number1 = onlyNumber[0];
let number4 = onlyNumber[9999]; // 이건 사실 다른 언어에서도 되는 걸 본적이 없음
