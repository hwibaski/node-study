/**
 * Type Inference
 *
 * 타입 추론
 */

let stringType = 'string';
let booleanType = true;
let numberType = 30;

booleanType = false;

// booleanType = 'false'

/**
 *
 * const literal type
 * const 이고 구체화된 값을 할당했으므로 타입이 'const string' 타입이 된다. 이를 const literal type 이라고 한다.
 */
const constStringType = 'const string';
const constBooleanType = true;

// 구체 타입이 아님
let yuJin = {
    name: '안유진',
    age: 2003
}

const yuJin2 = {
    name: '안유진',
    age: 2003
}

// const로 선언했지만 변경 가능,
yuJin2.name = 'hwibaski';

// as const를 이용해서 객체 프로퍼티를 구체 타입으로 지정
const yuJin3 = {
    name: '안유진' as const,
    age: 2003 as const,
}

// yuJin3.name = 'abc' -> error
console.log(yuJin3.name); // '안유진' type
console.log(yuJin2.name); // string type

/**
 * Array
 */
let numbers = [1,2,3,4,5]; // number[]
let numbersAndString = [1,2,3,'4']; // (string | number)[]

numbers.push(6);
// numbers.push('6'); 안됨

const number = numbers[0]; // number
const nos = numbersAndString[0]; // string | number
const nos2 = numbersAndString[100]; // 없는 index 이지만 compile 타임에 잡지 못함

/**
 * Tuple
 */
const twoNumber = [1, 3] as const; // readonly [1, 3] -> 1, 3으로 구성되어 있는 배열이다 즉 튜플이다

// twoNumber[0] = 10; x
// twoNumber.push(100); x

const first = twoNumber[0]; // 1 type
// const first2 = twoNumber[3] tuple은 없는 인덱스에 대한 접근을 컴파일 타임에 캐치함
