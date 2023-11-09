/**
 * 타입 변환
 * Type Conversion
 *
 * 1) 명시적
 * 2) 암묵적
 */
let age = 32;

// 명시적
let stringAge = age.toString();
console.log(typeof stringAge, stringAge);

// 암묵적
let test = age + '';
console.log(typeof test, test); // string '32'

console.log('98' + '2'); // '982'
console.log(98 * 2); // 196 (number)
console.log('98' - 2); // 96 (number)

console.log('------------');
/**
 * 명시적 변환 몇가지 더 배우기
 */
console.log(typeof (99).toString(), (99).toString()); // string 99
console.log(typeof (true).toString(), (true).toString()); // string true
console.log(typeof (Infinity).toString(), (Infinity).toString()); // string Infinity

// 숫자 타입으로 변환
console.log(typeof parseInt('0'), parseInt('0.99')); // number 0, 정수까지만 변환된다.
console.log(typeof parseInt('0'), parseInt('1.4')); // number 1, 전부 내림처리
console.log(typeof parseFloat('0.99'), parseFloat('0.99')); // number 0
console.log(typeof +'1', +'1'); // number 1

console.log('-------------------_');
/**
 * Boolean 타입으로의 변환
 * !!을 사용하면 해당 타입의 불리언형으로 변환하는거와 같음
 */

// string -> boolean : 값이 있냐 없냐에 따라서 값이 있으면 true, 없으면 false
console.log(!'x') // false, 'x'라는 문자가 있으므로 불리언으로 변환하면 true, 거기에 !를 썼으므로 false
console.log(!!'asdkfjhalksdfjasdfx'); // true
console.log(!!''); // false,

console.log(!!0); // false,
console.log(!!'0'); // true
console.log(!!'false'); // true
console.log(!!false); // false
console.log(!!undefined); // false
console.log(!!null); // false

console.log(!!{}); // true
console.log(!![]); // true

/**
 * 1) 아무 글자도 없는 String ('')
 * 2) 값이 없는 경우 (undefined, null)
 * 3) 0
 *
 * 모두 false를 반환한다.
 */
